import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CommandBarPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/CommandBar/CommandBar.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CommandBarPage/docs/CommandBarRelated.md') as string;

export const CommandBarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
