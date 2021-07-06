import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

import { ComponentDoc, FileParser, withCompilerOptions } from 'react-docgen-typescript';

let program: ts.Program;
let parser: FileParser;

/**
 * Run `react-docgen-typescript` on a component file to get info about its props.
 */
export function getComponentDoc(componentPath: string): ComponentDoc[] {
  if (!program) {
    // Calling parse() from react-docgen-typescript would create a new ts.Program for every component,
    // which can take multiple seconds in a large project. For better performance, we create a single
    // ts.Program per package and pass it to parseWithProgramProvider().

    const tsconfigPath = ts.findConfigFile(process.cwd(), fs.existsSync);
    if (!tsconfigPath) {
      throw new Error('Cannot find tsconfig.json');
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

    parser = withCompilerOptions(compilerOptions, {
      // Props need to be filtered since react-docgen shows all the props including inherited
      // native props or React built-in props. (Check for both @types/react and react/index.d.ts
      // because there may be some variation in which format is used.)
      propFilter: prop => !/@types[\\/]react[\\/]|\breact[\\/]index\.d\.ts$/.test(prop.parent?.fileName || ''),
    });
  }

  if (!program.getSourceFile(componentPath)) {
    // See earlier comment for why it's handled this way (can reconsider if it becomes a problem)
    throw new Error(`Component file "${componentPath}" does not appear to be referenced from the project index file`);
  }

  return parser.parseWithProgramProvider(componentPath, () => program);
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
