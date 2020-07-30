import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LinkPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Link/Link.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/LinkRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/LinkPage';

export const LinkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  mac: {
    title: 'Link',
    fileNamePrefix: 'Link',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/mac/LinkOverview.md') as string,
    usage: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/mac/LinkUsage.md') as string,
    related,
    componentUrl,
  },
  cross: {
    title: 'Link',
    fileNamePrefix: 'Link',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/cross/LinkOverview.md') as string,
    usage: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/cross/LinkUsage.md') as string,
    related,
    componentUrl,
  },
};
