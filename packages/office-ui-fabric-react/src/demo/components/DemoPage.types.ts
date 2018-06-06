import { IComponentStatusProps } from '../ComponentStatus/ComponentStatus.types';

export interface IDemoPageProps {
  /** Title that goes into the header */
  title: string;

  /** Name of the component being documented */
  componentName: string;

  /** URL of the checked in component, should be somewhere on github.com */
  componentUrl: string;

  /** Status of the component; e.g. keyboard accessible */
  componentStatus?: IComponentStatusProps;

  /** Array of examples, displayed in the order defined */
  examples: {
    /** Title of the example */
    title: string;

    /** Raw source code of the example */
    code: string;

    /** Working example of the example */
    view: JSX.Element;
  }[];

  /** Array of implementation examples, displayed in the order defined */
  implementationExamples?: {
    /** Title of the example */
    title: string;

    /** Raw source code of the example */
    code: string;

    /** Working example of the example */
    view: JSX.Element;
  }[];

  /** Properties table(s) as markdown string */
  propertiesTablesSources: string[];

  /** Overview of the component as markdown string */
  overview: string;

  /** DO's blurb as markdown string */
  dos?: string;

  /** DON'Ts blurb as markdown string */
  donts?: string;

  /** Best practice as markdown string */
  bestPractices?: string;

  /** Passed through header visibility flag from the demo component page component */
  isHeaderVisible: boolean;

  /** Allows native props */
  allowNativeProps?: boolean | string;

  /** Native props root element */
  nativePropsElement?: string | string[];

  /** Related link */
  related?: JSX.Element;
}
