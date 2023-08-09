import * as React from 'react';
import { IComponentAs } from '@fluentui/react';
import { IPageJson } from '@fluentui/react/lib/common/DocPage.types';
import { IExampleCardProps } from '../ExampleCard/index';
import { ISideRailLink } from '../SideRail/index';
import { VersionSwitcherDefinition } from '@fluentui/public-docsite-setup';

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

  banner?: IBanner;

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

  /** (7) The accessibility guidelines as Markdown string. */
  accessibility?: string;

  /** (8) JSON to populate the API reference tables. Mutually exclusive with `propertiesTableSources`. */
  jsonDocs?: IPageJson;

  /** (8) Properties table(s) as Markdown string. Mutually exclusive with `jsonDocs`. */
  propertiesTablesSources?: string[];

  /**
   * For properties (implementation) section, whether the component allows native props.
   * Only relevant if using `propertiesTableSources`.
   */
  allowNativeProps?: boolean;

  /**
   * For properties (implementation) section, native props root element.
   * Only relevant if using `propertiesTableSources`.
   */
  nativePropsElement?: string | string[];

  /**
   * For properties (implementation) section, override component name to use in the native props message.
   * Only relevant if using `propertiesTableSources`.
   */
  allowNativePropsForComponentName?: string;

  /** For properties (implementation) section, whether to hide the section title. */
  hideImplementationTitle?: boolean;

  /** (8) Array of custom sections. */
  // TODO: TPlatforms generic should be forwarded to otherSections. Requires resolving TODO in Page.tsx.
  otherSections?: IPageSectionProps[];
  // otherSections?: IPageSectionProps<TPlatforms>[];

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

  /**
   * Defines the necessary information to populate the version switcher.
   */
  versionSwitcherDefinition?: VersionSwitcherDefinition;
}

export interface IExample extends IExampleCardProps {
  /** Working example of the example */
  view: React.ReactNode;
}

export interface IBanner {
  title?: string;
  message?: string;
}

export interface IPageSectionProps<TPlatforms extends string = string>
  extends Pick<IPageProps<TPlatforms>, 'title' | 'componentUrl' | 'fileNamePrefix' | 'platform'> {
  /** ID for the section (auto-generated if not specified) */
  id?: string;

  /**
   * The name of the section. Used in the UI if `readableSectionName` is not specified.
   * It's also used to generate the edit URL if `editUrl` is not provided, and to generate
   * the key/id if `readableSectionName` and `id` are not given.
   */
  sectionName?: string;

  /**
   * Text to display in the UI when the section name and Markdown file name are different.
   * Also used to generate the key/id if `id` is not given.
   */
  readableSectionName?: string;

  /**
   * Custom text for the side rail jump link for this section, if for some reason you want it to be
   * different from both `sectionName` and `realSectionName`.
   */
  jumpLinkName?: string;

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

  /**
   * Extra jump links for the side rail, pointing to things within this section.
   * Note that the `url` property should be an element ID (no leading #).
   */
  jumpLinks?: ISideRailLink[];
}

/** Version of IPageSectionProps where `sectionName` is required. */
// TODO: I'm not sure the best way to fix this, and the TS watch issue is making it harder to iterate and try fixes.
//        Equating types with a slight loss in type safety for now.
export type IPageSectionPropsWithSectionName = IPageSectionProps;
// export type IPageSectionPropsWithSectionName<TPlatform extends string = string> =
//   Required<Pick<IPageSectionProps<TPlatform>, 'sectionName'>> & Omit<IPageSectionProps<TPlatform>, 'sectionName'>;
// export type IPageSectionPropsWithSectionName = Required<Pick<IPageSectionProps, 'sectionName'>> &
//   Omit<IPageSectionProps, 'sectionName'>;

export type TPlatformPageProps<TPlatforms extends string> = { [platform in TPlatforms]?: IPageProps<TPlatforms> };
