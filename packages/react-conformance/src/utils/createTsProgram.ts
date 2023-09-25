import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

let program: ts.Program;

/**
 * Creates a ~cached~ TS Program.
 * @remarks this will be never cached with current use/setup as jest creates this for every it/describe() block 🐌
 */
export function createTsProgram(
  sourcePath: string,
  options: Partial<{ configDir: string; configName: string }> = {},
): ts.Program {
  const { configName, configDir } = options;
  if (!program) {
    // Calling parse() from react-docgen-typescript would create a new ts.Program for every component,
    // which can take multiple seconds in a large project. For better performance, we create a single
    // ts.Program per package and pass it to parseWithProgramProvider().

    const tsconfigPath = ts.findConfigFile(configDir ?? sourcePath, fs.existsSync, configName);

    if (!tsconfigPath) {
      throw new Error(`Cannot find ${configName}`);
    }

    const compilerOptions = getCompilerOptions(tsconfigPath);

    // To reduce the number of files parsed, only list the index file as the entry point.
    // This should work okay because it would be strange if a component being conformance tested
    // was not also referenced from some file eventually imported by the index file.
    const rootFile = path.join(path.dirname(tsconfigPath), 'src', 'index.ts');

    if (!fs.existsSync(rootFile)) {
      throw new Error(`Index file does not exist at expected path ${rootFile}`);
    }

    program = ts.createProgram([rootFile], compilerOptions);
  }

  if (!program.getSourceFile(sourcePath)) {
    // See earlier comment for why it's handled this way (can reconsider if it becomes a problem)
    throw new Error(`Component file "${sourcePath}" does not appear to be referenced from the project index file`);
  }

  return program;
}

function getCompilerOptions(tsconfigPath: string) {
  const basePath = path.dirname(tsconfigPath);
  const { config, error } = ts.readConfigFile(tsconfigPath, filename => fs.readFileSync(filename, 'utf8'));

  if (error !== undefined) {
    const errorText =
      `Cannot load custom tsconfig.json from provided path: ${tsconfigPath}, ` +
      `with error code: ${error.code}, message: ${error.messageText}`;
    throw new Error(errorText);
  }

  const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, {}, tsconfigPath);

  if (errors && errors.length) {
    throw errors[0];
  }

  return options;
}
