import { IComponentStatusProps, ChecklistStatus } from './ComponentStatus.Props';

export interface IComponentStatusState {
  [key: string]: IComponentStatusProps;
}

export let ComponentStatusState: IComponentStatusState = {

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