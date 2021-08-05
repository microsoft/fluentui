import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IPageJson } from '@fluentui/react/lib/common/DocPage.types';

export interface IComponentPageSection {
  title: string;
  section: JSX.Element;
}

export interface IComponentDemoPageProps {
  isHeaderVisible?: boolean;
}

export interface IComponentPageProps {
  title: string;
  componentName: string;
  /** Component examples **/
  exampleCards?: JSX.Element;
  /** Component properties table(s) **/
  propertiesTables?: JSX.Element;
  bestPractices?: JSX.Element;
  dos?: JSX.Element;
  donts?: JSX.Element;
  overview?: JSX.Element;
  accessibility?: JSX.Element;
  /**
   * Related link
   */
  related?: JSX.Element;
  isHeaderVisible?: boolean;
  areBadgesVisible?: boolean;
  /** className of the component being documented */
  className?: string;
  /** Pass through other sections for ComponentPage */
  otherSections?: IComponentPageSection[];
  /** Includes the feedback section **/
  isFeedbackVisible?: boolean;
  /** Feedback section with GitHub issues **/
  feedback?: JSX.Element;

  /** If true, the component accepts all native props from elements specified in `nativePropsElement` */
  allowNativeProps?: boolean;

  /** Override component name to use in the native props message */
  allowNativePropsForComponentName?: string;

  /**
   * Element(s) whose native props this component accepts (default div).
   * Only relevant if `allowNativeProps` is true.
   */
  nativePropsElement?: string | string[];

  /**
   * Link to the Component root folder on GitHub.
   * Enables 'View On GitHub' and all 'Edit' buttons.
   */
  componentUrl?: string;

  /**
   * Link to the BestPractices markdown file on GitHub.
   * Enables the 'Edit Best practices' button.
   * Overrides URL from componentUrl.
   */
  editBestPracticesUrl?: string;

  /**
   * Link to the Donts markdown file on GitHub.
   * Enables the 'Edit Don'ts' button.
   * Overrides URL from componentUrl.
   */
  editDontsUrl?: string;

  /**
   * Link to the Dos markdown file on GitHub.
   * Enables the 'Edit Dos' button.
   * Overrides URL from componentUrl.
   */
  editDosUrl?: string;

  /**
   * Link to the Overview markdown file on GitHub.
   * Enables the 'Edit Overview' button.
   * Overrides URL from componentUrl.
   */
  editOverviewUrl?: string;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IComponentPageStyleProps, IComponentPageStyles>;

  /**
   * JSON to populate the api reference tables
   */
  jsonDocs?: IPageJson;
}

export type IComponentPageStyleProps = Pick<IComponentPageProps, 'theme'>;

export interface IComponentPageStyles {
  root: IStyle;
  body: IStyle;
  header: IStyle;
  headerLink: IStyle;
  title: IStyle;
  navigation: IStyle;
  subHeading: IStyle;
  /** Styles applied to all sections */
  section: IStyle;
  overviewSection: IStyle;
  overviewText: IStyle;
  overviewHeading: IStyle;
  /**
   * Used on the actual (rarely shown) "Best practices" part of the best practices/dos/don'ts section.
   * For the wrapper of both this section and the dos/don'ts, use `bestPracticesSection`.
   */
  usageSection: IStyle;
  /** Used on the actual (rarely shown) "Best practices" heading. */
  usageHeading: IStyle;
  variantsSection: IStyle;
  variantsTitle: IStyle;
  variantsList: IStyle;
  implementationSection: IStyle;
  feedbackSection: IStyle;
  /** Wrapper for best practices, dos, and don'ts */
  bestPracticesSection: IStyle;
  /** Wrapper for the dos/don'ts sections */
  doSections: IStyle;
  /** Used on each of the dos and don'ts sections */
  dosDontsSection: IStyle;
  dosDontsHeading: IStyle;
  dosDontsLine: IStyle;
  dosLine: IStyle;
  dontsSection: IStyle;
  dontsLine: IStyle;
}
