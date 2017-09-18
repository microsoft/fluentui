import { IComponentStatusProps, ChecklistStatus } from './ComponentStatus.Props';

export interface IComponentStatusState {
  [key: string]: IComponentStatusProps;
}

export const ComponentStatusState: IComponentStatusState = {
  Breadcrumb: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  Button: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Calendar: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Callout: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  Checkbox: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.poor
  },
  ChoiceGroup: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  ColorPicker: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  ComboBox: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  CommandBar: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  ContextualMenu: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.good
  },
  DatePicker: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  DetailsList: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.poor
  },
  Dialog: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  DocumentCard: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.poor
  },
  Dropdown: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Facepile: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  GroupedList: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  HoverCard: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  Icon: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  Image: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Label: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Layer: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Link: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  List: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.none
  },
  MessageBar: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  Modal: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.none
  },
  Nav: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  Overlay: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  Overflow: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.poor
  },
  Panel: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  Persona: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Pickers: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.good
  },
  PeoplePicker: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.none
  },
  Pivot: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  ProgressIndicator: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  Rating: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  ResizeGroup: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  ScrollablePane: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  SearchBox: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  Slider: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  Spinner: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.none
  },
  SpinButton: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  SwatchColorPicker: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.fair
  },
  TeachingBubble: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.fair
  },
  TextField: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Toggle: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Tooltip: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.poor
  }
};

export interface IComponentStatusInfoState {
  name: string;
  description: string;
  success: string;
}

export const ComponentStatusInfoState: [IComponentStatusInfoState] = [
  {
    name: 'Keyboard Accessibility Support',
    description: 'For accessibility, components should be able to be used using the keyboard only.',
    success: 'For this badge to pass, all of the functionalities of a component should be accessible via the keyboard.'
  },
  {
    name: 'Markup Support',
    description: 'For accessibility, components should be appropriately marked up using aria so users with assistive technologies can successfully interact with them.',
    success: 'For this badge to pass, a component should be marked up with an appropriate aria role, label, disabled/expanded status, etc.'
  },
  {
    name: 'High Contrast Support',
    description: 'For accessibility, components should display correctly in high contrast mode.',
    success: 'For this badge to pass, set your operating system to use high contrast, and ensure that the components renders correctly.'
  },
  {
    name: 'Right To Left Support',
    description: 'Some languages are read from right to left (as oppposed to left to right). For localization, components should display corretly in right to left.',
    success: 'For this badge to pass, activate right to left on the top right corner of the sample website, and ensure that components are rendered properly.'
  },
  {
    name: 'Test Coverage',
    description: 'To make sure components behave as expected, and to avoid breaking them as new features are being added, they should be covered by unit tests.',
    success: 'Write unit tests that cover all edge cases and scenarios for this badge to display as "good".'
  },
];