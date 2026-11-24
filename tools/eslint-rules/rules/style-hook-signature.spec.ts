import * as path from 'node:path';
import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './style-hook-signature';

const fixtureRoot = path.join(__dirname, '__fixtures__/style-hook-signature');
const filename = 'packages/react-components/react-example/library/src/components/Example/test.ts';
const imports = `import type { ExampleState, OtherState } from './state';`;
const errors = [{ messageId: 'invalidSignature' as const }];
const tester = new RuleTester({
  languageOptions: {
    parserOptions: { project: path.join(fixtureRoot, 'tsconfig.json'), tsconfigRootDir: fixtureRoot },
  },
});

tester.run(RULE_NAME, rule, {
  valid: [
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): ExampleState => state;`,
    `${imports} type Alias = ExampleState;
      export function useExampleStyles_unstable(state: Alias): ExampleState { return state; }`,
    `${imports} export const useExampleStyles = (state: ExampleState): ExampleState => state;`,
    `${imports} export const useExampleStyles_unstable =
      <T extends ExampleState>(state: T): T => state;`,
    `${imports} type StateAlias<T extends ExampleState> = T;
      export const useExampleStyles_unstable = <T extends ExampleState>(state: T): StateAlias<T> => state;`,
    `${imports} export const useExampleStyles_unstable: (state: ExampleState) => ExampleState =
      function (state) { return state; };`,
    `${imports} const implementation = (state: ExampleState, extra?: boolean): ExampleState => state;
      export { implementation as useExampleStyles_unstable };`,
    `export { preserveState as useExampleStyles_unstable } from './state';`,
    `import { preserveState } from './state'; export const useExampleStyles_unstable = preserveState;`,
    `${imports} export declare function useExampleStyles_unstable(state: ExampleState): ExampleState;`,
    `${imports}
      export function useExampleStyles_unstable(state: ExampleState): ExampleState;
      export function useExampleStyles_unstable<T extends ExampleState>(state: T, extra: boolean): T;
      export function useExampleStyles_unstable(state: ExampleState): ExampleState { return state; }`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState) => ({ ...state });`,
    // Helpers and non-exported functions are outside the component hook contract.
    `export const useExampleIconStyles_unstable = (state: unknown): void => {};`,
    `const useExampleStyles_unstable = (state: unknown): void => {}; export {};`,
    `import { makeStyles as factory } from '@griffel/react';
      export const useExampleStyles = factory({});`,
    `import * as griffel from '@griffel/react';
      export const useExampleStyles = griffel.makeResetStyles({});`,
    `import { makeStyles } from '@fluentui/react-components';
      export const useExampleStyles = makeStyles({});`,
    `type RootlessState = { components: { content: 'div' }; content: { className?: string } };
      export const useExampleStyles_unstable = (state: RootlessState): RootlessState => state;`,
    `type State = { components: { root: 'div'; icon: 'span' }; root: {}; icon?: {} };
      export const useExampleStyles_unstable = (state: State): State => state;`,
    `type State = { components: { root: 'div'; media: 'span' }; root: {}; media: {} | undefined };
      export const useExampleStyles_unstable = (state: State): State => state;`,
    `type State = { components: { root: 'div'; omitted: 'span' }; root: {} };
      export const useExampleStyles_unstable = (state: State): State => state;`,
  ].map(code => ({ code, filename })),
  invalid: [
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): void => {};`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): OtherState => ({} as OtherState);`,
    `${imports} export const useExampleStyles_unstable = (state: OtherState): ExampleState => ({} as ExampleState);`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): number => 0;`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): any => state;`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): unknown => state;`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState): never => { throw Error(); };`,
    `export const useExampleStyles_unstable = (state: any): any => state;`,
    `type Escape = any; export const useExampleStyles_unstable = (state: Escape): Escape => state;`,
    `export const useExampleStyles_unstable = (state: unknown): unknown => state;`,
    `export const useExampleStyles_unstable = state => state;`,
    `export const useExampleStyles_unstable = <T>(state: T): T => state;`,
    `export const useExampleStyles_unstable = <T extends any>(state: T): T => state;`,
    `export const useExampleStyles_unstable = <T extends unknown>(state: T): T => state;`,
    `export const useExampleStyles_unstable = <T extends string>(state: T): T => state;`,
    `${imports} export const useExampleStyles_unstable =
      <T extends ExampleState>(state: T): ExampleState => state;`,
    `${imports} export const useExampleStyles_unstable = (): ExampleState => ({} as ExampleState);`,
    `${imports} export const useExampleStyles_unstable = (state?: ExampleState): ExampleState => state!;`,
    `${imports} export const useExampleStyles_unstable = (state: ExampleState = {} as ExampleState) => state;`,
    `${imports} export const useExampleStyles_unstable = (...state: ExampleState[]): ExampleState => state[0];`,
    `export const useExampleStyles_unstable = (state: string): string => state;`,
    `export const useExampleStyles_unstable = (state: { value: string }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: {}; components: any }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: any; components: { root: 'div' } }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: {}; components: { root: unknown } }) => state;`,
    `export const useExampleStyles_unstable = (state: { root?: {}; components: { root: 'div' } }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: {} | null; components: { root: 'div' } }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: {}; components: { root: 'div' | null } }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: {}; components: { root?: 'div' } }) => state;`,
    `export const useExampleStyles_unstable = (state: { root: {}; components: { root: never } }) => state;`,
    `${imports} const implementation = (state: ExampleState): void => {};
      export { implementation as useExampleStyles_unstable };`,
    `export { discardState as useExampleStyles_unstable } from './state';`,
    `import { discardState } from './state'; export const useExampleStyles_unstable = discardState;`,
    `${imports} export const useExampleStyles_unstable: (state: ExampleState) => void = state => {};`,
    `${imports} export function useExampleStyles_unstable(state: ExampleState): ExampleState;
      export function useExampleStyles_unstable(state: OtherState): void;
      export function useExampleStyles_unstable(state: ExampleState | OtherState): any { return state; }`,
    `export const useExampleStyles_unstable = 42;`,
    `export const useExampleStyles = (state: unknown): void => {};`,
    `const makeStyles = () => () => 'classes'; export const useExampleStyles = makeStyles();`,
  ].map(code => ({ code, filename, errors })),
});

tester.run(`${RULE_NAME} narrow calendar exclusion`, rule, {
  valid: [],
  invalid: [
    {
      filename: filename.replace('react-example', 'react-calendar-compat').replace('/Example/', '/Calendar/'),
      code: `export const useCalendarStyles = (state: unknown): void => {};`,
      errors,
    },
  ],
});

const slotlessFilename = filename.replace('/Example/', '/Slotless/');
tester.run(`${RULE_NAME} slotless state`, rule, {
  valid: [
    `import type { SlotlessState } from './state';
      export const useSlotlessStyles_unstable = (state: SlotlessState): SlotlessState => state;`,
    `import type { SlotlessState } from './state';
      export const useSlotlessStyles_unstable = <T extends SlotlessState>(state: T): T => state;`,
  ].map(code => ({ code, filename: slotlessFilename })),
  invalid: [
    `export const useSlotlessStyles_unstable = (state: { unrelated: string }) => state;`,
    `import type { SlotlessState } from './state';
      export const useSlotlessStyles_unstable = (state: SlotlessState): void => {};`,
    `export const useSlotlessStyles_unstable = (state: any): any => state;`,
    `import type { SlotlessState } from './state';
      export const useSlotlessStyles_unstable =
        (state: SlotlessState & { components: any }) => state;`,
  ].map(code => ({ code, filename: slotlessFilename, errors })),
});

new RuleTester().run(`${RULE_NAME} exclusions`, rule, {
  valid: [
    'packages/react/src/components/Example/useExampleStyles.ts',
    'packages/react-components/react-example/stories/src/components/Example/useExampleStyles.ts',
    'packages/react-components/react-example/library/src/components/Example/useExampleStyles.test.ts',
    'packages/react-components/react-example/library/src/components/Example/useExampleStyles.stories.tsx',
    'packages/react-components/react-example/library/src/shared/useExampleStyles.ts',
    'packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext.ts',
    ...['Calendar', 'CalendarDay', 'CalendarDayGrid', 'CalendarMonth', 'CalendarPicker', 'CalendarYear'].map(
      component =>
        `packages/react-components/react-calendar-compat/library/src/components/${component}/use${component}Styles.styles.ts`,
    ),
  ].map(file => {
    const component = /\/components\/([^/]+)\//.exec(file)?.[1] ?? 'Example';
    return {
      filename: path.resolve(file),
      code: `export const use${component}Styles_unstable = (props: unknown): void => {};`,
    };
  }),
  invalid: [],
});
