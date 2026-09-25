import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { generateApiMetadata } from './generate';
import { validateCatalog } from './validate';
import type { GeneratorResult } from './types';

const root = resolve(__dirname, '../.api-metadata-slot-test');
let result: GeneratorResult;

beforeAll(async () => {
  const utilities = join(root, 'node_modules/@fluentui/react-utilities');
  mkdirSync(utilities, { recursive: true });
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({
      name: '@fixture/slot-surface',
      version: '1.0.0',
      types: './index.d.ts',
      dependencies: { '@fluentui/react-utilities': '1.0.0' },
    }),
  );
  writeFileSync(
    join(utilities, 'package.json'),
    JSON.stringify({
      name: '@fluentui/react-utilities',
      version: '1.0.0',
      types: './index.d.ts',
    }),
  );
  writeFileSync(
    join(utilities, 'index.d.ts'),
    `
    type WithSlotShorthandValue<P> = P | string | number;
    export type Slot<T, A extends string = never> =
      WithSlotShorthandValue<T extends string ? { as?: T; children?: string } :
        T extends (props: infer P) => unknown ? P : T>
      | (A extends unknown ? { as: A; children?: string } : never) | null;
    export namespace Other { export type Slot<T> = { as?: T } }
    export declare const ExternalAction: (props: { enabled?: boolean }) => { type: string };
    export default ExternalAction;
  `,
  );
  writeFileSync(join(root, 'bridge.d.ts'), `export type { Slot as ReexportedSlot } from '@fluentui/react-utilities';`);
  writeFileSync(
    join(root, 'index.d.ts'),
    `
    import type { ReexportedSlot as S } from './bridge';
    import type { Other } from '@fluentui/react-utilities';
    import type * as Utilities from '@fluentui/react-utilities';
    import type DefaultAction from '@fluentui/react-utilities';
    export interface ReactElement { type: string }
    export declare const Action: (props: { disabled?: boolean }) => ReactElement;
    type NativeSlot<T extends string> = S<T>;
    type CustomProps = { as?: 'span'; custom: true };
    declare namespace Fake { type Slot<T> = { as?: T } }
    export type Props = {
      icon?: S<'span'>;
      heading: NonNullable<S<'div', 'h1' | 'h2'>>;
      action?: S<typeof Action>;
      external?: S<typeof Utilities.ExternalAction>;
      defaultAction?: S<typeof DefaultAction>;
      aliased?: NativeSlot<'span'>;
      constrained?: Exclude<S<'span'>, string>;
      specialized?: S<'span'> & CustomProps;
      custom?: S<CustomProps>;
      mixed?: S<'span'> | { unrelated: true };
      unrelated?: { as?: 'span' };
      fake?: Fake.Slot<'span'>;
      shadow?: Other.Slot<'span'>;
    };
    export type RequiredProps = Required<Pick<Props, 'icon'>>;
    export type NonNullProps = { [K in keyof Props]: NonNullable<Props[K]> };
    export type ObjectOnlyProps = { icon?: Exclude<Props['icon'], string | number> };
    export type GenericSlots<T extends string> = { icon?: S<T> };
    export type ConcreteSlots = GenericSlots<'span'>;
    export declare function Widget(props: Props): ReactElement;
  `,
  );
  result = await generateApiMetadata({ packageRoot: root });
});

afterAll(() => rmSync(root, { recursive: true, force: true }));

function member(symbol: string, name: string) {
  const api = result.records.flatMap(record => record.symbols).find(value => value.name === symbol);
  const value = (api?.props?.[0]?.type ?? api?.effectiveType)?.members.find(candidate => candidate.name === name);
  if (!value) {
    throw new Error(`Missing ${symbol}.${name}`);
  }
  return value;
}

it('recovers verified slots through renamed imports and re-exports without replacing full types', () => {
  for (const name of ['Props', 'Widget']) {
    const icon = member(name, 'icon');
    expect(icon.presentation).toEqual({
      kind: 'slot',
      summary: "Slot<'span'>",
      basis: 'declaration',
      nullable: true,
      slotType: {
        kind: 'dependency',
        package: '@fluentui/react-utilities',
        entrypoint: '.',
        export: 'Slot',
        namespace: 'type',
      },
      targets: [{ kind: 'intrinsic', name: 'span', role: 'default' }],
    });
    expect(icon.type?.text).toBe('S<"span">');
    expect(icon.type?.text).not.toBe(icon.presentation?.summary);
  }
  expect(validateCatalog(result.index, result.records)).toEqual({
    valid: true,
    value: { index: result.index, records: result.records },
    diagnostics: [],
  });
  expect(result.records[0].declarationInputs.map(input => input.path)).toContain('bridge.d.ts');
  expect(result.records[0].declarationInputs.some(input => input.path.includes('node_modules'))).toBe(false);
  expect(result.records[0].dependencyInputs.map(input => input.package.name)).toContain('@fluentui/react-utilities');
});

it('preserves alternate elements, nullability, component identity and custom restrictions', () => {
  expect(member('Props', 'heading').presentation).toEqual(
    expect.objectContaining({
      summary: "NonNullable<Slot<'div', 'h1' | 'h2'>>",
      nullable: false,
      targets: [
        { kind: 'intrinsic', name: 'div', role: 'default' },
        { kind: 'intrinsic', name: 'h1', role: 'alternate' },
        { kind: 'intrinsic', name: 'h2', role: 'alternate' },
      ],
    }),
  );
  expect(member('Props', 'action').presentation?.targets).toEqual([
    expect.objectContaining({
      kind: 'component',
      name: 'Action',
      reference: expect.objectContaining({ kind: 'local' }),
    }),
  ]);
  expect(member('Props', 'action').presentation?.summary).toBe('Slot<typeof Action>');
  expect(member('Props', 'external').presentation?.targets).toEqual([
    expect.objectContaining({
      kind: 'component',
      reference: {
        kind: 'dependency',
        package: '@fluentui/react-utilities',
        entrypoint: '.',
        export: 'ExternalAction',
        namespace: 'value',
      },
    }),
  ]);
  expect(member('Props', 'defaultAction').presentation?.targets).toEqual([
    expect.objectContaining({
      kind: 'component',
      reference: {
        kind: 'dependency',
        package: '@fluentui/react-utilities',
        entrypoint: '.',
        export: 'default',
        namespace: 'value',
      },
    }),
  ]);
  expect(member('Props', 'aliased').presentation).toEqual(
    expect.objectContaining({
      summary: "NativeSlot<'span'>",
      targets: [{ kind: 'intrinsic', name: 'span', role: 'default' }],
    }),
  );
  expect(member('Props', 'constrained').presentation?.summary).toBe("Exclude<Slot<'span'>, string>");
  expect(member('Props', 'specialized').presentation?.summary).toContain('CustomProps');
  expect(member('Props', 'custom').presentation).toEqual(
    expect.objectContaining({
      summary: 'Slot<CustomProps>',
      targets: [],
    }),
  );
});

it('keeps requiredness separate from nullability and retains derived NonNullable restrictions', () => {
  expect(member('RequiredProps', 'icon').optional).toBe(false);
  expect(member('RequiredProps', 'icon').presentation?.nullable).toBe(true);
  expect(member('NonNullProps', 'icon').presentation).toEqual(
    expect.objectContaining({
      summary: "NonNullable<Slot<'span'>>",
      nullable: false,
      basis: 'semantic',
    }),
  );
});

it('does not classify lookalikes, mixed unions, resolved objects or unverified substitutions as slot inputs', () => {
  for (const prop of ['fake', 'shadow', 'unrelated', 'mixed']) {
    expect(member('Props', prop).presentation).toBeUndefined();
  }
  expect(member('ObjectOnlyProps', 'icon').presentation).toBeUndefined();
  expect(member('ConcreteSlots', 'icon').presentation).toBeUndefined();
});
