import { createRule } from './utils/create-rule';

export const RULE_NAME = 'prefer-fluentui-v9';

type Options = Array<{
  /** Whether to enforce Fluent UI v9 preview component migrations. */
  preview?: boolean;
}>;

type MessageIds = 'replaceFluent8With9' | 'replaceIconWithJsx' | 'replaceStackWithFlex' | 'replaceFocusZoneWithTabster';

export const rule = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'This rule ensures the use of Fluent UI v9 counterparts for Fluent UI v8 components.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          preview: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      replaceFluent8With9: `Avoid importing {{ fluent8 }} from '@fluentui/react', as this package has started migration to Fluent UI 9. Import {{ fluent9 }} from '{{ package }}' instead.`,
      replaceIconWithJsx: `Avoid using Icon from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use a JSX SVG icon from '@fluentui/react-icons' instead.`,
      replaceStackWithFlex: `Avoid using Stack from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use native CSS flexbox instead. More details are available at https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-components-flex-stack--docs`,
      replaceFocusZoneWithTabster: `Avoid using {{ fluent8 }} from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use the equivalent [Tabster](https://tabster.io/) hook instead.`,
    },
  },
  defaultOptions: [],
  create(context) {
    const { preview = false } = context.options[0] ?? {};

    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ImportDeclaration(node) {
        if (node.source.value !== '@fluentui/react') {
          return;
        }

        for (const specifier of node.specifiers) {
          if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
            const name = specifier.imported.name;

            switch (name) {
              case 'Icon':
                context.report({ node, messageId: 'replaceIconWithJsx' });
                break;
              case 'Stack':
                context.report({ node, messageId: 'replaceStackWithFlex' });
                break;
              case 'FocusTrapZone':
              case 'FocusZone':
                context.report({ node, messageId: 'replaceFocusZoneWithTabster', data: { fluent8: name } });
                break;
              default:
                if (isMigration(name)) {
                  const migration = getMigrationData(MIGRATIONS[name]);

                  context.report({
                    node,
                    messageId: 'replaceFluent8With9',
                    data: {
                      fluent8: name,
                      fluent9: migration.component,
                      package: migration.package,
                    },
                  });
                } else if (isPreviewMigration(name) && preview) {
                  context.report({
                    node,
                    messageId: 'replaceFluent8With9',
                    data: {
                      fluent8: name,
                      fluent9: PREVIEW_MIGRATIONS[name].component,
                      package: PREVIEW_MIGRATIONS[name].package,
                    },
                  });
                }
                break;
            }
          }
        }
      },
    };
  },
});

type Migration = string | { component: string; package: string };

/**
 * Migrations from Fluent 8 components to Fluent 9 components.
 * @see https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-component-mapping--docs
 */
const MIGRATIONS = {
  makeStyles: 'makeStyles',
  ActionButton: 'Button',
  Announced: 'useAnnounce',
  Breadcrumb: 'Breadcrumb',
  Button: 'Button',
  Callout: 'Popover',
  Calendar: { component: 'Calendar', package: '@fluentui/react-calendar-compat' },
  CommandBar: 'Toolbar',
  CommandBarButton: 'Toolbar',
  CommandButton: 'MenuButton',
  CompoundButton: 'CompoundButton',
  Checkbox: 'Checkbox',
  ChoiceGroup: 'RadioGroup',
  Coachmark: 'TeachingPopover',
  ComboBox: 'Combobox',
  ContextualMenu: 'Menu',
  DefaultButton: 'Button',
  DatePicker: { component: 'DatePicker', package: '@fluentui/react-datepicker-compat' },
  DetailsList: 'DataGrid',
  Dialog: 'Dialog',
  DocumentCard: 'Card',
  Dropdown: 'Dropdown',
  Fabric: 'FluentProvider',
  Facepile: 'AvatarGroup',
  FocusTrapZone: 'Tabster',
  FocusZone: 'Tabster',
  GroupedList: 'Tree',
  HoverCard: 'Popover', // Not a direct equivalent; but could be used with custom behavior.
  IconButton: 'Button',
  Image: 'Image',
  Keytips: { component: 'Keytips', package: '@fluentui-contrib/react-keytips' },
  Label: 'Label',
  Layer: 'Portal',
  Link: 'Link',
  MessageBar: 'MessageBar',
  Modal: 'Dialog',
  OverflowSet: 'Overflow',
  Overlay: 'Portal',
  Panel: 'Drawer',
  PeoplePicker: 'TagPicker',
  Persona: 'Persona',
  Pivot: 'TabList',
  PivotItem: 'Tab',
  ProgressIndicator: 'ProgressBar',
  Rating: 'Rating',
  SearchBox: 'SearchBox',
  Separator: 'Divider',
  Shimmer: 'Skeleton',
  Slider: 'Slider',
  SplitButton: 'SplitButton',
  SpinButton: 'SpinButton',
  Spinner: 'Spinner',
  Stack: 'StackShim',
  SwatchColorPicker: 'SwatchPicker',
  TagPicker: 'TagPicker',
  TeachingBubble: 'TeachingPopover',
  Text: 'Text',
  TextField: 'Input',
  TimePicker: { component: 'TimePicker', package: '@fluentui/react-timepicker-compat' },
  ToggleButton: 'ToggleButton',
  Toggle: 'Switch',
  Tooltip: 'Tooltip',
} satisfies Record<string, Migration>;

/**
 * Preview migrations for certain components.
 * @see https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-component-mapping--docs
 */
const PREVIEW_MIGRATIONS = {
  ColorPicker: { component: 'ColorPicker', package: '@fluentui/react-color-picker-preview' },
  List: { component: 'List', package: '@fluentui/react-list-preview' },
  Virtualizer: { component: 'Virtualizer', package: '@fluentui/react-virtualizer-preview' },
} satisfies Record<string, Migration>;

/**
 * Checks if a component name is in the MIGRATIONS list.
 * @param name - The name of the component.
 * @returns True if the component is in the MIGRATIONS list, false otherwise.
 */
const isMigration = (name: string): name is keyof typeof MIGRATIONS => name in MIGRATIONS;

/**
 * Checks if a component name is in the PREVIEW_MIGRATIONS list.
 * @param name - The name of the component.
 * @returns True if the component is in the PREVIEW_MIGRATIONS list, false otherwise.
 */
const isPreviewMigration = (name: string): name is keyof typeof PREVIEW_MIGRATIONS => name in PREVIEW_MIGRATIONS;

/**
 * Get the component and package name to use for a migration.
 */
const getMigrationData = (migration: Migration) => {
  return typeof migration === 'string' ? { component: migration, package: '@fluentui/react-components' } : migration;
};
