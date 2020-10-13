import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PanelPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Panel/Panel.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/PanelPage/docs/PanelRelated.md') as string;

export const PanelPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
