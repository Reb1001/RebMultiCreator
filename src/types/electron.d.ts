export interface Template {
  name: string;
  path: string;
}

export interface CopyResult {
  success: boolean;
  path?: string;
  error?: string;
}

declare global {
  interface Window {
    api: {
      getTemplates: () => Promise<Template[]>;
      selectDirectory: () => Promise<string | null>;
      copyTemplate: (templatePath: string, targetPath: string, projectName: string) => Promise<CopyResult>;
    };
  }
}
