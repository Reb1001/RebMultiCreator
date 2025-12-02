import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle('get-templates', async () => {
  // Production: app.getAppPath() points to app.asar or installation directory
  // Development: points to project root
  const isDev = process.env.NODE_ENV === 'development';
  const templatesPath = isDev 
    ? path.join(app.getAppPath(), 'templates')
    : path.join(path.dirname(app.getPath('exe')), 'templates');
  
  console.log('Looking for templates at:', templatesPath);
  
  try {
    if (!fs.existsSync(templatesPath)) {
      console.error('Templates directory not found:', templatesPath);
      return [];
    }
    
    const items = fs.readdirSync(templatesPath, { withFileTypes: true });
    const templates = items
      .filter(item => item.isDirectory())
      .map(dir => ({
        name: dir.name,
        path: path.join(templatesPath, dir.name)
      }));
    
    console.log('Found templates:', templates);
    return templates;
  } catch (error) {
    console.error('Error reading templates:', error);
    return [];
  }
});

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory']
  });
  
  if (result.canceled) {
    return null;
  }
  
  return result.filePaths[0];
});

ipcMain.handle('copy-template', async (_event, templatePath: string, targetPath: string, projectName: string) => {
  try {
    const destinationPath = path.join(targetPath, projectName);
    
    // Check if destination already exists
    if (fs.existsSync(destinationPath)) {
      throw new Error('A folder with this name already exists');
    }
    
    // Copy directory recursively
    copyDirectoryRecursive(templatePath, destinationPath);
    
    return { success: true, path: destinationPath };
  } catch (error: any) {
    console.error('Error copying template:', error);
    return { success: false, error: error.message };
  }
});

function copyDirectoryRecursive(source: string, destination: string) {
  // Create destination directory
  fs.mkdirSync(destination, { recursive: true });
  
  // Read all items in source directory
  const items = fs.readdirSync(source, { withFileTypes: true });
  
  for (const item of items) {
    const sourcePath = path.join(source, item.name);
    const destPath = path.join(destination, item.name);
    
    if (item.isDirectory()) {
      copyDirectoryRecursive(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}
