import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SliderPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Slider/Slider.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const SliderPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Slider',
    related,
  },
};
