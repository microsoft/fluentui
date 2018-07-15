import { INavCategory } from '../Nav/Nav.types';

export const categories: INavCategory[] = [
  {
    title: 'Basic Inputs',
    components: [
      'Button',
      'CheckBox',
      'ChoiceGroup',
      'ComboBox',
      'ContextualMenu',
      'Dropdown',
      'Label',
      'Link',
      'Rating',
      'Slider',
      'SpinButton',
      'TextField',
      'Toggle'
    ]
  },
  {
    title: 'Navigation',
    components: ['Breadcrumb', 'Commandbar', 'Nav', 'OverflowSet', 'Pivot', 'SearchBox']
  },
  {
    title: 'Content',
    components: [
      'ActivityItem',
      'Calendar',
      'DetailsList',
      'Facepile',
      'GroupedList',
      'Icon',
      'Image',
      'List',
      'Persona'
    ]
  },
  {
    title: 'Pickers',
    components: ['BasePicker', 'ColorPicker', 'DatePicker', 'PeoplePicker', 'SwatchColorPicker']
  },
  {
    title: 'Progress & Validation',
    components: ['MessageBar', 'ProgressIndicator', 'Shimmer', 'Spinner']
  },
  {
    title: 'Surfaces',
    components: [
      'Callout',
      'Dialog',
      'DocumentCard',
      'HoverCard',
      'Layer',
      'Modal',
      'Overlay',
      'Panel',
      'SrollablePane',
      'TeachingBubble',
      'Tooltip'
    ]
  },
  {
    title: 'Utilities',
    components: ['FocusTrapZone', 'FocusZone', 'MarqueeSelection', 'ResizeGroup', 'Selection', 'Themes']
  }
];
