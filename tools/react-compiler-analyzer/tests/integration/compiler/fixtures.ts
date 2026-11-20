export interface Fixture {
  id: string;
  source: string;
  target: string;
  hookValidity: 'valid' | 'invalid' | 'not-applicable';
  suppression: 'absent' | 'valid-unnecessary' | 'valid-invalid-hook' | 'malformed' | 'misplaced' | 'unknown-rule';
  gated?: boolean;
}

const positive = `export function Sample({ value }: { value: number }) {
  return <output>{value + 1}</output>;
}`;
const valid = (comment = '') => `import { useEffect } from 'react';
declare function observe(value: number): void;
export function Sample({ value }: { value: number }) {
  ${comment}
  useEffect(() => { observe(value); }, [value]);
  return <output>{value}</output>;
}`;
const invalid = (comment = '') => `import { useState } from 'react';
export function Sample({ active }: { active: boolean }) {
  if (active) {
    ${comment}
    useState(0);
  }
  return <output>{active ? 'active' : 'idle'}</output>;
}`;

const fixture = (
  id: string,
  source: string,
  hookValidity: Fixture['hookValidity'] = 'not-applicable',
  suppression: Fixture['suppression'] = 'absent',
  target = 'Sample',
): Fixture => ({ id, source, target, hookValidity, suppression });

// Original, deliberately small fixtures. Public repros informed the categories, not the source:
// https://github.com/Hotell/compiler-experiment/tree/0bed5273114701e13d3f835c11330f850499625e/compiler-repros
export const fixtures: Fixture[] = [
  fixture('positive', positive),
  fixture('module-opt-out', `"use no memo";\n${positive}`),
  fixture('valid-hooks', valid(), 'valid'),
  fixture(
    'unnecessary-suppression',
    valid('// eslint-disable-next-line react-hooks/exhaustive-deps'),
    'valid',
    'valid-unnecessary',
  ),
  fixture('invalid-hooks', invalid(), 'invalid'),
  fixture(
    'suppressed-invalid-hooks',
    invalid('// eslint-disable-next-line react-hooks/rules-of-hooks'),
    'invalid',
    'valid-invalid-hook',
  ),
  fixture(
    'malformed-suppression',
    valid('// eslint-disable-nextline react-hooks/exhaustive-deps'),
    'valid',
    'malformed',
  ),
  fixture(
    'misplaced-suppression',
    valid('// eslint-disable-next-line react-hooks/exhaustive-deps\n  const unrelated = value + 1;'),
    'valid',
    'misplaced',
  ),
  fixture(
    'unknown-rule-suppression',
    valid('// eslint-disable-next-line react-hooks/not-a-real-rule'),
    'valid',
    'unknown-rule',
  ),
  fixture(
    'namespace',
    `namespace Ledger { export let offset = 2; }\n${positive.replace('value + 1', 'value + Ledger.offset')}`,
  ),
  fixture(
    'import-assignment',
    `import source = require("fixture-source");\n${positive.replace('value + 1', 'value + source.offset')}`,
  ),
  fixture(
    'export-assignment',
    `import { useState } from 'react';
    function useSample(initial: number) {
      const [value] = useState(initial);
      return { value: value + 1 };
    }
    export = useSample;`,
    'valid',
    'absent',
    'useSample',
  ),
  fixture(
    'declare-field',
    `class Ledger { declare offset: number; }\n${positive.replace('value + 1', 'new Ledger().offset + value')}`,
  ),
  fixture(
    'computed-member-control',
    `const fields = { reading: 'reading' };
    export function Sample({ row }: { row: Record<string, number> }) {
      return <output>{row[fields.reading]}</output>;
    }`,
  ),
  fixture(
    'computed-template-key',
    `const fields = { reading: 'reading' };
    export function Sample({ row }: { row: Record<string, number> }) {
      return <output>{row[\`\${fields.reading}\`]}</output>;
    }`,
  ),
  fixture(
    'computed-template-mutation',
    `const fields = { reading: 'reading' };
    export function Sample({ value }: { value: number }) {
      const row = {};
      row[\`\${fields.reading}\`] = value + 1;
      return <output>{row[\`\${fields.reading}\`]}</output>;
    }`,
  ),
  fixture(
    'computed-member-mutation-control',
    `const fields = { reading: 'reading' };
    export function Sample({ value }: { value: number }) {
      const row = {};
      row[fields.reading] = value + 1;
      return <output>{row[fields.reading]}</output>;
    }`,
  ),
  fixture(
    'hidden-selector',
    `import { store } from "fixture-store";
    export function Sample() {
      const value = store.use.selected();
      return <output>{value}</output>;
    }`,
    'valid',
  ),
  fixture(
    'recognized-selector-control',
    `import { useSelected } from "fixture-store";
    export function Sample() {
      const value = useSelected();
      return <output>{value}</output>;
    }`,
    'valid',
  ),
  ...[false, true].map(gated => ({
    ...fixture(
      gated ? 'exported-overload-gated' : 'exported-overload',
      `import { useState } from "react";
      export function useSample(value: number): { value: number };
      export function useSample(): { value: number };
      export function useSample(value = 3) {
        const [result] = useState(value);
        return { value: result + 2 };
      }`,
      'valid',
      'absent',
      'useSample',
    ),
    gated,
  })),
  fixture(
    'outlined-closure',
    `import { useState } from 'react';
    declare function canUseDOM(): boolean;
    const cache = new Map<unknown, unknown>();
    export function createLazy(factory: () => Promise<unknown>) {
      const Cached = () => {
        const [resolved] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
        return resolved ? <div /> : null;
      };
      Cached.import = factory;
      return Cached;
    }`,
    'valid',
    'absent',
    'createLazy',
  ),
  fixture(
    'outlined-closure-declaration-control',
    `import { useState } from 'react';
    declare function canUseDOM(): boolean;
    const cache = new Map<unknown, unknown>();
    export function createLazy(factory: () => Promise<unknown>) {
      function Cached() {
        const [resolved] = useState(() => (canUseDOM() ? cache.get(factory) : undefined));
        return resolved ? <div /> : null;
      }
      Cached.import = factory;
      return Cached;
    }`,
    'valid',
    'absent',
    'createLazy',
  ),
];
