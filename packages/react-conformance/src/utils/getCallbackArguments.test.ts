/*
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
      //   throw new Error('Not supported');
      return '';
    },
    writeFile: () => {
      //   throw new Error('Not supported');
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
    it('handles empty params', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: () => void; }',
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([]);
    });

    it('handles "null" as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: null) => void; }',
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', null]]);
    });

    it('handles primitives as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `export interface AccordionProps {
          onToggle: (a: string, b: number, c: boolean, d: undefined) => void;
        }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([
        ['a', 'string'],
        ['b', 'number'],
        ['c', 'boolean'],
        ['d', undefined],
      ]);
    });

    it('handles arrays', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (data: string[]) => void; }',
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['data', 'Array']]);
    });

    it('handles simple type reference as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: Event) => void; }',
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', 'Event']]);
    });

    it('handles complex type reference as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

       export interface AccordionProps { onToggle: (e: React.MouseEvent) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', 'React.MouseEvent']]);
    });

    it('handles alias type as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

       type AccordionOnToggle = (e: React.MouseEvent) => void;
       export interface AccordionProps { onToggle: AccordionOnToggle; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', 'React.MouseEvent']]);
    });

    it('handles imported alias type as a param', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './AccordionToggle.types.ts': `export type AccordionOnToggle = (e: React.MouseEvent) => void;`,
        './Accordion.types.ts': `import * as React from 'react';
        import { AccordionOnToggle } from './AccordionToggle.types';

       export interface AccordionProps { onToggle: AccordionOnToggle; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', 'React.MouseEvent']]);
    });

    it('revolves references', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        export type TypeA = React.MouseEvent;
        export type TypeString = string;
        export type TypeB = React.MouseEvent | MouseEvent | TypeString | number;

        export type AccordionToggleEventHandler = (a: TypeA, b: TypeB, c: React.MouseEvent) => void;

        export interface AccordionProps {
          onToggle: AccordionToggleEventHandler;
        }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([
        ['a', 'React.MouseEvent'],
        ['b', ['string', 'number', 'MouseEvent', 'React.MouseEvent']],
        ['c', 'React.MouseEvent'],
      ]);
    });

    it('revolves references to classes', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        export class TabItem {}
        export interface AccordionProps {
          onToggle: (item: TabItem) => void;
        }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['item', 'TabItem']]);
    });

    it('revolves references to interfaces', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        type AccordionItemValue = string

        export interface Data {
          key: string
          value: AccordionItemValue;
        }

        export type AccordionToggleEventHandler = (data: Data) => void;

        export interface AccordionProps {
          onToggle: AccordionToggleEventHandler;
        }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['data', { key: 'string', value: 'string' }]]);
    });

    it('handles generics', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        export interface AccordionProps { onToggle: (e: React.MouseEvent<HTMLElement>) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', 'React.MouseEvent']]);
    });

    it('handles unions', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        export interface AccordionProps { onToggle: (e: MouseEvent | React.MouseEvent) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([['e', ['MouseEvent', 'React.MouseEvent']]]);
    });

    it('handles multiple params', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        export interface AccordionProps { onToggle: (e: null, data: { value: string }) => void; }`,
      });
      const type = getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle');

      expect(type).toEqual([
        ['e', null],
        ['data', { value: 'string' }],
      ]);
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
        `"A file (Accordion.types.ts) does not contain definition for type \\"ButtonProps.onToggle\\"."`,
      );
    });

    it('throws when a property is not found', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': 'export interface AccordionProps { onToggle: (e: null) => void; }',
      });

      expect(() =>
        getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onClick'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"A file (Accordion.types.ts) does not contain definition for type \\"AccordionProps.onClick\\"."`,
      );
    });

    it('throws on complex types', async () => {
      const program = await setupProgram(['Accordion.types.ts'], {
        './Accordion.types.ts': `import * as React from 'react';

        type TypeA = { open: boolean }
        type TypeB = Pick<TypeA, 'open'>
        export interface AccordionProps { onToggle: (a: TypeB) => void; }`,
      });

      /* eslint-disable @fluentui/max-len */
      expect(() =>
        getCallbackArguments(program, 'Accordion.types.ts', 'AccordionProps', 'onToggle'),
      ).toThrowErrorMatchingInlineSnapshot(
        `"We received a type \\"TypeB\\" that is too complex to resolve. Please simply it, for example remove usage of \\"Pick\\"."`,
      );
      /* eslint-enable @fluentui/max-len */
    });
  });
});
