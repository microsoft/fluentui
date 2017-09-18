/**
 * WARNING: This entry should NOT be imported for production purposes. This entry forces every control to be
 * parsed and available at load time, which is not necessary for most cases.
 */

export * from './Breadcrumb';
export * from './Button';
export * from './Calendar';
export * from './Callout';
export * from './Checkbox';
export * from './ChoiceGroup';
export * from './ColorPicker';
export * from './ComboBox';
export * from './CommandBar';
export * from './ContextualMenu';
export * from './DatePicker';
export * from './DetailsList';
export * from './Dialog';
export * from './DocumentCard';
export * from './Dropdown';
export * from './Fabric';
export * from './Facepile';
export * from './FocusTrapZone';
export * from './FocusZone';
export * from './GroupedList';
export * from './HoverCard';
export * from './Icon';
export * from './Image';
export * from './Label';
export * from './Layer';
export * from './Link';
export * from './List';
export * from './MessageBar';
export * from './MarqueeSelection';
export * from './Nav';
export * from './OverflowSet';
export * from './Overlay';
export * from './Panel';
export * from './Pickers';
export * from './Persona';
export * from './Pivot';
export * from './ProgressIndicator';
export * from './Rating';
export * from './ResizeGroup';
export * from './ScrollablePane';
export * from './SearchBox';
export * from './Slider';
export * from './SpinButton';
export * from './Spinner';
export * from './Sticky';
export * from './Styling';
export * from './SwatchColorPicker';
export * from './TeachingBubble';
export * from './TextField';
export * from './Toggle';
export * from './Tooltip';
export * from './Utilities';

// Using the default import, include all icon definitions. Products that care
// about bundle size should not be using the main entry, until tree shaking
// is perfected. (Use the top level imports instead.)
import { initializeIcons } from '@uifabric/icons/lib/index';

// TODO: remove the @beta tag once they're publised to the CDN.
initializeIcons('//unpkg.com/office-ui-fabric-react@beta/dist/');
