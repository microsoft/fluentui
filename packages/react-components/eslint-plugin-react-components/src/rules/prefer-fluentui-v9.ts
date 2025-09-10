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
      if (!componentName) return;
      if (componentName === 'Icon') {
        context.report({ node, messageId: 'replaceIconWithJsx' });
      } else if (componentName === 'Stack') {
        context.report({ node, messageId: 'replaceStackWithFlex' });
      } else if (componentName === 'FocusTrapZone' || componentName === 'FocusZone') {
        context.report({ node, messageId: 'replaceFocusZoneWithTabster', data: { fluent8: componentName } });
      } else if (isMigration(componentName)) {
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
    }

    return {
      /**
       * Matches static imports from '@fluentui/react'.
       * Example: import { Button } from '@fluentui/react';
       */
      ImportDeclaration(node) {
        if (node.source.value !== '@fluentui/react') {
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
       * Matches dynamic imports using .then pattern from '@fluentui/react'.
       * Example: import('@fluentui/react').then(m => ({ default: m.Button }))
       */
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === 'then' &&
          node.callee.object.type === AST_NODE_TYPES.ImportExpression &&
          node.callee.object.source.type === AST_NODE_TYPES.Literal &&
          typeof node.callee.object.source.value === 'string' &&
          node.callee.object.source.value === '@fluentui/react'
        ) {
          const arg = node.arguments[0];
          let comp = null;
          // Handle destructured parameter: ({ Calendar }) => ({ default: Calendar })
          if (
            arg &&
            (arg.type === AST_NODE_TYPES.ArrowFunctionExpression || arg.type === AST_NODE_TYPES.FunctionExpression)
          ) {
            if (
              arg.params &&
              arg.params.length === 1 &&
              arg.params[0].type === AST_NODE_TYPES.ObjectPattern &&
              arg.body.type === AST_NODE_TYPES.ObjectExpression
            ) {
              for (const prop of arg.body.properties) {
                if (
                  prop.type === AST_NODE_TYPES.Property &&
                  prop.key.type === AST_NODE_TYPES.Identifier &&
                  prop.key.name === 'default' &&
                  prop.value.type === AST_NODE_TYPES.Identifier
                ) {
                  comp = prop.value.name;
                }
              }
            } else if (arg.body.type === AST_NODE_TYPES.ObjectExpression) {
              for (const prop of arg.body.properties) {
                if (
                  prop.type === AST_NODE_TYPES.Property &&
                  prop.key.type === AST_NODE_TYPES.Identifier &&
                  prop.key.name === 'default'
                ) {
                  if (
                    prop.value.type === AST_NODE_TYPES.MemberExpression &&
                    prop.value.property.type === AST_NODE_TYPES.Identifier
                  ) {
                    comp = prop.value.property.name;
                  } else if (prop.value.type === AST_NODE_TYPES.Identifier) {
                    comp = prop.value.name;
                  }
                }
              }
            } else if (arg.body.type === AST_NODE_TYPES.BlockStatement) {
              for (const stmt of arg.body.body) {
                if (stmt.type === AST_NODE_TYPES.ReturnStatement && stmt.argument) {
                  comp = getComponentFromReturnedObject(stmt.argument);
                }
              }
            }
            // Only flag if the import is from @fluentui/react and the component is in the migration map
            if (comp && isMigration(comp)) {
              reportIfMigration(comp, node);
            }
          }
        }
      },
      /**
       * Matches async/await dynamic imports from '@fluentui/react'.
       * Example: async () => { const m = await import('@fluentui/react'); return { default: m.Button }; }
       */
      ArrowFunctionExpression(node) {
        if (node.async && node.body.type === AST_NODE_TYPES.BlockStatement) {
          const importPath = getAwaitImportPath(node.body);
          for (const stmt of node.body.body) {
            if (stmt.type === AST_NODE_TYPES.ReturnStatement && stmt.argument) {
              const comp = getComponentFromReturnedObject(stmt.argument);
              if (comp && importPath === '@fluentui/react' && MIGRATIONS[comp as keyof typeof MIGRATIONS]) {
                reportIfMigration(comp, node);
              }
            }
          }
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
 * Extracts the import path from a block statement containing a variable declaration like:
 *   const m = await import('...');
 * Returns the import path string if found, otherwise null.
 */
function getAwaitImportPath(block: TSESTree.BlockStatement): string | null {
  for (const stmt of block.body) {
    if (
      stmt.type === AST_NODE_TYPES.VariableDeclaration &&
      stmt.declarations.length === 1 &&
      stmt.declarations[0].init &&
      stmt.declarations[0].init.type === AST_NODE_TYPES.AwaitExpression &&
      stmt.declarations[0].init.argument.type === AST_NODE_TYPES.ImportExpression &&
      stmt.declarations[0].init.argument.source.type === AST_NODE_TYPES.Literal &&
      typeof stmt.declarations[0].init.argument.source.value === 'string'
    ) {
      return stmt.declarations[0].init.argument.source.value;
    }
  }
  return null;
}

/**
 * Extracts the component name from an object expression like:
 *   return { default: m.Component } or { default: Component }
 * Returns the component name string if found, otherwise null.
 */
function getComponentFromReturnedObject(node: TSESTree.Node | null | undefined): string | null {
  if (node && node.type === AST_NODE_TYPES.ObjectExpression && node.properties.length) {
    for (const prop of node.properties) {
      if (
        prop.type === AST_NODE_TYPES.Property &&
        prop.key.type === AST_NODE_TYPES.Identifier &&
        prop.key.name === 'default'
      ) {
        // { default: m.Component } or { default: Component }
        if (
          prop.value.type === AST_NODE_TYPES.MemberExpression &&
          prop.value.property.type === AST_NODE_TYPES.Identifier
        ) {
          return prop.value.property.name;
        }
        if (prop.value.type === AST_NODE_TYPES.Identifier) {
          return prop.value.name;
        }
      }
    }
  }
  return null;
}
