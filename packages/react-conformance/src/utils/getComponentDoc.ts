import * as ts from 'typescript';
import { ComponentDoc, FileParser, withCompilerOptions } from 'react-docgen-typescript';

let parser: FileParser;

/**
 * Run `react-docgen-typescript` on a component file to get info about its props.
 */
export function getComponentDoc(componentPath: string, program: ts.Program): ComponentDoc[] {
  if (!parser) {
    parser = withCompilerOptions(program.getCompilerOptions(), {
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
