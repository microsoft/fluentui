const path = require('path');
const resources = require('../../scripts/tasks/webpack-resources');

const AllEntries = [
  'ActivityItem',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Callout',
  'Check',
  'Checkbox',
  'ChoiceGroup',
  'ColorPicker',
  'ComboBox',
  'CommandBar',
  'ContextualMenu',
  'DatePicker',
  'DetailsList',
  'Dialog',
  'DocumentCard',
  'Dropdown',
  'Fabric',
  'Facepile',
  'FocusTrapZone',
  'FocusZone',
  'GroupedList',
  'HoverCard',
  'Icon',
  'Image',
  'Label',
  'Layer',
  'Link',
  'List',
  'MessageBar',
  'MarqueeSelection',
  'Nav',
  'OverflowSet',
  'Overlay',
  'Panel',
  'Pickers',
  'Persona',
  'PersonaCoin',
  'Pivot',
  'ProgressIndicator',
  'Rating',
  'ResizeGroup',
  'ScrollablePane',
  'SearchBox',
  'Slider',
  'SpinButton',
  'Spinner',
  'Sticky',
  'Styling',
  'SwatchColorPicker',
  'TeachingBubble',
  'TextField',
  'Toggle',
  'Tooltip',
  'Utilities',
];

const entry = {};

AllEntries.forEach(
  entryName => {
    entry[entryName] = `./node_modules/office-ui-fabric-react/lib/${entryName}.js`;
  }
);

module.exports = resources.createConfig(
  'test',
  true,
  {
    entry,
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      '@uifabric/utilities/lib/index': 'FabricUtilities',
      '@uifabric/styling/lib/index': 'FabricStyling',
      '@uifabric/merge-styles/lib/index': 'MergeStyles',
      '@microsoft/load-themed-styles': 'LoadThemedStyles',
      'tslib': 'tslib'
    }
  },
  true
);
