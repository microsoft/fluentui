/**
 * @jest-environment node
 */

import { DirectoryJSON, fs as memFS, vol } from 'memfs';
import * as realFS from 'fs';
import * as ts from 'typescript';

import { getCallbackArguments } from './getCallbackArguments';

/**
 * Creates a CompilerHost that reads files from memfs.
 */
function createCompilerHost(): ts.CompilerHost {
  const originalHost = ts.createCompilerHost({});

  function fileExists(fileName: string): boolean {
    return memFS.existsSync(fileName) || realFS.existsSync(fileName);
  }

  function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget) {
    let sourceText;

    if (memFS.existsSync(fileName)) {
      sourceText = memFS.readFileSync(fileName, 'utf8') as string;
    } else if (realFS.existsSync(fileName)) {
      sourceText = realFS.readFileSync(fileName, 'utf8');
    }

    return sourceText === undefined ? undefined : ts.createSourceFile(fileName, sourceText, languageVersion);
  }

  return {
    ...originalHost,

    readFile: () => {
      throw new Error('Not supported');
    },
    writeFile: () => {
      throw new Error('Not supported');
    },

    getSourceFile,
    fileExists,
  };
}

async function setupProgram(
  rootNames: ts.CreateProgramOptions['rootNames'],
  directoryJSON: DirectoryJSON,
): Promise<ts.Program> {
  vol.fromJSON(directoryJSON);

  return ts.createProgram({
    rootNames,
    options: {},
    host: createCompilerHost(),
  });
}

describe('getCallbackArguments', () => {
  describe('params', () => {
    it('handles "null" as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: null) => void; }',
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: null });
    });

    it('handles primitives as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `export interface AccordionProps {
          onToggle: (a: string, b: number, c: boolean, d: undefined) => void;
        }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ a: 'String', b: 'Number', c: 'Boolean', d: undefined });
    });

    it('handles simple type reference as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: Event) => void; }',
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: 'Event' });
    });

    it('handles complex type reference as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';
      
       export interface AccordionProps { onToggle: (e: React.MouseEvent) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: 'React.MouseEvent' });
    });

    it('handles alias type as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';
      
       type AccordionOnToggle = (e: React.MouseEvent) => void;
       export interface AccordionProps { onToggle: AccordionOnToggle; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: 'React.MouseEvent' });
    });

    // TODO: to write better assertions we will need to resolve some of our custom types
    // it.todo('revolves references', async () => {
    //   const program = await setupProgram(['Accordion.types.ts'], {
    //     './Accordion.types.ts': `import * as React from 'react';
    //
    //     export interface AccordionToggleData {
    //       value: AccordionItemValue;
    //     }
    //
    //     export type AccordionToggleEvent<E = HTMLElement> = React.MouseEvent<E> | React.KeyboardEvent<E>;
    //     export type AccordionToggleEventHandler = (event: AccordionToggleEvent, data: AccordionToggleData) => void;
    //
    //     export interface AccordionProps {
    //       onToggle: AccordionToggleEventHandler;
    //     }`,
    //   });
    //   const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');
    //
    //   expect(type).toMatchObject({ event: ['React.MouseEvent', 'React.KeyboardEvent'], data: { value: 'String' } });
    // });

    it('handles generics', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';
      
        export interface AccordionProps { onToggle: (e: React.MouseEvent<HTMLElement>) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: 'React.MouseEvent' });
    });

    it('handles unions', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';
      
        export interface AccordionProps { onToggle: (e: MouseEvent | React.MouseEvent) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: ['MouseEvent', 'React.MouseEvent'] });
    });

    it('handles multiple params', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';
      
        export interface AccordionProps { onToggle: (e: null, data: { value: string }) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toMatchObject({ e: null, data: { value: 'String' } });
    });
  });

  describe('errors', () => {
    it('throws when a file is not found', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: null) => void; }',
      });

      expect(() => getCallbackArguments(program, 'Button.types.ts', 'AccordionProps', 'onToggle')).toThrowError(
        [
          'A file (Button.types.ts) was not found in TS program, this looks like an invocation problem,',
          'check your params',
        ].join(' '),
      );
    });

    it('throws when an interface is not found', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: null) => void; }',
      });

      expect(() =>
        getCallbackArguments(program, 'Accordion.types.ts', 'ButtonProps', 'onToggle'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"A file (Accordion.types.ts) does not contain definition for type \\"ButtonProps\\""`,
      );
    });

    it('throws when an interface is not found', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: null) => void; }',
      });

      expect(() =>
        getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onClick'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"A file (Accordion.types.ts) does not contain definition for type \\"AccordionProps.onClick\\""`,
      );
    });
  });
});
