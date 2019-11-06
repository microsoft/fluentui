// @ts-check

// Config file for API doc JSON (*.page.json) generation

const path = require('path');
const apiDocs = require('../lib/index');

/** @type {apiDocs.IPageJsonOptions[]} */
module.exports = [
  {
    apiJsonPaths: [
      path.resolve(__dirname, '../../styling/dist/styling.api.json'),
      path.resolve(__dirname, '../../utilities/dist/utilities.api.json'),
      path.resolve(__dirname, '../../merge-styles/dist/merge-styles.api.json')
    ],
    pageJsonFolderPath: path.join(__dirname, '../lib/pages/references'),
    pageNames: [],
    kind: 'References'
  },
  {
    apiJsonPaths: [path.resolve(__dirname, '../../office-ui-fabric-react/dist/office-ui-fabric-react.api.json')],
    pageJsonFolderPath: path.resolve(__dirname, '../lib/pages/office-ui-fabric-react'),
    pageNames: [
      'ActivityItem',
      'Announced',
      'Breadcrumb',
      'Button',
      'Calendar',
      'Callout',
      'Checkbox',
      'ChoiceGroup',
      'Coachmark',
      'ColorPicker',
      'ComboBox',
      'CommandBar',
      'ContextualMenu',
      'DatePicker',
      'DetailsList',
      'Dialog',
      'Divider',
      'DocumentCard',
      'Dropdown',
      'ExtendedPeoplePicker',
      'ExtendedPicker',
      'Facepile',
      'FloatingPeoplePicker',
      'FloatingPicker',
      'FocusTrapZone',
      'FocusZone',
      'GroupedList',
      'HoverCard',
      'Icon',
      'Image',
      'Keytips',
      'Label',
      'Layer',
      'Link',
      'List',
      'MarqueeSelection',
      'MessageBar',
      'Modal',
      'Nav',
      'OverflowSet',
      'Overlay',
      'Panel',
      'PeoplePicker',
      'Persona',
      'Pickers',
      'Pivot',
      'Popup',
      'PositioningContainer',
      'ProgressIndicator',
      'Rating',
      'ResizeGroup',
      'SelectedPeopleList',
      'Separator',
      'ScrollablePane',
      'SearchBox',
      'SelectableOption',
      'SelectedItemsList',
      'Shimmer',
      'Slider',
      'SpinButton',
      'Spinner',
      'Stack',
      'SwatchColorPicker',
      'TeachingBubble',
      'Text',
      'TextField',
      'Toggle',
      'Tooltip'
    ],
    kind: 'Components'
  },
  {
    apiJsonPaths: [path.resolve(__dirname, '../../react-cards/dist/react-cards.api.json')],
    pageJsonFolderPath: path.resolve(__dirname, '../lib/pages/react-cards'),
    pageNames: ['Card'],
    kind: 'Components'
  }
];
