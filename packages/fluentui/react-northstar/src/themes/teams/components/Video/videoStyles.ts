import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { VideoStylesProps } from '../../../../components/Video/Video';
import { VideoVariables } from './videoVariables';

export const videoStyles: ComponentSlotStylesPrepared<VideoStylesProps, VideoVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: v.width,
    height: v.height || 'auto',
  }),
};
