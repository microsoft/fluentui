import * as React from 'react';
import { IComponentAs } from 'office-ui-fabric-react';
import { IExampleCardProps } from '../ExampleCard/index';
import { ISideRailLink } from '../SideRail/index';

/**
 * Props for the page.
 * TPlatform can be an enum type and is expected to contain the key `default`.
 */
export interface IPageProps<TPlatforms extends string = string> {
  /** Title that goes into the header. */
  title?: string;

  /** Subtitle that goes into the header. */
  subTitle?: string;

  /** Class name passed to page wrapper. */
  className?: string;

  /** Class name passed to the section wrapper. */
  sectionWrapperClassName?: string;

  /** Name of the component being documented. */
  componentName?: string;

  /** URL of the checked in component or page parent folder. */
  componentUrl?: string;

  /** Optional title of the file to be passed to edit URL if different than the page title. */
  fileNamePrefix?: string;

  /** (1) Overview of the page as Markdown string */
  overview?: string;

  /** (2) Generic additional content section to appear in the page, as markdown string. */
  addlContent?: string;

  /** Optional title for the generic content section. */
  addlContentTitle?: string;

  /** (3a) Best practice as markdown string. */
  bestPractices?: string;

  /** (3b) DO's list as Markdown string. */
  dos?: string;

  /** (3c) DON'Ts list as Markdown string. */
  donts?: string;

  /** (4) The usage guidelines as Markdown string. */
  usage?: string;

  /** (5) The design guidelines as Markdown string. */
  design?: string;

  /** (6) Array of examples, displayed in the order defined. */
  examples?: IExample[];

  /** Knobs that applies to all the examples. */
  exampleKnobs?: React.ReactNode;

  /** (7) Properties table(s) as Markdown string. */
  propertiesTablesSources?: string[];

  /** For properties (implementation) section, whether the component allows native props. */
  allowNativeProps?: boolean;

  /** For properties (implementation) section, native props root element. */
  nativePropsElement?: string | string[];

  /** For properties (implementation) section, override component name to use in the native props message */
  allowNativePropsForComponentName?: string;

  /** (8) Array of custom sections. */
  otherSections?: IPageSectionProps[];

  /** (9) If true, render the feedback section with GitHub issues. **/
  isFeedbackVisible?: boolean;

  /** Related links for side rail. */
  related?: ISideRailLink[] | string;

  /** Contact mailto links for side rail. */
  contact?: ISideRailLink[] | string;

  /**
   * Whether to show the side rail.
   * @defaultvalue true
   */
  showSideRail?: boolean;

  /** Currently selected platform. */
  platform?: TPlatforms;
}

export interface IExample extends IExampleCardProps {
  /** Working example of the example */
  view: React.ReactNode;
}

export interface IPageSectionProps<TPlatforms extends string = string>
  extends Pick<IPageProps<TPlatforms>, 'title' | 'componentUrl' | 'fileNamePrefix' | 'platform'> {
  /** The name of the section. Used to create camel case classNames and pascal case ID. */
  sectionName?: string;

  /** Use when the section name and Markdown file name are different. */
  readableSectionName?: string;

  /** Content to render into the section. */
  content?: JSX.Element | string;

  /** Optional className to wrap the section in. */
  className?: string;

  /** Custom URL for the edit button to link to. */
  editUrl?: string;

  /** Custom styles for the section. */
  style?: React.CSSProperties;

  /** What section type to render. */
  renderAs?: IComponentAs<IPageSectionProps<TPlatforms>>;
}

export type TPlatformPageProps<TPlatforms extends string> = { [platform in TPlatforms]?: IPageProps<TPlatforms> };
