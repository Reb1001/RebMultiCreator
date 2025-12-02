import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getTemplates: () => ipcRenderer.invoke('get-templates'),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  copyTemplate: (templatePath: string, targetPath: string, projectName: string) => 
    ipcRenderer.invoke('copy-template', templatePath, targetPath, projectName)
});
