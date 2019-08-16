import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CardPageProps as ExternalProps } from '@uifabric/react-cards/lib/components/Card/Card.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CardPage/docs/CardRelated.md') as string;

export const CardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
