import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CommandBarPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/CommandBar/CommandBar.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CommandBarPage/docs/CommandBarRelated.md') as string;

export const CommandBarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
