/**
 * Maps component names (and their aliases / common misspellings) to the
 * repository paths that are most likely relevant for a given issue.
 *
 * Each entry provides:
 *  - names      : all names / aliases that identify this component
 *  - packageDir : the primary source folder for the component
 *  - keyFiles   : specific files inside that package worth looking at first
 *  - relatedDirs: other directories that interact with this component
 */

export interface ComponentEntry {
  /** Canonical component name, e.g. "Button" */
  name: string;
  /** Alternative names, abbreviations, or common misspellings */
  aliases: string[];
  /** Path relative to repo root, e.g. "packages/react-components/react-button/src" */
  packageDir: string;
  /** Specific files within packageDir to inspect first */
  keyFiles: string[];
  /** Other directories that commonly interact with this component */
  relatedDirs: string[];
}

export const COMPONENT_MAP: ComponentEntry[] = [
  // ── Buttons ───────────────────────────────────────────────────
  {
    name: 'Button',
    aliases: ['button', 'btn', 'compound button', 'compoundbutton', 'split button', 'splitbutton', 'toggle button', 'togglebutton', 'menu button', 'menubutton'],
    packageDir: 'packages/react-components/react-button/src',
    keyFiles: ['Button.tsx', 'Button.types.ts', 'Button.styles.ts', 'useButton.ts', 'useButtonStyles.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Input ─────────────────────────────────────────────────────
  {
    name: 'Input',
    aliases: ['input', 'text input', 'textinput', 'text field', 'textfield'],
    packageDir: 'packages/react-components/react-input/src',
    keyFiles: ['Input.tsx', 'Input.types.ts', 'Input.styles.ts', 'useInput.ts', 'useInputStyles.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Textarea ──────────────────────────────────────────────────
  {
    name: 'Textarea',
    aliases: ['textarea', 'text area', 'multiline input', 'multiline'],
    packageDir: 'packages/react-components/react-textarea/src',
    keyFiles: ['Textarea.tsx', 'Textarea.types.ts', 'Textarea.styles.ts', 'useTextarea.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Checkbox ──────────────────────────────────────────────────
  {
    name: 'Checkbox',
    aliases: ['checkbox', 'check box', 'checklist'],
    packageDir: 'packages/react-components/react-checkbox/src',
    keyFiles: ['Checkbox.tsx', 'Checkbox.types.ts', 'Checkbox.styles.ts', 'useCheckbox.ts', 'useCheckboxStyles.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Radio ─────────────────────────────────────────────────────
  {
    name: 'Radio',
    aliases: ['radio', 'radio button', 'radiobutton', 'radio group', 'radiogroup'],
    packageDir: 'packages/react-components/react-radio-group/src',
    keyFiles: ['Radio.tsx', 'Radio.types.ts', 'RadioGroup.tsx', 'RadioGroup.types.ts', 'useRadio.ts', 'useRadioGroup.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Select ────────────────────────────────────────────────────
  {
    name: 'Select',
    aliases: ['select', 'native select', 'dropdown select'],
    packageDir: 'packages/react-components/react-select/src',
    keyFiles: ['Select.tsx', 'Select.types.ts', 'Select.styles.ts', 'useSelect.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Combobox / Dropdown ────────────────────────────────────────
  {
    name: 'Combobox',
    aliases: ['combobox', 'combo box', 'autocomplete', 'typeahead', 'searchable dropdown', 'dropdown', 'drop down'],
    packageDir: 'packages/react-components/react-combobox/src',
    keyFiles: ['Combobox.tsx', 'Combobox.types.ts', 'Dropdown.tsx', 'Dropdown.types.ts', 'useCombobox.ts', 'useDropdown.ts', 'useComboboxBaseState.ts', 'Listbox.tsx'],
    relatedDirs: ['packages/react-components/react-positioning/src', 'packages/react-components/react-field/src'],
  },

  // ── Dialog ────────────────────────────────────────────────────
  {
    name: 'Dialog',
    aliases: ['dialog', 'modal', 'alert dialog', 'alertdialog', 'confirmation dialog'],
    packageDir: 'packages/react-components/react-dialog/src',
    keyFiles: ['Dialog.tsx', 'Dialog.types.ts', 'DialogBody.tsx', 'DialogSurface.tsx', 'useDialog.ts', 'useDialogStyles.ts', 'DialogContext.ts'],
    relatedDirs: ['packages/react-components/react-portal/src', 'packages/react-components/react-positioning/src'],
  },

  // ── Drawer ────────────────────────────────────────────────────
  {
    name: 'Drawer',
    aliases: ['drawer', 'side panel', 'sidepanel', 'panel', 'side sheet', 'sidesheet'],
    packageDir: 'packages/react-components/react-drawer/src',
    keyFiles: ['Drawer.tsx', 'Drawer.types.ts', 'DrawerBody.tsx', 'DrawerHeader.tsx', 'useDrawer.ts', 'useDrawerStyles.ts'],
    relatedDirs: ['packages/react-components/react-portal/src', 'packages/react-components/react-dialog/src'],
  },

  // ── Popover ───────────────────────────────────────────────────
  {
    name: 'Popover',
    aliases: ['popover', 'pop over', 'callout', 'floating card'],
    packageDir: 'packages/react-components/react-popover/src',
    keyFiles: ['Popover.tsx', 'Popover.types.ts', 'PopoverSurface.tsx', 'usePopover.ts', 'usePopoverStyles.ts', 'PopoverContext.ts'],
    relatedDirs: ['packages/react-components/react-positioning/src', 'packages/react-components/react-portal/src'],
  },

  // ── Tooltip ───────────────────────────────────────────────────
  {
    name: 'Tooltip',
    aliases: ['tooltip', 'tool tip'],
    packageDir: 'packages/react-components/react-tooltip/src',
    keyFiles: ['Tooltip.tsx', 'Tooltip.types.ts', 'useTooltip.ts', 'useTooltipStyles.ts'],
    relatedDirs: ['packages/react-components/react-positioning/src', 'packages/react-components/react-portal/src'],
  },

  // ── Menu ──────────────────────────────────────────────────────
  {
    name: 'Menu',
    aliases: ['menu', 'context menu', 'contextmenu', 'submenu', 'sub menu', 'menu item', 'menuitem', 'menu list', 'menulist'],
    packageDir: 'packages/react-components/react-menu/src',
    keyFiles: ['Menu.tsx', 'Menu.types.ts', 'MenuItem.tsx', 'MenuItem.types.ts', 'MenuList.tsx', 'useMenu.ts', 'useMenuItem.ts', 'MenuContext.ts'],
    relatedDirs: ['packages/react-components/react-positioning/src', 'packages/react-components/react-portal/src'],
  },

  // ── Table / DataGrid ──────────────────────────────────────────
  {
    name: 'Table',
    aliases: ['table', 'data table', 'datatable', 'data grid', 'datagrid', 'grid'],
    packageDir: 'packages/react-components/react-table/src',
    keyFiles: ['Table.tsx', 'Table.types.ts', 'DataGrid.tsx', 'DataGrid.types.ts', 'TableRow.tsx', 'TableCell.tsx', 'TableHeader.tsx', 'useTable.ts', 'useDataGrid.ts', 'useTableColumnSizing.ts', 'useTableSort.ts', 'useTableSelection.ts'],
    relatedDirs: ['packages/react-components/react-virtualizer/src'],
  },

  // ── Tree ──────────────────────────────────────────────────────
  {
    name: 'Tree',
    aliases: ['tree', 'tree view', 'treeview', 'tree item', 'treeitem', 'accordion tree', 'nested list'],
    packageDir: 'packages/react-components/react-tree/src',
    keyFiles: ['Tree.tsx', 'Tree.types.ts', 'TreeItem.tsx', 'TreeItem.types.ts', 'FlatTree.tsx', 'useTree.ts', 'useTreeItem.ts', 'useTreeContext.ts'],
    relatedDirs: [],
  },

  // ── Accordion ─────────────────────────────────────────────────
  {
    name: 'Accordion',
    aliases: ['accordion', 'collapsible', 'expandable', 'expand collapse', 'disclosure'],
    packageDir: 'packages/react-components/react-accordion/src',
    keyFiles: ['Accordion.tsx', 'Accordion.types.ts', 'AccordionItem.tsx', 'AccordionHeader.tsx', 'AccordionPanel.tsx', 'useAccordion.ts', 'useAccordionItem.ts'],
    relatedDirs: [],
  },

  // ── Tabs ──────────────────────────────────────────────────────
  {
    name: 'TabList',
    aliases: ['tab', 'tabs', 'tablist', 'tab panel', 'tabpanel', 'tab item', 'tabitem'],
    packageDir: 'packages/react-components/react-tabs/src',
    keyFiles: ['TabList.tsx', 'TabList.types.ts', 'Tab.tsx', 'Tab.types.ts', 'useTabList.ts', 'useTab.ts', 'useTabListStyles.ts'],
    relatedDirs: [],
  },

  // ── Spinner ───────────────────────────────────────────────────
  {
    name: 'Spinner',
    aliases: ['spinner', 'loading spinner', 'loading indicator', 'progress ring', 'circular progress'],
    packageDir: 'packages/react-components/react-spinner/src',
    keyFiles: ['Spinner.tsx', 'Spinner.types.ts', 'Spinner.styles.ts', 'useSpinner.ts'],
    relatedDirs: [],
  },

  // ── Skeleton ──────────────────────────────────────────────────
  {
    name: 'Skeleton',
    aliases: ['skeleton', 'skeleton loader', 'loading skeleton', 'placeholder'],
    packageDir: 'packages/react-components/react-skeleton/src',
    keyFiles: ['Skeleton.tsx', 'Skeleton.types.ts', 'SkeletonItem.tsx', 'useSkeleton.ts'],
    relatedDirs: [],
  },

  // ── Toast / Snackbar ──────────────────────────────────────────
  {
    name: 'Toast',
    aliases: ['toast', 'snackbar', 'notification', 'toaster', 'alert', 'message bar', 'messagebar'],
    packageDir: 'packages/react-components/react-toast/src',
    keyFiles: ['Toast.tsx', 'Toast.types.ts', 'Toaster.tsx', 'useToast.ts', 'useToaster.ts', 'toastQueue.ts'],
    relatedDirs: ['packages/react-components/react-portal/src'],
  },

  // ── Badge ─────────────────────────────────────────────────────
  {
    name: 'Badge',
    aliases: ['badge', 'count badge', 'notification badge', 'counter badge', 'presence badge'],
    packageDir: 'packages/react-components/react-badge/src',
    keyFiles: ['Badge.tsx', 'Badge.types.ts', 'Badge.styles.ts', 'useBadge.ts', 'CounterBadge.tsx', 'PresenceBadge.tsx'],
    relatedDirs: [],
  },

  // ── Avatar ────────────────────────────────────────────────────
  {
    name: 'Avatar',
    aliases: ['avatar', 'user avatar', 'profile picture', 'persona', 'avatar group', 'avatargroup'],
    packageDir: 'packages/react-components/react-avatar/src',
    keyFiles: ['Avatar.tsx', 'Avatar.types.ts', 'Avatar.styles.ts', 'useAvatar.ts', 'AvatarGroup.tsx'],
    relatedDirs: [],
  },

  // ── Slider ────────────────────────────────────────────────────
  {
    name: 'Slider',
    aliases: ['slider', 'range slider', 'range input'],
    packageDir: 'packages/react-components/react-slider/src',
    keyFiles: ['Slider.tsx', 'Slider.types.ts', 'Slider.styles.ts', 'useSlider.ts', 'useSliderStyles.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Switch ────────────────────────────────────────────────────
  {
    name: 'Switch',
    aliases: ['switch', 'toggle switch', 'toggleswitch', 'on off switch'],
    packageDir: 'packages/react-components/react-switch/src',
    keyFiles: ['Switch.tsx', 'Switch.types.ts', 'Switch.styles.ts', 'useSwitch.ts', 'useSwitchStyles.ts'],
    relatedDirs: ['packages/react-components/react-field/src'],
  },

  // ── Divider ───────────────────────────────────────────────────
  {
    name: 'Divider',
    aliases: ['divider', 'separator', 'hr', 'horizontal rule'],
    packageDir: 'packages/react-components/react-divider/src',
    keyFiles: ['Divider.tsx', 'Divider.types.ts', 'Divider.styles.ts', 'useDivider.ts'],
    relatedDirs: [],
  },

  // ── Link ──────────────────────────────────────────────────────
  {
    name: 'Link',
    aliases: ['link', 'anchor', 'hyperlink'],
    packageDir: 'packages/react-components/react-link/src',
    keyFiles: ['Link.tsx', 'Link.types.ts', 'Link.styles.ts', 'useLink.ts'],
    relatedDirs: [],
  },

  // ── Image ─────────────────────────────────────────────────────
  {
    name: 'Image',
    aliases: ['image', 'img', 'picture'],
    packageDir: 'packages/react-components/react-image/src',
    keyFiles: ['Image.tsx', 'Image.types.ts', 'Image.styles.ts', 'useImage.ts'],
    relatedDirs: [],
  },

  // ── Breadcrumb ────────────────────────────────────────────────
  {
    name: 'Breadcrumb',
    aliases: ['breadcrumb', 'breadcrumbs', 'bread crumb', 'navigation path'],
    packageDir: 'packages/react-components/react-breadcrumb/src',
    keyFiles: ['Breadcrumb.tsx', 'BreadcrumbItem.tsx', 'BreadcrumbButton.tsx', 'BreadcrumbDivider.tsx', 'useBreadcrumb.ts'],
    relatedDirs: [],
  },

  // ── Toolbar ───────────────────────────────────────────────────
  {
    name: 'Toolbar',
    aliases: ['toolbar', 'action bar', 'actionbar', 'command bar'],
    packageDir: 'packages/react-components/react-toolbar/src',
    keyFiles: ['Toolbar.tsx', 'Toolbar.types.ts', 'ToolbarButton.tsx', 'ToolbarDivider.tsx', 'useToolbar.ts'],
    relatedDirs: [],
  },

  // ── Card ──────────────────────────────────────────────────────
  {
    name: 'Card',
    aliases: ['card', 'tile', 'panel card', 'cardpreview', 'card preview', 'card header'],
    packageDir: 'packages/react-components/react-card/src',
    keyFiles: ['Card.tsx', 'Card.types.ts', 'Card.styles.ts', 'CardHeader.tsx', 'CardPreview.tsx', 'useCard.ts'],
    relatedDirs: [],
  },

  // ── Text / Typography ─────────────────────────────────────────
  {
    name: 'Text',
    aliases: ['text', 'typography', 'heading', 'body', 'caption', 'display', 'title', 'subtitle', 'large title'],
    packageDir: 'packages/react-components/react-text/src',
    keyFiles: ['Text.tsx', 'Text.types.ts', 'Text.styles.ts', 'Subtitle1.tsx', 'Body1.tsx', 'Caption1.tsx', 'Display.tsx', 'Title1.tsx'],
    relatedDirs: ['packages/react-components/react-theme/src/global/tokens'],
  },

  // ── FluentProvider / Theme ────────────────────────────────────
  {
    name: 'FluentProvider',
    aliases: ['fluentprovider', 'fluent provider', 'provider', 'theme provider', 'root provider'],
    packageDir: 'packages/react-components/react-components/src',
    keyFiles: ['FluentProvider.tsx', 'FluentProvider.types.ts', 'FluentProvider.styles.ts', 'useFluentProvider.ts'],
    relatedDirs: [
      'packages/react-components/react-theme/src',
      'packages/react-components/react-shared-contexts/src',
    ],
  },

  // ── Virtualizer ───────────────────────────────────────────────
  {
    name: 'Virtualizer',
    aliases: ['virtualizer', 'virtual list', 'windowing', 'infinite list', 'virtual scroll'],
    packageDir: 'packages/react-components/react-virtualizer/src',
    keyFiles: ['Virtualizer.tsx', 'Virtualizer.types.ts', 'useVirtualizer.ts', 'useVirtualizerScrollView.ts'],
    relatedDirs: [],
  },

  // ── TagPicker / Tags ──────────────────────────────────────────
  {
    name: 'TagPicker',
    aliases: ['tagpicker', 'tag picker', 'tag', 'tags', 'multi select tags', 'tag input', 'chips'],
    packageDir: 'packages/react-components/react-tag-picker/src',
    keyFiles: ['TagPicker.tsx', 'TagPicker.types.ts', 'useTagPicker.ts'],
    relatedDirs: ['packages/react-components/react-tags/src', 'packages/react-components/react-combobox/src'],
  },

  // ── Carousel ──────────────────────────────────────────────────
  {
    name: 'Carousel',
    aliases: ['carousel', 'slideshow', 'slider', 'gallery'],
    packageDir: 'packages/react-components/react-carousel/src',
    keyFiles: ['Carousel.tsx', 'Carousel.types.ts', 'CarouselSlide.tsx', 'useCarousel.ts'],
    relatedDirs: [],
  },

  // ── Teaching Popover ──────────────────────────────────────────
  {
    name: 'TeachingPopover',
    aliases: ['teachingpopover', 'teaching popover', 'coach mark', 'coachmark', 'spotlight', 'onboarding'],
    packageDir: 'packages/react-components/react-teaching-popover/src',
    keyFiles: ['TeachingPopover.tsx', 'TeachingPopover.types.ts', 'useTeachingPopover.ts'],
    relatedDirs: ['packages/react-components/react-popover/src'],
  },

  // ── Swatch Picker / Color Picker ──────────────────────────────
  {
    name: 'ColorPicker',
    aliases: ['colorpicker', 'color picker', 'colour picker', 'swatchpicker', 'swatch picker', 'swatch'],
    packageDir: 'packages/react-components/react-color-picker/src',
    keyFiles: ['ColorPicker.tsx', 'ColorPicker.types.ts', 'useColorPicker.ts'],
    relatedDirs: ['packages/react-components/react-swatch-picker/src'],
  },

  // ── Infobar / InfoLabel ───────────────────────────────────────
  {
    name: 'InfoLabel',
    aliases: ['infolabel', 'info label', 'infobar', 'info bar', 'information'],
    packageDir: 'packages/react-components/react-infolabel/src',
    keyFiles: ['InfoLabel.tsx', 'InfoLabel.types.ts', 'useInfoLabel.ts'],
    relatedDirs: ['packages/react-components/react-tooltip/src'],
  },

  // ── Charts (react-charting / react-charts) ────────────────────
  {
    name: 'Charts',
    aliases: [
      'chart', 'charts', 'area chart', 'areachart', 'bar chart', 'barchart', 'line chart', 'linechart',
      'donut chart', 'donutchart', 'pie chart', 'piechart', 'gauge chart', 'gaugechart', 'heatmap',
      'heat map', 'sankey', 'scatter', 'sparkline', 'vertical bar', 'horizontal bar', 'grouped bar',
      'stacked bar', 'vertical stacked', 'gantt', 'funnel', 'polar',
    ],
    packageDir: 'packages/charts/react-charting/src',
    keyFiles: [],
    relatedDirs: [
      'packages/charts/react-charts/library/src',
      'packages/charts/chart-utilities/src',
    ],
  },
];

/**
 * Returns all ComponentEntry records that match the given description.
 * Matches on component name and all aliases (case-insensitive substring).
 */
export function detectComponents(description: string): ComponentEntry[] {
  const lower = description.toLowerCase();
  const matched: ComponentEntry[] = [];
  const seen = new Set<string>();

  for (const entry of COMPONENT_MAP) {
    const candidates = [entry.name.toLowerCase(), ...entry.aliases.map(a => a.toLowerCase())];
    const hit = candidates.some(c => {
      // Use word-boundary-like matching to avoid "card" matching "discard"
      const escaped = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(?<![a-z])${escaped}(?![a-z])`, 'i').test(lower);
    });

    if (hit && !seen.has(entry.name)) {
      matched.push(entry);
      seen.add(entry.name);
    }
  }

  return matched;
}
