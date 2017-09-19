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
    highContrastSupport: ChecklistStatus.pass,
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
    highContrastSupport: ChecklistStatus.fail,
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
    highContrastSupport: ChecklistStatus.pass,
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
    highContrastSupport: ChecklistStatus.pass,
    rtlSupport: ChecklistStatus.pass,
    testCoverage: ChecklistStatus.good
  },
  Pickers: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
    rtlSupport: ChecklistStatus.fail,
    testCoverage: ChecklistStatus.good
  },
  PeoplePicker: {
    keyboardAccessibilitySupport: ChecklistStatus.unknown,
    markupSupport: ChecklistStatus.unknown,
    highContrastSupport: ChecklistStatus.fail,
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
    highContrastSupport: ChecklistStatus.pass,
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
    highContrastSupport: ChecklistStatus.pass,
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
  link?: InformationLink;
}

export interface InformationLink {
  link: string;
  renderedText: string;
}

export const ComponentStatusInfoState: [IComponentStatusInfoState] = [
  {
    name: 'Keyboard Accessibility Support',
    description: 'Components should be fully usable with the keyboard.',
    success: 'For this badge to pass, all of the functionalities of a component needs to be accessible via the keyboard.'
  },
  {
    name: 'Markup Accessibility Support',
    description: 'Components should be appropriately marked with ARIA attributes so users with assistive technologies can interact with them.',
    success: 'For this badge to pass, a component needs to be marked with ARIA attributes to describe its behavior for assistive technologies (e.g., screen readers). A component can use ARIA roles, states and properties to inform users of its behavior.',
    link: {
      link: 'https://www.w3.org/WAI/intro/aria',
      renderedText: 'Please refer to W3C for ARIA guidelines.'
    }
  },
  {
    name: 'High Contrast Support',
    description: 'Components should display correctly in high contrast mode.',
    success: 'For this badge to pass, set your operating system to use high contrast and then ensure that the components render correctly.'
  },
  {
    name: 'Right To Left Support',
    description: 'For localization, components should display correctly in right to left layouts.',
    success: 'For this badge to pass, ensure RTL (right-to-left) layouts render properly in the sample website by enabling it in the settings (located in the top right corner for LTR layout).'
  },
  {
    name: 'Test Coverage',
    description: 'To avoid regressions, make sure components are throughly unit-tested.',
    success: 'For this badge to be marked "good", write unit tests that cover all edge cases and scenarios.'
  },
];