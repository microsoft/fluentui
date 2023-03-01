import { LibraryInfo } from './types';

export const libraryInfo: LibraryInfo = {
  name: 'Fluent UI React v9',
  areas: [
    {
      name: 'Basic Inputs',
      packages: [
        {
          name: 'react-button',
          codeItems: [
            {
              name: 'Button',
              componentType: 'component',
            },
            {
              name: 'CompoundButton',
              componentType: 'component',
            },
            {
              name: 'MenuButton',
              componentType: 'component',
            },
            {
              name: 'SplitButton',
              componentType: 'component',
            },
            {
              name: 'ToggleButton',
              componentType: 'component',
            },
          ],
        },
        {
          name: 'react-checkbox',
          newColumn: true,
          codeItems: [{ name: 'CheckBox', componentType: 'component' }],
        },
        {
          name: 'react-input',
          codeItems: [{ name: 'Input', componentType: 'component' }],
        },
        {
          name: 'react-label',
          codeItems: [{ name: 'Label', componentType: 'component' }],
        },
        {
          name: 'react-link',
          newColumn: true,
          codeItems: [{ name: 'Link', componentType: 'component' }],
        },
        {
          name: 'react-radio',
          codeItems: [
            { name: 'Radio', componentType: 'component' },
            { name: 'RadioGroup', componentType: 'component' },
          ],
        },
        {
          name: 'react-select',
          codeItems: [{ name: 'Select', componentType: 'component' }],
        },
        {
          name: 'react-slider',
          newColumn: true,
          codeItems: [{ name: 'Slider', componentType: 'component' }],
        },
        {
          name: 'react-spinbutton',
          codeItems: [{ name: 'SpinButton', componentType: 'component' }],
        },
        {
          name: 'react-textarea',
          codeItems: [{ name: 'TextArea', componentType: 'component' }],
        },
        {
          name: 'react-switch',
          codeItems: [
            {
              name: 'Switch',
              componentType: 'component',
            },
          ],
        },
      ],
    },
    {
      name: 'Menus and Navigation',
      packages: [
        {
          name: 'react-accordion',
          codeItems: [
            { name: 'Accordion', componentType: 'component' },
            { name: 'AccordionHeader', componentType: 'component' },
            { name: 'AccordionItem', componentType: 'component' },
            { name: 'AccordionPanel', componentType: 'component' },
          ],
        },
        {
          name: 'react-menu',
          newColumn: true,
          codeItems: [
            { name: 'Menu', componentType: 'component' },
            { name: 'MenuDivider', componentType: 'component' },
            { name: 'MenuGroup', componentType: 'component' },
            { name: 'MenuGroupHeader', componentType: 'component' },
            { name: 'MenuItem', componentType: 'component' },
            { name: 'MenuItemCheckbox', componentType: 'component' },
            { name: 'MenuItemRadio', newColumn: true, componentType: 'component' },
            { name: 'MenuList', componentType: 'component' },
            { name: 'MenuPopover', componentType: 'component' },
            { name: 'MenuSplitGroup', componentType: 'component' },
            { name: 'MenuTrigger', componentType: 'component' },
          ],
        },
        {
          name: 'react-tabs',
          newColumn: true,
          codeItems: [
            { name: 'Tab', componentType: 'component' },
            { name: 'TabList', componentType: 'component' },
          ],
        },
      ],
    },
    {
      name: 'Surfaces',
      newRow: true,
      packages: [
        {
          name: 'react-card',
          codeItems: [
            { name: 'Card', componentType: 'component' },
            { name: 'CardFooter', componentType: 'component' },
            { name: 'CardHeader', componentType: 'component' },
            { name: 'CardPreview', componentType: 'component' },
          ],
        },
        {
          name: 'react-dialog',
          newColumn: true,
          codeItems: [
            { name: 'Dialog', componentType: 'component' },
            { name: 'DialogTrigger', componentType: 'component' },
            { name: 'DialogSurface', componentType: 'component' },
            { name: 'DialogTitle', componentType: 'component' },
            { name: 'DialogBody', componentType: 'component' },
            { name: 'DialogActions', componentType: 'component' },
          ],
        },
        {
          name: 'react-popover',
          newColumn: true,
          codeItems: [
            { name: 'Popover', componentType: 'component' },
            { name: 'PopoverSurface', componentType: 'component' },
            { name: 'PopoverTrigger', componentType: 'component' },
          ],
        },
        {
          name: 'react-portal',
          newColumn: true,
          codeItems: [
            { name: 'Portal', componentType: 'component' },
            { name: 'PopoverSurface', componentType: 'component' },
            { name: 'PopoverTrigger', componentType: 'component' },
          ],
        },
        {
          name: 'react-toolbar',
          codeItems: [
            { name: 'Toolbar', componentType: 'component' },
            { name: 'ToolbarButton', componentType: 'component' },
            { name: 'ToolbarToggleButton', componentType: 'component' },
            { name: 'ToolbarDivider', componentType: 'component' },
          ],
        },
      ],
    },
    {
      name: 'Display and Status',
      packages: [
        {
          name: 'react-avatar',
          codeItems: [
            { name: 'Avatar', componentType: 'component' },
            { name: 'AvatarGroup', componentType: 'component' },
          ],
        },
        {
          name: 'react-badge',
          codeItems: [
            { name: 'Badge', componentType: 'component' },
            { name: 'CounterBadge', componentType: 'component' },
            { name: 'PresenceBadge', componentType: 'component' },
          ],
        },
        {
          name: 'react-divider',
          newColumn: true,
          codeItems: [{ name: 'Divider', componentType: 'component' }],
        },
        {
          name: 'react-image',
          codeItems: [{ name: 'Image', componentType: 'component' }],
        },
        {
          name: 'react-spinner',
          codeItems: [{ name: 'Spinner', componentType: 'component' }],
        },
        {
          name: 'react-text',
          newColumn: true,
          codeItems: [
            { name: 'Body', componentType: 'component' },
            { name: 'Caption', componentType: 'component' },
            { name: 'Display', componentType: 'component' },
            { name: 'Headline', newColumn: true, componentType: 'component' },
            { name: 'LargeTitle', componentType: 'component' },
            { name: 'Subheadline', componentType: 'component' },
            { name: 'Text', componentType: 'component' },
            { name: 'Title1', newColumn: true, componentType: 'component' },
            { name: 'Title2', componentType: 'component' },
            { name: 'Title3', componentType: 'component' },
          ],
        },
        {
          name: 'react-tooltip',
          codeItems: [{ name: 'Tooltip', componentType: 'component' }],
        },
      ],
    },
    {
      name: 'Theming',
      packages: [
        {
          name: 'react-provider',
          codeItems: [
            { name: 'FluentProvider', componentType: 'component' },
            { name: 'PopoverSurface', componentType: 'component' },
            { name: 'PopoverTrigger', componentType: 'component' },
          ],
        },
        {
          name: 'react-theme',
          newColumn: true,
          codeItems: [
            { name: 'tokens', componentType: 'constant' },
            { name: 'teamsDarkTheme', componentType: 'constant' },
            { name: 'teamsHighContrastTheme', componentType: 'constant' },
            { name: 'teamsLightTheme', componentType: 'constant' },
            { name: 'webDarkTheme', newColumn: true, componentType: 'constant' },
            { name: 'webHighContrastTheme', componentType: 'constant' },
            { name: 'webLightTheme', componentType: 'constant' },
            { name: 'typographyStyles', componentType: 'constant' },
            {
              name: 'createDarkTheme',
              newColumn: true,
              componentType: 'method',
            },
            { name: 'createHighContrastTheme', componentType: 'method' },
            { name: 'createLightTheme', componentType: 'method' },
            { name: 'createTeamsDarkTheme', componentType: 'method' },
          ],
        },
      ],
    },
    {
      name: 'Utilities',
      newRow: true,
      packages: [
        {
          name: 'react-context-selector',
          codeItems: [
            { name: 'useContextSelector', componentType: 'hook' },
            { name: 'useHasParentContext', componentType: 'hook' },
          ],
        },
        {
          name: 'react-overflow',
          newColumn: true,
          codeItems: [
            { name: 'Overflow', componentType: 'component' },
            { name: 'OverflowItem', componentType: 'component' },
            { name: 'useIsOverflowGroupVisible', componentType: 'hook' },
            { name: 'useIsOverflowItemVisible', componentType: 'hook' },
            {
              name: 'useOverflowContainer',
              newColumn: true,
              componentType: 'hook',
            },
            { name: 'useOverflowCount', componentType: 'hook' },
            { name: 'useOverflowItem', componentType: 'hook' },
            { name: 'useOverflowMenu', componentType: 'hook' },
          ],
        },
        {
          name: 'react-tabster',
          newColumn: true,
          codeItems: [
            { name: 'useArrowNavigationGroup', componentType: 'hook' },
            { name: 'useFocusableGroup', componentType: 'hook' },
            { name: 'useFocusFinders', componentType: 'hook' },
            { name: 'useKeyboardNavAttribute', componentType: 'hook' },
            {
              name: 'useModalAttributes',
              newColumn: true,
              componentType: 'hook',
            },
            { name: 'useTabster', componentType: 'hook' },
            { name: 'useTabsterAttributes', componentType: 'hook' },
          ],
        },
      ],
    },
  ],
};
