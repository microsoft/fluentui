import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import type { GeneratorOptions, MetadataNamespace, TypeRelationshipKind } from '../types';

export type PilotCondition = 'import' | 'require' | 'types';

export interface PilotDeclarationRoute {
  conditions: readonly PilotCondition[];
  declarationPath: string;
  fallbackDeclarationPath?: string;
}

export interface PilotSemanticExpectation {
  symbol: string;
  namespaces?: readonly MetadataNamespace[];
  declarationIncludes?: readonly string[];
  effectiveMembers?: readonly string[];
  excludes?: readonly string[];
  relationships?: readonly TypeRelationshipKind[];
  minimumCallSignatures?: number;
}

export interface PilotRouteExpectation {
  export: string;
  namespace: MetadataNamespace;
  exportKind: 'default' | 'named' | 'namespace';
  importedName?: string;
  typeOnly: boolean;
  target:
    | { kind: 'local' }
    | {
        kind: 'dependency';
        package: string;
        entrypoint: string;
        export: string;
        namespace: MetadataNamespace;
      };
}

export interface PilotInput {
  id: string;
  packageName: string;
  packageRoot: string;
  packageJsonPath: string;
  entrypoint: string;
  system?: string;
  declarations: readonly PilotDeclarationRoute[];
  focusExports: readonly string[];
  expectedAbsentExports?: readonly string[];
  routeExpectations: readonly PilotRouteExpectation[];
  expectations: readonly PilotSemanticExpectation[];
}

export interface SyntheticPackageInput {
  id: string;
  packageName: string;
  packageRoot: string;
  entrypoints: readonly string[];
  system?: string;
}

export const REAL_PILOT_PREPARATION_COMMAND =
  'yarn nx run react-jsx-runtime:build && yarn nx run-many -t generate-api -p react-button,react-accordion,react-headless-components-preview,react-components --outputStyle=static';

export const REAL_PILOT_FULL_BUILD_COMMAND =
  'yarn nx run-many -t build -p react-button,react-accordion,react-headless-components-preview,react-components --outputStyle=static';

const styledButtonExports = [
  'Button',
  'ButtonBaseProps',
  'ButtonBaseState',
  'ButtonContextProvider',
  'ButtonContextValue',
  'ButtonProps',
  'ButtonSlots',
  'ButtonState',
  'renderButton_unstable',
  'useButton_unstable',
  'useButtonBase_unstable',
  'useButtonContext',
  'useButtonStyles_unstable',
] as const;

const styledAccordionExports = [
  'Accordion',
  'AccordionBaseProps',
  'AccordionBaseState',
  'AccordionContextValue',
  'AccordionContextValues',
  'AccordionHeader',
  'AccordionHeaderBaseProps',
  'AccordionHeaderBaseState',
  'AccordionHeaderContextValue',
  'AccordionHeaderContextValues',
  'AccordionHeaderExpandIconPosition',
  'AccordionHeaderProps',
  'AccordionHeaderProvider',
  'AccordionHeaderSize',
  'AccordionHeaderSlots',
  'AccordionHeaderState',
  'AccordionIndex',
  'AccordionItem',
  'AccordionItemContextValue',
  'AccordionItemContextValues',
  'AccordionItemProps',
  'AccordionItemProvider',
  'AccordionItemSlots',
  'AccordionItemState',
  'AccordionItemValue',
  'AccordionPanel',
  'AccordionPanelBaseProps',
  'AccordionPanelBaseState',
  'AccordionPanelProps',
  'AccordionPanelSlots',
  'AccordionPanelState',
  'AccordionProps',
  'AccordionProvider',
  'AccordionSlots',
  'AccordionState',
  'AccordionToggleData',
  'AccordionToggleEvent',
  'AccordionToggleEventHandler',
  'renderAccordion_unstable',
  'renderAccordionHeader_unstable',
  'renderAccordionItem_unstable',
  'renderAccordionPanel_unstable',
  'useAccordion_unstable',
  'useAccordionBase_unstable',
  'useAccordionContext_unstable',
  'useAccordionContextValues_unstable',
  'useAccordionHeader_unstable',
  'useAccordionHeaderBase_unstable',
  'useAccordionHeaderContext_unstable',
  'useAccordionHeaderContextValues_unstable',
  'useAccordionHeaderStyles_unstable',
  'useAccordionItem_unstable',
  'useAccordionItemContext_unstable',
  'useAccordionItemContextValues_unstable',
  'useAccordionItemStyles_unstable',
  'useAccordionPanel_unstable',
  'useAccordionPanelBase_unstable',
  'useAccordionPanelStyles_unstable',
  'useAccordionStyles_unstable',
] as const;

const headlessButtonExports = [
  'Button',
  'ButtonContextProvider',
  'ButtonContextValue',
  'ButtonProps',
  'ButtonSlots',
  'ButtonState',
  'renderButton',
  'useButton',
  'useButtonContext',
] as const;

const headlessAccordionExports = [
  'Accordion',
  'AccordionContextValues',
  'AccordionHeader',
  'AccordionHeaderProps',
  'AccordionHeaderSlots',
  'AccordionHeaderState',
  'AccordionItem',
  'AccordionItemProps',
  'AccordionItemSlots',
  'AccordionItemState',
  'AccordionPanel',
  'AccordionPanelProps',
  'AccordionPanelSlots',
  'AccordionPanelState',
  'AccordionProps',
  'AccordionSlots',
  'AccordionState',
  'renderAccordion',
  'renderAccordionHeader',
  'renderAccordionItem',
  'renderAccordionPanel',
  'useAccordion',
  'useAccordionContext',
  'useAccordionContextValues',
  'useAccordionHeader',
  'useAccordionHeaderContextValues',
  'useAccordionItem',
  'useAccordionItemContextValues',
  'useAccordionPanel',
] as const;

const suitePilotExports = [
  'Accordion',
  'AccordionContextValue',
  'AccordionContextValues',
  'AccordionHeader',
  'AccordionHeaderContextValue',
  'AccordionHeaderContextValues',
  'AccordionHeaderExpandIconPosition',
  'AccordionHeaderProps',
  'AccordionHeaderSize',
  'AccordionHeaderSlots',
  'AccordionHeaderState',
  'AccordionIndex',
  'AccordionItem',
  'AccordionItemContextValue',
  'AccordionItemContextValues',
  'AccordionItemProps',
  'AccordionItemProvider',
  'AccordionItemSlots',
  'AccordionItemState',
  'AccordionItemValue',
  'AccordionPanel',
  'AccordionPanelProps',
  'AccordionPanelSlots',
  'AccordionPanelState',
  'AccordionProps',
  'AccordionSlots',
  'AccordionState',
  'AccordionToggleData',
  'AccordionToggleEvent',
  'AccordionToggleEventHandler',
  'AccordionProvider',
  'Button',
  'ButtonProps',
  'ButtonSlots',
  'ButtonState',
  'accordionClassNames',
  'accordionHeaderClassNames',
  'accordionItemClassNames',
  'accordionPanelClassNames',
  'buttonClassNames',
  'renderAccordion_unstable',
  'renderAccordionHeader_unstable',
  'renderAccordionItem_unstable',
  'renderAccordionPanel_unstable',
  'renderButton_unstable',
  'useAccordion_unstable',
  'useAccordionContext_unstable',
  'useAccordionContextValues_unstable',
  'useAccordionHeader_unstable',
  'useAccordionHeaderContextValues_unstable',
  'useAccordionHeaderStyles_unstable',
  'useAccordionItem_unstable',
  'useAccordionItemContext_unstable',
  'useAccordionItemContextValues_unstable',
  'useAccordionItemStyles_unstable',
  'useAccordionPanel_unstable',
  'useAccordionPanelStyles_unstable',
  'useAccordionStyles_unstable',
  'useButton_unstable',
  'useButtonStyles_unstable',
] as const;

export function getRealPilotInputs(workspaceRoot = resolve(__dirname, '../../../..')): readonly PilotInput[] {
  const buttonRoot = join(workspaceRoot, 'packages/react-components/react-button/library');
  const accordionRoot = join(workspaceRoot, 'packages/react-components/react-accordion/library');
  const headlessRoot = join(workspaceRoot, 'packages/react-components/react-headless-components-preview/library');
  const suiteRoot = join(workspaceRoot, 'packages/react-components/react-components');

  return [
    {
      id: 'styled-button',
      packageName: '@fluentui/react-button',
      system: 'fluent-v9',
      packageRoot: buttonRoot,
      packageJsonPath: join(buttonRoot, 'package.json'),
      entrypoint: '.',
      declarations: declarationRoutes(buttonRoot, '.'),
      focusExports: styledButtonExports,
      routeExpectations: [
        localRoute('Button', 'value'),
        localRoute('ButtonProps', 'type'),
        localRoute('ButtonState', 'type'),
      ],
      expectations: [
        {
          symbol: 'Button',
          namespaces: ['value'],
          declarationIncludes: ['ForwardRefComponent<ButtonProps>'],
        },
        {
          symbol: 'ButtonBaseProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ["DistributiveOmit<ButtonProps, 'appearance' | 'size' | 'shape'>"],
          excludes: ['appearance', 'size', 'shape'],
        },
        {
          symbol: 'ButtonBaseState',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ["DistributiveOmit<ButtonState, 'appearance' | 'size' | 'shape'>"],
        },
      ],
    },
    {
      id: 'styled-accordion',
      packageName: '@fluentui/react-accordion',
      system: 'fluent-v9',
      packageRoot: accordionRoot,
      packageJsonPath: join(accordionRoot, 'package.json'),
      entrypoint: '.',
      declarations: declarationRoutes(accordionRoot, '.'),
      focusExports: styledAccordionExports,
      routeExpectations: [
        localRoute('Accordion', 'value'),
        localRoute('AccordionHeader', 'value'),
        localRoute('AccordionItem', 'value'),
        localRoute('AccordionPanel', 'value'),
        localRoute('AccordionProps', 'type'),
        localRoute('AccordionHeaderProps', 'type'),
        localRoute('AccordionItemProps', 'type'),
        localRoute('AccordionPanelProps', 'type'),
      ],
      expectations: [
        {
          symbol: 'Accordion',
          namespaces: ['value'],
          relationships: ['intersection'],
          minimumCallSignatures: 2,
          declarationIncludes: ['ForwardRefComponent<AccordionProps>', '<TItem>(props: AccordionProps<TItem>)'],
        },
        {
          symbol: 'AccordionProps',
          declarationIncludes: ['AccordionProps<Value', 'AccordionToggleData<Value>'],
          excludes: ['button', 'expandIcon', 'collapseMotion'],
        },
        {
          symbol: 'AccordionHeaderSlots',
          effectiveMembers: ['root', 'button', 'expandIcon'],
        },
        {
          symbol: 'AccordionHeaderBaseProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ["Omit<AccordionHeaderProps, 'inline' | 'size'>"],
          excludes: ['inline', 'size'],
        },
        {
          symbol: 'AccordionItemProps',
          declarationIncludes: ['AccordionItemProps<Value', 'value: Value'],
          effectiveMembers: ['value'],
        },
        {
          symbol: 'AccordionPanelBaseProps',
          declarationIncludes: ["Omit<AccordionPanelSlots, 'collapseMotion'>"],
          excludes: ['collapseMotion'],
        },
      ],
    },
    {
      id: 'headless-button',
      packageName: '@fluentui/react-headless-components-preview',
      system: 'headless',
      packageRoot: headlessRoot,
      packageJsonPath: join(headlessRoot, 'package.json'),
      entrypoint: './button',
      declarations: declarationRoutes(headlessRoot, './button'),
      focusExports: headlessButtonExports,
      routeExpectations: [
        localRoute('Button', 'value'),
        dependencyRoute('ButtonProps', 'type', '@fluentui/react-button', '.', 'ButtonBaseProps'),
        dependencyRoute('ButtonSlots', 'type', '@fluentui/react-button', '.', 'ButtonSlots'),
        localRoute('ButtonState', 'type'),
      ],
      expectations: [
        {
          symbol: 'Button',
          namespaces: ['value'],
          declarationIncludes: ['ForwardRefComponent<ButtonProps>'],
        },
        {
          symbol: 'ButtonProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ['ButtonBaseProps as ButtonProps'],
          excludes: ['appearance', 'size', 'shape'],
        },
        {
          symbol: 'ButtonState',
          namespaces: ['type'],
          relationships: ['intersection', 'indexed-access'],
          declarationIncludes: ['ButtonBaseState &', "ButtonBaseState['iconPosition']"],
          effectiveMembers: [
            'root',
            'iconPosition',
            'data-disabled',
            'data-disabled-focusable',
            'data-icon-only',
            'data-icon-position',
          ],
        },
      ],
    },
    {
      id: 'headless-accordion',
      packageName: '@fluentui/react-headless-components-preview',
      system: 'headless',
      packageRoot: headlessRoot,
      packageJsonPath: join(headlessRoot, 'package.json'),
      entrypoint: './accordion',
      declarations: declarationRoutes(headlessRoot, './accordion'),
      focusExports: headlessAccordionExports,
      routeExpectations: [
        localRoute('Accordion', 'value'),
        localRoute('AccordionHeader', 'value'),
        localRoute('AccordionItem', 'value'),
        localRoute('AccordionPanel', 'value'),
        dependencyRoute('AccordionProps', 'type', '@fluentui/react-accordion', '.', 'AccordionBaseProps'),
        dependencyRoute('AccordionHeaderProps', 'type', '@fluentui/react-accordion', '.', 'AccordionHeaderBaseProps'),
        dependencyRoute('AccordionItemProps', 'type', '@fluentui/react-accordion', '.', 'AccordionItemProps'),
        dependencyRoute('AccordionPanelProps', 'type', '@fluentui/react-accordion', '.', 'AccordionPanelBaseProps'),
        dependencyRoute('AccordionPanelSlots', 'type', '@fluentui/react-accordion', '.', 'AccordionPanelSlots'),
        localRoute('AccordionState', 'type'),
        localRoute('AccordionHeaderState', 'type'),
        localRoute('AccordionItemState', 'type'),
        localRoute('AccordionPanelState', 'type'),
      ],
      expectations: [
        {
          symbol: 'Accordion',
          namespaces: ['value'],
          minimumCallSignatures: 1,
          declarationIncludes: ['ForwardRefComponent<AccordionProps>'],
          excludes: ['<TItem>'],
        },
        {
          symbol: 'AccordionProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ['AccordionBaseProps as AccordionProps'],
          excludes: ['navigation', 'button', 'expandIcon', 'collapseMotion'],
        },
        {
          symbol: 'AccordionHeaderProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ['AccordionHeaderBaseProps as AccordionHeaderProps'],
          excludes: ['inline', 'size'],
        },
        {
          symbol: 'AccordionItemProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ['AccordionItemProps'],
          effectiveMembers: ['value'],
        },
        {
          symbol: 'AccordionItemState',
          namespaces: ['type'],
          relationships: ['intersection'],
          declarationIncludes: ['AccordionItemState_2 &'],
          effectiveMembers: ['root', 'value', 'data-disabled', 'data-open'],
        },
        {
          symbol: 'AccordionPanelProps',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ['AccordionPanelBaseProps as AccordionPanelProps'],
          excludes: ['collapseMotion'],
        },
        {
          symbol: 'AccordionPanelSlots',
          namespaces: ['type'],
          relationships: ['alias'],
          declarationIncludes: ['AccordionPanelSlots'],
          effectiveMembers: ['root', 'collapseMotion'],
        },
        {
          symbol: 'AccordionState',
          namespaces: ['type'],
          relationships: ['intersection'],
          declarationIncludes: ['AccordionBaseState &'],
          effectiveMembers: ['root', 'data-collapsible', 'data-multiple'],
        },
      ],
    },
    {
      id: 'styled-suite-root',
      packageName: '@fluentui/react-components',
      system: 'fluent-v9',
      packageRoot: suiteRoot,
      packageJsonPath: join(suiteRoot, 'package.json'),
      entrypoint: '.',
      declarations: declarationRoutes(suiteRoot, '.'),
      focusExports: suitePilotExports,
      expectedAbsentExports: [
        'AccordionBaseProps',
        'AccordionBaseState',
        'AccordionHeaderBaseProps',
        'AccordionHeaderBaseState',
        'AccordionPanelBaseProps',
        'AccordionPanelBaseState',
        'ButtonBaseProps',
        'ButtonBaseState',
      ],
      routeExpectations: [
        dependencyRoute('Button', 'value', '@fluentui/react-button', '.', 'Button'),
        dependencyRoute('ButtonProps', 'type', '@fluentui/react-button', '.', 'ButtonProps'),
        dependencyRoute('Accordion', 'value', '@fluentui/react-accordion', '.', 'Accordion'),
        dependencyRoute('AccordionHeader', 'value', '@fluentui/react-accordion', '.', 'AccordionHeader'),
        dependencyRoute('AccordionItem', 'value', '@fluentui/react-accordion', '.', 'AccordionItem'),
        dependencyRoute('AccordionPanel', 'value', '@fluentui/react-accordion', '.', 'AccordionPanel'),
      ],
      expectations: [
        { symbol: 'Button', namespaces: ['value'] },
        { symbol: 'Accordion', namespaces: ['value'] },
        { symbol: 'AccordionHeader', namespaces: ['value'] },
        { symbol: 'AccordionItem', namespaces: ['value'] },
        { symbol: 'AccordionPanel', namespaces: ['value'] },
      ],
    },
    {
      id: 'styled-suite-unstable',
      packageName: '@fluentui/react-components',
      system: 'fluent-v9',
      packageRoot: suiteRoot,
      packageJsonPath: join(suiteRoot, 'package.json'),
      entrypoint: './unstable',
      declarations: declarationRoutes(suiteRoot, './unstable', join(suiteRoot, 'src/unstable/unstable.d.ts__tmpl__')),
      focusExports: [],
      routeExpectations: [],
      expectations: [],
    },
  ];
}

export function toGeneratorOptions(
  input: Pick<PilotInput, 'packageRoot' | 'packageName' | 'entrypoint' | 'system'>,
  declarationConditions: readonly string[] = ['types', 'import'],
): GeneratorOptions {
  return {
    packageRoot: input.packageRoot,
    packageName: input.packageName,
    ...(input.system ? { system: input.system } : null),
    entrypoints: [input.entrypoint],
    declarationConditions: [...declarationConditions],
  };
}

export function toSyntheticGeneratorOptions(input: SyntheticPackageInput): GeneratorOptions {
  return {
    packageRoot: input.packageRoot,
    packageName: input.packageName,
    ...(input.system ? { system: input.system } : null),
    entrypoints: [...input.entrypoints],
  };
}

export function getSyntheticPackageInputs(fixtureRoot = dirname(__filename)): readonly SyntheticPackageInput[] {
  return [
    {
      id: 'semantic-package',
      packageName: '@fixture/semantic-package',
      packageRoot: join(fixtureRoot, 'semantic-package'),
      entrypoints: ['.', './namespace'],
    },
    {
      id: 'subpath-only',
      packageName: '@fixture/subpath-only',
      packageRoot: join(fixtureRoot, 'subpath-only'),
      entrypoints: ['.', './button', './features/alpha'],
    },
    {
      id: 'private-system',
      packageName: '@fixture/private-system',
      packageRoot: join(fixtureRoot, 'private-system'),
      entrypoints: ['.'],
      system: 'fixture-private',
    },
    {
      id: 'miniature-umbrella',
      packageName: '@fixture/miniature-umbrella',
      packageRoot: join(fixtureRoot, 'miniature-umbrella'),
      entrypoints: ['.', './unstable'],
      system: 'fixture-private',
    },
  ];
}

export function assertRealPilotDeclarationsPrepared(
  inputs = getRealPilotInputs(),
  requiredConditions: readonly PilotCondition[] = ['import'],
): void {
  const missing = inputs.flatMap(input =>
    input.declarations
      .filter(route => requiredConditions.every(condition => route.conditions.includes(condition)))
      .filter(route => !existsSync(route.declarationPath) && !existsSync(route.fallbackDeclarationPath ?? ''))
      .map(route => route.declarationPath),
  );

  if (missing.length > 0) {
    throw new Error(
      `Real pilot declarations are missing:\n${missing.join(
        '\n',
      )}\nPrepare them with:\n${REAL_PILOT_PREPARATION_COMMAND}`,
    );
  }
}

function declarationRoutes(
  packageRoot: string,
  entrypoint: string,
  fallbackDeclarationPath?: string,
): readonly PilotDeclarationRoute[] {
  const packageJsonPath = join(packageRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    exports: Record<string, unknown>;
  };
  const exportValue = packageJson.exports[entrypoint];

  return (['import', 'require'] as const).flatMap(condition => {
    const relativePath = findTypesPath(exportValue, condition);

    if (!relativePath) {
      return [];
    }

    return [
      {
        conditions: ['types', condition],
        declarationPath: resolve(packageRoot, relativePath),
        fallbackDeclarationPath: condition === 'import' ? fallbackDeclarationPath : undefined,
      },
    ];
  });
}

function findTypesPath(exportValue: unknown, condition: 'import' | 'require'): string | undefined {
  if (!exportValue || typeof exportValue !== 'object') {
    return undefined;
  }

  const conditions = exportValue as Record<string, unknown>;
  const conditionValue = conditions[condition];

  if (conditionValue && typeof conditionValue === 'object') {
    const typesPath = (conditionValue as Record<string, unknown>).types;
    return typeof typesPath === 'string' ? typesPath : undefined;
  }

  if (typeof conditions.types === 'string') {
    return conditions.types;
  }

  return undefined;
}

function localRoute(exportName: string, namespace: MetadataNamespace): PilotRouteExpectation {
  return {
    export: exportName,
    namespace,
    exportKind: 'named',
    typeOnly: namespace === 'type',
    target: { kind: 'local' },
  };
}

function dependencyRoute(
  exportName: string,
  namespace: MetadataNamespace,
  packageName: string,
  entrypoint: string,
  importedName: string,
): PilotRouteExpectation {
  return {
    export: exportName,
    namespace,
    exportKind: 'named',
    importedName,
    typeOnly: namespace === 'type',
    target: {
      kind: 'dependency',
      package: packageName,
      entrypoint,
      export: importedName,
      namespace,
    },
  };
}
