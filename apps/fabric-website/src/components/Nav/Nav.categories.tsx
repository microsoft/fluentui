import { INavCategory } from '../Nav/Nav.types';

export const categories: INavCategory[] = [
  {
    title: 'Basic Inputs',
    components: [
      'Button',
      'CheckBox',
      'ChoiceGroup',
      'ComboBox',
      'Label',
      'Link',
      'Rating',
      'SearchBox',
      'Slider',
      'SpinButton',
      'SplitButton',
      'TextField',
      'Toggle'
    ]
  },
  {
    title: 'Galleries and Picker',
    components: ['Autocomplete', 'BasePicker', 'Calendar', 'DatePicker', 'Gallery', 'PeoplePicker', 'SwatchColorPicker']
  },
  {
    title: 'Items and Lists',
    components: [
      'ActivityItem',
      'Basic List',
      'DetailsList',
      'GroupedList',
      'HoverCard',
      'Contact Card',
      'DocumentCard',
      'Facepile',
      'Persona',
      'Item Activity (Office)',
      'Item Chiclet (Office)',
      'Item Details (Office)',
      'Item Scope (Office)',
      'Item Hovercard (Office)',
      'Item Viewer (Office)'
    ]
  },
  {
    title: 'Commands, Menus & Nav',
    components: ['BreadCrumb', 'CommandBar', 'ContextualMenu', 'SideNav', 'OverflowSet', 'Pivot']
  },
  {
    title: 'Notification & Engagement ',
    components: [
      'Coachmark',
      'Feedback Controls',
      'MessageBar',
      'Splash Screen',
      'TeachingBubble',
      'Tell Me',
      "What's New",
      'Inline Notifications',
      'Callout Notifications',
      'In-App Toasts'
    ]
  },
  {
    title: 'Progress',
    components: ['BlockingProgress', 'ProgressIndicator', 'Spinner']
  },
  {
    title: 'Surfaces',
    components: [
      'Callout',
      'Dialog',
      'Modal',
      'Panel',
      'Tooltip',
      'Scrollbar',
      'SrollablePane',
      'Silhouette',
      'Backstage (Office)',
      'Ribbon (Office)'
    ]
  },
  {
    title: 'Utilities',
    components: ['Icon', 'Image', 'Layer', 'Responsive Layout', 'Overlay', 'ResizeGroup', 'Localization']
  },
  {
    title: 'Composed Controls',
    components: ['Persona (Office)', 'People Picker (Office)', 'People Card (Office)', 'Share Dialog (Office)']
  },
  {
    title: 'Authentication',
    components: ['Sign-In (Office)']
  }
];
