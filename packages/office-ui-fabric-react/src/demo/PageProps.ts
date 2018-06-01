import { IComponentStatusProps } from 'office-ui-fabric-react/lib/demo/ComponentStatus/ComponentStatus.types';

export interface PageProps {
  title: string;
  componentName: string;
  componentUrl: string;
  componentStatus: IComponentStatusProps;
  examples: {
    title: string;
    code: string;
    view: JSX.Element;
  }[];
  propertiesTablesSources: string[];
  overview: string;
  dos: string;
  donts: string;
  bestPractices: string;
}