import { IComponentStatusProps } from 'office-ui-fabric-react/lib/demo/ComponentStatus/ComponentStatus.types';

export interface IDemoPageProps {
  /** title that goes into the header */
  title: string;

  /** name of the component being documented */
  componentName: string;

  /** URL of the checked in component, should be somewhere on github.com */
  componentUrl: string;

  /** status of the component; e.g. keyboard accessible */
  componentStatus: IComponentStatusProps;

  /** array of examples, displayed in the order defined */
  examples: {
    /** title of the example */
    title: string;

    /** raw source code of the example */
    code: string;

    /** working example of the example */
    view: JSX.Element;
  }[];

  /** properties table(s) as markdown string */
  propertiesTablesSources: string[];

  /** overview of the component as markdown string */
  overview: string;

  /** DO's blurb as markdown string */
  dos: string;

  /** DON'Ts blurb as markdown string */
  donts: string;

  /** best practice as markdown string */
  bestPractices: string;

  /** passed through header visibility flag from the demo component page component */
  isHeaderVisible: boolean;
}