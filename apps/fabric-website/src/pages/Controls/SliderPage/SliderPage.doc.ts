import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SliderPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Slider/Slider.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SliderPage/docs/SliderRelated.md') as string;

export const SliderPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Slider',
    related
  }
};
