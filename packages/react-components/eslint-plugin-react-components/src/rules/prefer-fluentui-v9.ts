import { createRule } from './utils/create-rule';

export const RULE_NAME = 'prefer-fluentui-v9';

type Options = Array<{
  /** Whether to enforce Fluent UI v9 preview component migrations. */
  unstable?: boolean;
}>;

type MessageIds = 'replaceFluent8With9' | 'replaceFluent8With9Unstable' | 'replaceIconWithJsx' | 'replaceStackWithFlex';

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
          unstable: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      replaceFluent8With9: `Avoid importing {{ fluent8 }} from '@fluentui/react', as this package has already migrated to Fluent UI 9. Import {{ fluent9 }} from '@fluentui/react-components' instead.`,
      replaceFluent8With9Unstable: `Avoid importing {{ fluent8 }} from '@fluentui/react', as this package has started migration to Fluent UI 9. Import {{ fluent9 }} from '{{ package }}' instead.`,
      replaceIconWithJsx: `Avoid using Icon from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use a JSX SVG icon from '@fluentui/react-icons' instead.`,
      replaceStackWithFlex: `Avoid using Stack from '@fluentui/react', as this package has already migrated to Fluent UI 9. Use native CSS flexbox instead.`,
    },
  },
  defaultOptions: [],
  create(context) {
    const { unstable = false } = context.options[0] ?? {};

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
              default:
                if (isMigration(name)) {
                  context.report({
                    node,
                    messageId: 'replaceFluent8With9',
                    data: {
                      fluent8: name,
                      fluent9: MIGRATIONS[name],
                    },
                  });
                } else if (isCompatMigration(name)) {
                  context.report({
                    node,
                    messageId: 'replaceFluent8With9Unstable',
                    data: {
                      fluent8: name,
                      fluent9: COMPAT_MIGRATIONS[name].component,
                      package: COMPAT_MIGRATIONS[name].package,
                    },
                  });
                } else if (isPreviewMigration(name) && unstable) {
                  context.report({
                    node,
                    messageId: 'replaceFluent8With9Unstable',
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
 * Migrations from Fluent 8 components to Fluent 9 components as of Fluent UI 9.46.3
 * @see https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-component-mapping--page
 */
const MIGRATIONS = {
  mergeStyles: 'makeStyles',
  ActionButton: 'Button',
  Announced: 'useAnnounce',
  Breadcrumb: 'Breadcrumb',
  CommandBar: 'Toolbar',
  CommandBarButton: 'ToolbarButton',
  CommandButton: 'MenuButton',
  CompoundButton: 'CompoundButton',
  Callout: 'Popover',
  Checkbox: 'Checkbox',
  ChoiceGroup: 'Radio',
  ComboBox: 'Dropdown',
  ContextualMenu: 'Menu',
  DefaultButton: 'Button',
  DetailsList: 'DataGrid',
  Dialog: 'Dialog',
  DocumentCard: 'Card',
  Dropdown: 'Dropdown',
  Facepile: 'AvatarGroup',
  GroupedList: 'Tree',
  IconButton: 'Button',
  Image: 'Image',
  Label: 'Label',
  Layer: 'Portal',
  Link: 'Link',
  MessageBar: 'MessageBar',
  Modal: 'Dialog',
  OverflowSet: 'Overflow',
  Overlay: 'Portal',
  Panel: 'Drawer',
  Popup: 'Dialog',
  PrimaryButton: 'Button',
  Persona: 'Avatar',
  Pivot: 'TabList',
  PivotItem: 'Tab',
  ProgressIndicator: 'ProgressBar',
  Separator: 'Divider',
  Shimmer: 'Skeleton',
  Slider: 'Slider',
  SplitButton: 'SplitButton',
  SpinButton: 'SpinButton',
  Spinner: 'Spinner',
  Text: 'Text',
  TextField: 'Input',
  ToggleButton: 'ToggleButton',
  Toggle: 'Switch',
  Tooltip: 'Tooltip',
  TooltipHost: 'Tooltip',
  VerticalDivider: 'Divider',
} satisfies Record<string, Migration>;

/**
 * Compatibility migrations for certain components.
 * @see https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-component-mapping--page
 */
const COMPAT_MIGRATIONS = {
  DatePicker: { component: 'DatePicker', package: '@fluentui/react-datepicker-compat' },
  TimePicker: { component: 'TeachingPopover', package: '@fluentui/react-timepicker-compat' },
} satisfies Record<string, Migration>;

/**
 * Preview migrations for certain components.
 * @see https://react.fluentui.dev/?path=/docs/concepts-migration-from-v8-component-mapping--page
 */
const PREVIEW_MIGRATIONS = {
  Rating: { component: 'Rating', package: '@fluentui/react-rating-preview' },
  TeachingBubble: { component: 'TeachingPopover', package: '@fluentui/react-teaching-popover-preview' },
} satisfies Record<string, Migration>;

/**
 * Checks if a component name is in the MIGRATIONS list.
 * @param name - The name of the component.
 * @returns True if the component is in the MIGRATIONS list, false otherwise.
 */
const isMigration = (name: string): name is keyof typeof MIGRATIONS => name in MIGRATIONS;

/**
 * Checks if a component name is in the COMPAT_MIGRATIONS list.
 * @param name - The name of the component.
 * @returns True if the component is in the COMPAT_MIGRATIONS list, false otherwise.
 */
const isCompatMigration = (name: string): name is keyof typeof COMPAT_MIGRATIONS => name in COMPAT_MIGRATIONS;

/**
 * Checks if a component name is in the PREVIEW_MIGRATIONS list.
 * @param name - The name of the component.
 * @returns True if the component is in the PREVIEW_MIGRATIONS list, false otherwise.
 */
const isPreviewMigration = (name: string): name is keyof typeof PREVIEW_MIGRATIONS => name in PREVIEW_MIGRATIONS;
