import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CardPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-cards/Card/Card.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/CardPage/docs/CardRelated.md') as string;

export const CardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
