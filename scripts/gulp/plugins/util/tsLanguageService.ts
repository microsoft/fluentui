import * as fs from 'fs';
import path from 'path';
import * as ts from 'typescript';

export type TSFile = {
  text?: string;
  version: number;
};

function getTSConfigFile(tsconfigPath: string): ts.ParsedCommandLine {
  const basePath = path.dirname(tsconfigPath);
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  return ts.parseJsonConfigFileContent(configFile!.config, ts.sys, basePath, {}, tsconfigPath);
}

function createServiceHost(compilerOptions: ts.CompilerOptions, files: Map<string, TSFile>): ts.LanguageServiceHost {
  return {
    getScriptFileNames: () => {
      return [...files.keys()];
    },
    getScriptVersion: fileName => {
      const file = files.get(fileName);
      return (file && file.version.toString()) || '';
    },
    getScriptSnapshot: fileName => {
      if (!fs.existsSync(fileName)) {
        return undefined;
      }

      let file = files.get(fileName);

      if (file === undefined) {
        const text = fs.readFileSync(fileName).toString();

        file = { version: 0, text };
        files.set(fileName, file);
      }

      return ts.ScriptSnapshot.fromString(file!.text!);
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => compilerOptions,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
  };
}

const files: Map<string, TSFile> = new Map<string, TSFile>();
const services = new Map<string, ts.LanguageService>();

export function getProgram(tsconfigPath: string) {
  if (!services.has(tsconfigPath)) {
    const tsconfig = getTSConfigFile(tsconfigPath);
    const servicesHost = createServiceHost(tsconfig.options, files);

    services.set(tsconfigPath, ts.createLanguageService(servicesHost, ts.createDocumentRegistry()));
  }

  return services.get(tsconfigPath).getProgram();
}

export function loadFiles(filesToLoad: string[]): void {
  filesToLoad.forEach(filePath => {
    const normalizedFilePath = path.normalize(filePath);
    const file = files.get(normalizedFilePath);
    const text = fs.readFileSync(normalizedFilePath, 'utf-8');

    if (!file) {
      files.set(normalizedFilePath, {
        text,
        version: 0,
      });
    } else if (file.text !== text) {
      files.set(normalizedFilePath, {
        text,
        version: file.version + 1,
      });
    }
  });
}
