import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SliderPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Slider/Slider.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const SliderPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Slider',
    related,
  },
};
