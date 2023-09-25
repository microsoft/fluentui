import {
  _getImports,
  _getPackageName,
  _getImportIdentifiers,
  tryParseExample,
  IMPORT_REGEX,
  _tryParseExample,
} from './exampleParser';
import { SUPPORTED_PACKAGES } from '../utilities/defaultSupportedPackages';
import type { IImport } from './exampleParser';

/** Random little code snippet to add before or after imports for more realistic tests */
const basicText = `
const foo = 'hello';
const bar = 'world';
console.log(foo, bar);
`;

const reactImport: IImport = {
  text: "import * as React from 'react';",
  path: 'react',
  packageName: 'react',
  identifiers: [{ name: '*', as: 'React' }],
};

describe('_getPackageName', () => {
  it('works with unscoped package name', () => {
    expect(_getPackageName('@fluentui/react')).toBe('@fluentui/react');
    expect(_getPackageName('@fluentui/react/lib/foo')).toBe('@fluentui/react');
    expect(_getPackageName('foo/bar')).toBe('foo');
  });

  it('works with scoped package name', () => {
    expect(_getPackageName('@fluentui/react-experiments')).toBe('@fluentui/react-experiments');
    expect(_getPackageName('@fluentui/react-experiments/lib/foo')).toBe('@fluentui/react-experiments');
    expect(_getPackageName('@a-b/c-d')).toBe('@a-b/c-d');
    expect(_getPackageName('@a-b/c-d/lib/foo')).toBe('@a-b/c-d');
  });

  it('returns empty string for relative path', () => {
    expect(_getPackageName('./foo')).toBe('');
  });
});

describe('_getImportIdentifiers', () => {
  it('works with empty contents due to side effect import', () => {
    expect(_getImportIdentifiers(undefined)).toEqual([]);
  });

  it('works with import default', () => {
    expect(_getImportIdentifiers('Foo')[0]).toEqual({ name: 'default', as: 'Foo' });
  });

  it('works with importing a single item', () => {
    expect(_getImportIdentifiers('{ Foo }')[0]).toEqual({ name: 'Foo' });
    expect(_getImportIdentifiers('{Foo}')[0]).toEqual({ name: 'Foo' });
    expect(_getImportIdentifiers('{\n  Foo\n}')[0]).toEqual({ name: 'Foo' });
  });

  it('works with importing multiple items', () => {
    expect(_getImportIdentifiers('{ Foo, Bar }')).toEqual([{ name: 'Foo' }, { name: 'Bar' }]);
    expect(_getImportIdentifiers('{ Foo, Bar, Baz }')).toEqual([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]);
    expect(_getImportIdentifiers('{  Foo , Bar , Baz}')).toEqual([{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }]);
    expect(_getImportIdentifiers('{\n  Foo,\n  Bar,\n  Baz\n}')).toEqual([
      { name: 'Foo' },
      { name: 'Bar' },
      { name: 'Baz' },
    ]);
  });

  it('works with import star', () => {
    expect(_getImportIdentifiers('* as Foo')[0]).toEqual({ name: '*', as: 'Foo' });
    expect(_getImportIdentifiers('*  as  Foo')[0]).toEqual({ name: '*', as: 'Foo' });
  });

  it('works with renamed imports', () => {
    expect(_getImportIdentifiers('{ Foo as Bar }')).toEqual([{ name: 'Foo', as: 'Bar' }]);
    expect(_getImportIdentifiers('{ Foo  as  Bar }')).toEqual([{ name: 'Foo', as: 'Bar' }]);
    expect(_getImportIdentifiers('{Foo  as  Bar}')).toEqual([{ name: 'Foo', as: 'Bar' }]);
    expect(_getImportIdentifiers('{ Foo as Bar, Baz }')).toEqual([{ name: 'Foo', as: 'Bar' }, { name: 'Baz' }]);
    expect(_getImportIdentifiers('{\nFoo as Bar,\nBaz, Bar as Foo }')).toEqual([
      { name: 'Foo', as: 'Bar' },
      { name: 'Baz' },
      { name: 'Bar', as: 'Foo' },
    ]);
  });
});

describe('IMPORT_REGEX', () => {
  it('handles text without imports', () => {
    expect(basicText).not.toMatch(IMPORT_REGEX);
  });

  it('handles side effect imports', () => {
    expect(`import 'foo';${basicText}`).toMatch(IMPORT_REGEX);
    expect(`import "foo";${basicText}`).toMatch(IMPORT_REGEX);
    expect(`import    'foo';${basicText}`).toMatch(IMPORT_REGEX);
    expect(`import './foo';${basicText}`).toMatch(IMPORT_REGEX);
  });

  it('handles import default', () => {
    let text = "import Foo from 'foo';";
    // ... on the match result converts the RegExpMatchArray to a regular array
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, 'Foo', 'foo']);

    text = "import   Foo   from  'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, 'Foo', 'foo']);

    text = "import Foo from './foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, 'Foo', './foo']);

    text = 'import Foo from "./foo";';
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, 'Foo', './foo']);
  });

  it('handles import star', () => {
    let text = "import * as Foo from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '* as Foo', 'foo']);

    text = "import   *  as  Foo   from  'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '*  as  Foo', 'foo']);

    text = "import * as Foo from './foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '* as Foo', './foo']);
  });

  it('handles import named', () => {
    let text = "import { Foo } from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{ Foo }', 'foo']);

    text = "import {Foo} from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{Foo}', 'foo']);

    text = "import { Foo as Bar } from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{ Foo as Bar }', 'foo']);

    text = "import   {  Foo  }   from  'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{  Foo  }', 'foo']);

    text = "import {\n  Foo\n} from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{\n  Foo\n}', 'foo']);

    text = "import { Foo } from './foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{ Foo }', './foo']);
  });

  it('handles import named multi', () => {
    let text = "import { Foo, Bar } from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{ Foo, Bar }', 'foo']);

    text = "import {Foo,Bar} from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{Foo,Bar}', 'foo']);

    text = "import { Foo as Bar,\nBaz } from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{ Foo as Bar,\nBaz }', 'foo']);

    text = "import {\n  Foo,\n  Bar\n} from 'foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{\n  Foo,\n  Bar\n}', 'foo']);

    text = "import { Foo } from './foo';";
    expect([...(text + basicText).match(IMPORT_REGEX)!]).toEqual([text, '{ Foo }', './foo']);
  });

  it('requires semicolon', () => {
    expect(`import Foo from 'foo'\n${basicText}`).not.toMatch(IMPORT_REGEX);
  });
});

describe('_getImports', () => {
  it('handles text without imports', () => {
    expect(_getImports(basicText)).toEqual([]);
  });

  it('handles side effect imports', () => {
    const text = "import 'foo';";
    expect(_getImports(text + basicText)[0]).toEqual({ text, packageName: 'foo', path: 'foo', identifiers: [] });
  });

  it('distinguishes package name and path', () => {
    const text = "import 'foo/bar';";
    expect(_getImports(text + basicText)[0]).toEqual({ text, packageName: 'foo', path: 'foo/bar', identifiers: [] });
  });

  it('handles no package name', () => {
    const text = "import './foo';";
    expect(_getImports(text + basicText)[0]).toEqual({ text, packageName: '', path: './foo', identifiers: [] });
  });

  it('handles import default', () => {
    const text = "import Foo from 'foo';";
    expect(_getImports(text + basicText)[0]).toEqual({
      text,
      packageName: 'foo',
      path: 'foo',
      identifiers: [{ name: 'default', as: 'Foo' }],
    });

    // import at end (weird but should be handled)
    expect(_getImports(basicText + text)[0]).toEqual({
      text,
      packageName: 'foo',
      path: 'foo',
      identifiers: [{ name: 'default', as: 'Foo' }],
    });
  });

  it('handles import star', () => {
    const text = "import * as Foo from 'foo';";
    expect(_getImports(text + basicText)[0]).toEqual({
      text,
      packageName: 'foo',
      path: 'foo',
      identifiers: [{ name: '*', as: 'Foo' }],
    });
  });

  it('handles import named', () => {
    let text = "import { Foo } from 'foo';";
    expect(_getImports(text + basicText)[0]).toEqual({
      text,
      packageName: 'foo',
      path: 'foo',
      identifiers: [{ name: 'Foo' }],
    });

    text = "import { Foo, Bar as Baz } from 'foo';";
    expect(_getImports(text + basicText)[0]).toEqual({
      text,
      packageName: 'foo',
      path: 'foo',
      identifiers: [{ name: 'Foo' }, { name: 'Bar', as: 'Baz' }],
    });

    text = "import {\n  Foo,\n  Bar as Baz\n} from 'foo';";
    expect(_getImports(text + basicText)[0]).toEqual({
      text,
      packageName: 'foo',
      path: 'foo',
      identifiers: [{ name: 'Foo' }, { name: 'Bar', as: 'Baz' }],
    });
  });

  it('handles multiple imports', () => {
    const text = `
import { Foo } from 'foo';
import * as Bar from 'foo/bar';
${basicText}
import "./foo";
import {
  a,
  B as C,
  D
} from 'baz';
`;
    expect(_getImports(text + basicText)).toEqual([
      {
        text: "import { Foo } from 'foo';",
        packageName: 'foo',
        path: 'foo',
        identifiers: [{ name: 'Foo' }],
      },
      {
        text: "import * as Bar from 'foo/bar';",
        packageName: 'foo',
        path: 'foo/bar',
        identifiers: [{ name: '*', as: 'Bar' }],
      },
      {
        text: 'import "./foo";',
        packageName: '',
        path: './foo',
        identifiers: [],
      },
      {
        text: "import {\n  a,\n  B as C,\n  D\n} from 'baz';",
        packageName: 'baz',
        path: 'baz',
        identifiers: [{ name: 'a' }, { name: 'B', as: 'C' }, { name: 'D' }],
      },
    ]);
  });
});

describe('tryParseExample', () => {
  it('detects missing React import', () => {
    const example = `
import { Component } from 'react';
exort class Foo extends Component {};
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      `The example must include "import * as React from 'react';"`,
    );
  });

  it('detects incorrectly formatted React import', () => {
    // Not supporting synthetic default React import for now since it's less portable
    const example = `
import React from 'react';
exort class Foo extends React.Component {};
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      `The example must include "import * as React from 'react';"`,
    );
  });

  it('detects default export usage', () => {
    const example = `
import * as React from 'react';
export default class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('"export default" is not supported by the editor.');
  });

  it('detects no exported possible components', () => {
    // there's a component but it's not exported
    const example = `
import * as React from 'react';
class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      'The example must export a single class or const for the component to render (found: none).',
    );
  });

  it('detects more than one exported possible component', () => {
    // Foo is a component. Bar is (to a human) obviously not a component, but our example processor
    // isn't that smart. Baz is not exported.
    const example = `
import * as React from 'react';
export class Foo extends React.Component {}
export const Bar = 3;
class Baz extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      'The example must export a single class or const for the component to render (found: 2).',
    );
  });

  it('detects require usage', () => {
    let example = `
import * as React from 'react';
const foo = require('foo');
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('"require(...)" is not supported by the editor.');

    example = example.replace("require('foo')", "require<string>('foo')");
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('"require(...)" is not supported by the editor.');
  });

  it('detects incorrect React imports', () => {
    const example = `
import * as React from 'react';
import { useState } from 'react';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      `Invalid React import format for the editor. Please only use "import * as React from 'react'".`,
    );
  });

  it('detects scss imports', () => {
    let example = `
import * as React from 'react';
import './Foo.scss';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('Importing scss is not supported by the editor.');

    example = example.replace("import './Foo.scss'", "import * as styles from './Foo.scss'");
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('Importing scss is not supported by the editor.');
  });

  it('detects relative imports', () => {
    const example = `
import * as React from 'react';
import { foo } from './foo';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('Relative imports are not supported by the editor.');
  });

  it('detects side effect imports', () => {
    const example = `
import * as React from 'react';
import '@fluentui/utilities';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      'Importing a file for its side effects ("import \'path\'") is not supported by the editor.',
    );
  });

  it('detects import star', () => {
    const example = `
import * as React from 'react';
import * as Utilities from '@fluentui/utilities';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      '"import *" is not supported by the editor (except from react).',
    );
  });

  it('detects unsupported package imports', () => {
    const example = `
import * as React from 'react';
import { Promise } from 'es6-promise';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      `Importing from package "es6-promise" is not supported by the editor.`,
    );
  });

  it('detects default imports', () => {
    let example = `
import * as React from 'react';
import Bar from '@fluentui/react/lib/Bar';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('Default imports are not supported by the editor.');

    example = example.replace('import Bar', 'import { default as Bar }');
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe('Default imports are not supported by the editor.');
  });

  it('detects deep imports', () => {
    let example = `
import * as React from 'react';
import { Bar } from '@fluentui/react/lib/Bar';
import { baz } from '@fluentui/react/lib/utilities/baz';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      'Importing from more than two levels below the package root is not supported by the editor.',
    );

    example = example.replace('@fluentui/react/lib/utilities/baz', '@fluentui/utilities/lib/bar/baz');
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toBe(
      'Importing from more than two levels below the package root is not supported by the editor.',
    );
  });

  it('returns right result for valid example!', () => {
    const example = `
import * as React from 'react';
import { Bar } from '@fluentui/react/lib/Bar';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toEqual({
      tsCode: example,
      component: 'Foo',
      imports: [
        reactImport,
        {
          text: "import { Bar } from '@fluentui/react/lib/Bar';",
          path: '@fluentui/react/lib/Bar',
          packageName: '@fluentui/react',
          identifiers: [{ name: 'Bar' }],
        },
      ],
    });
  });

  it('returns right result including example data', () => {
    const example = `
import * as React from 'react';
import { Bar } from '@fluentui/react/lib/Bar';
import { createListItems } from '@fluentui/example-data';
export class Foo extends React.Component {}
`;
    expect(tryParseExample(example, SUPPORTED_PACKAGES)).toEqual({
      tsCode: example,
      component: 'Foo',
      imports: [
        reactImport,
        {
          text: "import { Bar } from '@fluentui/react/lib/Bar';",
          path: '@fluentui/react/lib/Bar',
          packageName: '@fluentui/react',
          identifiers: [{ name: 'Bar' }],
        },
        {
          text: "import { createListItems } from '@fluentui/example-data';",
          path: '@fluentui/example-data',
          packageName: '@fluentui/example-data',
          identifiers: [{ name: 'createListItems' }],
        },
      ],
    });
  });

  it('returns right result with custom supportedPackages', () => {
    const example = `
import * as React from 'react';
import { Bar } from 'bar';
import { Baz } from 'foo';
import { createListItems } from 'example-data';
export class Foo extends React.Component {}
`;

    // Use the internal part of tryParseExample for this test so we don't have to manually create
    // fake supported package groups which won't be used
    expect(_tryParseExample(example, ['foo', 'bar', 'example-data'])).toEqual({
      tsCode: example,
      component: 'Foo',
      imports: [
        reactImport,
        {
          text: "import { Bar } from 'bar';",
          path: 'bar',
          packageName: 'bar',
          identifiers: [{ name: 'Bar' }],
        },
        {
          text: "import { Baz } from 'foo';",
          path: 'foo',
          packageName: 'foo',
          identifiers: [{ name: 'Baz' }],
        },
        {
          text: "import { createListItems } from 'example-data';",
          path: 'example-data',
          packageName: 'example-data',
          identifiers: [{ name: 'createListItems' }],
        },
      ],
    });
  });
});
