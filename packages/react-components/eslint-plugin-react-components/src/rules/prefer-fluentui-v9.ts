import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';

import { createRule } from './utils/create-rule';

export const RULE_NAME = 'prefer-fluentui-v9';

type Options = Array<{}>;

type MessageIds = 'replaceFluent8With9' | 'replaceIconWithJsx' | 'replaceStackWithFlex' | 'replaceFocusZoneWithTabster';

export const rule = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'This rule ensures the use of Fluent UI v9 counterparts for Fluent UI v8 components.',
    },
    schema: [],
    messages: {
      replaceFluent8With9: `Avoid importing {{ fluent8 }} from '@fluentui/react', as this package has started migration to Fluent UI 9. Import {{ fluent9 }} from '{{ package }}' instead.`,
      replaceIconWithJsx: `Avoid using Icon from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use a JSX SVG icon from '@fluentui/react-icons' instead.`,
      replaceStackWithFlex: `Avoid using Stack from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use native CSS flexbox instead. More details are available at https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-flex-stack--docs`,
      replaceFocusZoneWithTabster: `Avoid using {{ fluent8 }} from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use the equivalent [Tabster](https://tabster.io/) hook instead.`,
    },
  },
  defaultOptions: [],
  create(context) {
    /**
     * Reports a migration warning for a given component name and AST node.
     */
    function reportIfMigration(componentName: string, node: TSESTree.Node) {
      if (!componentName) {
        return;
      }

      if (componentName === 'Icon') {
        context.report({ node, messageId: 'replaceIconWithJsx' });
        return;
      }

      if (componentName === 'Stack') {
        context.report({ node, messageId: 'replaceStackWithFlex' });
        return;
      }

      if (componentName === 'FocusTrapZone' || componentName === 'FocusZone') {
        context.report({ node, messageId: 'replaceFocusZoneWithTabster', data: { fluent8: componentName } });
        return;
      }

      if (!isMigration(componentName)) {
        return;
      }

      const migration = MIGRATIONS[componentName];
      context.report({
        node,
        messageId: 'replaceFluent8With9',
        data: {
          fluent8: componentName,
          fluent9: migration.import,
          package: migration.package,
        },
      });
    }

    return {
      /**
       * Matches static imports from '@fluentui/react'.
       * Example: import { Button } from '@fluentui/react';
       */
      ImportDeclaration(node) {
        if (!isFluentV8Import(node.source.value)) {
          return;
        }
        for (const specifier of node.specifiers) {
          if (
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier
          ) {
            reportIfMigration(specifier.imported.name, node);
          }
        }
      },
      /**
       * Matches dynamic imports from '@fluentui/react'.
       * Examples:
       * - import('@fluentui/react').then(m => ({ default: m.Button }))
       * - import('@fluentui/react').then(({ Button }) => ({ default: Button }))
       * - async () => { const m = await import('@fluentui/react'); return { default: m.Button }; }
       * - function hello() { import('@fluentui/react').then(m => window.v8 = m); }
       */
      ImportExpression(node) {
        if (node.source.type !== AST_NODE_TYPES.Literal || !isFluentV8Import(node.source.value as string)) {
          return;
        }

        const components = extractComponentsFromImport(node);
        for (const comp of components) {
          reportIfMigration(comp, node);
        }
      },
    };
  },
});

/**
 * Migrations from Fluent 8 components to Fluent 9 components.
 * @see https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-component-mapping--docs
 */
const MIGRATIONS = {
  makeStyles: { import: 'makeStyles', package: '@fluentui/react-components' },
  ActionButton: { import: 'Button', package: '@fluentui/react-components' },
  Announced: { import: 'useAnnounce', package: '@fluentui/react-components' },
  Breadcrumb: { import: 'Breadcrumb', package: '@fluentui/react-components' },
  Button: { import: 'Button', package: '@fluentui/react-components' },
  Callout: { import: 'Popover', package: '@fluentui/react-components' },
  Calendar: { import: 'Calendar', package: '@fluentui/react-calendar-compat' },
  CommandBar: { import: 'Toolbar', package: '@fluentui/react-components' },
  CommandBarButton: { import: 'Toolbar', package: '@fluentui/react-components' },
  CommandButton: { import: 'MenuButton', package: '@fluentui/react-components' },
  CompoundButton: { import: 'CompoundButton', package: '@fluentui/react-components' },
  Checkbox: { import: 'Checkbox', package: '@fluentui/react-components' },
  ChoiceGroup: { import: 'RadioGroup', package: '@fluentui/react-components' },
  Coachmark: { import: 'TeachingPopover', package: '@fluentui/react-components' },
  ComboBox: { import: 'Combobox', package: '@fluentui/react-components' },
  ContextualMenu: { import: 'Menu', package: '@fluentui/react-components' },
  DefaultButton: { import: 'Button', package: '@fluentui/react-components' },
  DatePicker: { import: 'DatePicker', package: '@fluentui/react-datepicker-compat' },
  DetailsList: { import: 'DataGrid', package: '@fluentui/react-components' },
  Dialog: { import: 'Dialog', package: '@fluentui/react-components' },
  DocumentCard: { import: 'Card', package: '@fluentui/react-components' },
  Dropdown: { import: 'Dropdown', package: '@fluentui/react-components' },
  Fabric: { import: 'FluentProvider', package: '@fluentui/react-components' },
  Facepile: { import: 'AvatarGroup', package: '@fluentui/react-components' },
  FocusTrapZone: { import: 'Tabster', package: '@fluentui/react-components' },
  FocusZone: { import: 'Tabster', package: '@fluentui/react-components' },
  GroupedList: { import: 'Tree', package: '@fluentui/react-components' },
  HoverCard: { import: 'Popover', package: '@fluentui/react-components' }, // Not a direct equivalent; but could be used with custom behavior.
  IconButton: { import: 'Button', package: '@fluentui/react-components' },
  Image: { import: 'Image', package: '@fluentui/react-components' },
  Keytips: { import: 'Keytips', package: '@fluentui-contrib/react-keytips' },
  Label: { import: 'Label', package: '@fluentui/react-components' },
  Layer: { import: 'Portal', package: '@fluentui/react-components' },
  Link: { import: 'Link', package: '@fluentui/react-components' },
  MessageBar: { import: 'MessageBar', package: '@fluentui/react-components' },
  Modal: { import: 'Dialog', package: '@fluentui/react-components' },
  OverflowSet: { import: 'Overflow', package: '@fluentui/react-components' },
  Overlay: { import: 'Portal', package: '@fluentui/react-components' },
  Panel: { import: 'Drawer', package: '@fluentui/react-components' },
  PeoplePicker: { import: 'TagPicker', package: '@fluentui/react-components' },
  Persona: { import: 'Persona', package: '@fluentui/react-components' },
  Pivot: { import: 'TabList', package: '@fluentui/react-components' },
  PivotItem: { import: 'Tab', package: '@fluentui/react-components' },
  ProgressIndicator: { import: 'ProgressBar', package: '@fluentui/react-components' },
  Rating: { import: 'Rating', package: '@fluentui/react-components' },
  SearchBox: { import: 'SearchBox', package: '@fluentui/react-components' },
  Separator: { import: 'Divider', package: '@fluentui/react-components' },
  Shimmer: { import: 'Skeleton', package: '@fluentui/react-components' },
  Slider: { import: 'Slider', package: '@fluentui/react-components' },
  SplitButton: { import: 'SplitButton', package: '@fluentui/react-components' },
  SpinButton: { import: 'SpinButton', package: '@fluentui/react-components' },
  Spinner: { import: 'Spinner', package: '@fluentui/react-components' },
  Stack: { import: 'StackShim', package: '@fluentui/react-components' },
  SwatchColorPicker: { import: 'SwatchPicker', package: '@fluentui/react-components' },
  TagPicker: { import: 'TagPicker', package: '@fluentui/react-components' },
  TeachingBubble: { import: 'TeachingPopover', package: '@fluentui/react-components' },
  Text: { import: 'Text', package: '@fluentui/react-components' },
  TextField: { import: 'Input', package: '@fluentui/react-components' },
  TimePicker: { import: 'TimePicker', package: '@fluentui/react-timepicker-compat' },
  ToggleButton: { import: 'ToggleButton', package: '@fluentui/react-components' },
  Toggle: { import: 'Switch', package: '@fluentui/react-components' },
  Tooltip: { import: 'Tooltip', package: '@fluentui/react-components' },
};

/**
 * Checks if a component name is in the MIGRATIONS list.
 * @param name - The name of the component.
 * @returns True if the component is in the MIGRATIONS list, false otherwise.
 */
function isMigration(name: string): name is keyof typeof MIGRATIONS {
  return name in MIGRATIONS;
}

/**
 * Extracts component names from a dynamic import expression by traversing up the AST.
 * Handles patterns like:
 * - import('@fluentui/react').then(m => ({ default: m.Button }))
 * - import('@fluentui/react').then(({ Button }) => ({ default: Button }))
 * - const m = await import('@fluentui/react'); return { default: m.Button };
 * - import('@fluentui/react').then(m => window.v8 = m);
 */
function extractComponentsFromImport(importNode: TSESTree.ImportExpression): string[] {
  const components: string[] = [];
  const parent = importNode.parent;

  if (!parent) {
    return components;
  }

  // Handle: const m = await import('@fluentui/react')
  if (
    parent.type === AST_NODE_TYPES.AwaitExpression &&
    parent.parent?.type === AST_NODE_TYPES.VariableDeclarator &&
    parent.parent.id.type === AST_NODE_TYPES.Identifier
  ) {
    const varName = parent.parent.id.name;
    const foundComponents = findComponentUsagesInScope(parent.parent, varName);
    return foundComponents;
  }

  // Handle: const { Button } = await import('@fluentui/react')
  if (
    parent.type === AST_NODE_TYPES.AwaitExpression &&
    parent.parent?.type === AST_NODE_TYPES.VariableDeclarator &&
    parent.parent.id.type === AST_NODE_TYPES.ObjectPattern
  ) {
    for (const prop of parent.parent.id.properties) {
      if (
        prop.type === AST_NODE_TYPES.Property &&
        prop.key.type === AST_NODE_TYPES.Identifier &&
        isMigration(prop.key.name)
      ) {
        components.push(prop.key.name);
      }
    }
    return components;
  }

  // Handle: import('@fluentui/react').then(...)
  if (
    parent.type === AST_NODE_TYPES.MemberExpression &&
    parent.property.type === AST_NODE_TYPES.Identifier &&
    parent.property.name === 'then' &&
    parent.parent?.type === AST_NODE_TYPES.CallExpression
  ) {
    const callExpr = parent.parent;
    const thenArg = callExpr.arguments[0];

    if (
      thenArg &&
      (thenArg.type === AST_NODE_TYPES.ArrowFunctionExpression || thenArg.type === AST_NODE_TYPES.FunctionExpression)
    ) {
      const param = thenArg.params[0];

      // Handle: .then(({ Button }) => ...)
      if (param && param.type === AST_NODE_TYPES.ObjectPattern) {
        for (const prop of param.properties) {
          if (
            prop.type === AST_NODE_TYPES.Property &&
            prop.key.type === AST_NODE_TYPES.Identifier &&
            isMigration(prop.key.name)
          ) {
            components.push(prop.key.name);
          }
        }
      }
      // Handle: .then(m => ...)
      else if (param && param.type === AST_NODE_TYPES.Identifier) {
        const paramName = param.name;
        const foundComponents = findComponentUsagesInFunction(thenArg, paramName);
        components.push(...foundComponents);
      }
    }
  }

  return components;
}

/**
 * Finds component usages within a function body by looking for member access patterns like `m.Button`.
 */
function findComponentUsagesInFunction(
  fn: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression,
  varName: string,
): string[] {
  const components: string[] = [];

  function traverse(node: TSESTree.Node | null | undefined): void {
    if (!node) {
      return;
    }

    // Look for m.Component patterns
    if (
      node.type === AST_NODE_TYPES.MemberExpression &&
      node.object.type === AST_NODE_TYPES.Identifier &&
      node.object.name === varName &&
      node.property.type === AST_NODE_TYPES.Identifier &&
      isMigration(node.property.name)
    ) {
      components.push(node.property.name);
    }

    // Recursively traverse child nodes (skip 'parent' to avoid circular references)
    for (const key in node) {
      if (key === 'parent') {
        continue;
      }
      const value = (node as unknown as Record<string, unknown>)[key];
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach(traverse);
        } else if ('type' in value) {
          traverse(value as TSESTree.Node);
        }
      }
    }
  }

  traverse(fn.body);
  return components;
}

/**
 * Finds component usages in the scope after a variable declaration.
 * Used for async/await patterns like: const m = await import(...); return { default: m.Button };
 */
function findComponentUsagesInScope(declarator: TSESTree.VariableDeclarator, varName: string): string[] {
  const components: string[] = [];
  let currentNode: TSESTree.Node | undefined = declarator.parent;

  // Find the containing block statement
  while (currentNode && currentNode.type !== AST_NODE_TYPES.BlockStatement) {
    currentNode = currentNode.parent;
  }

  if (!currentNode || currentNode.type !== AST_NODE_TYPES.BlockStatement) {
    return components;
  }

  // Traverse the block statement to find usages
  function traverse(node: TSESTree.Node | null | undefined): void {
    if (!node) {
      return;
    }

    // Look for m.Component patterns
    if (
      node.type === AST_NODE_TYPES.MemberExpression &&
      node.object.type === AST_NODE_TYPES.Identifier &&
      node.object.name === varName &&
      node.property.type === AST_NODE_TYPES.Identifier &&
      isMigration(node.property.name)
    ) {
      components.push(node.property.name);
    }

    // Recursively traverse child nodes (skip 'parent' to avoid circular references)
    for (const key in node) {
      if (key === 'parent') {
        continue;
      }
      const value = (node as unknown as Record<string, unknown>)[key];
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach(traverse);
        } else if ('type' in value) {
          traverse(value as TSESTree.Node);
        }
      }
    }
  }

  traverse(currentNode);
  return components;
}

/**
 * Checks if the import source is from Fluent UI v8.
 * @param source - The import source string.
 * @returns True if the source is from Fluent UI v8, false otherwise.
 */
function isFluentV8Import(source: string) {
  return source === '@fluentui/react' || source.startsWith('@fluentui/react/');
}
