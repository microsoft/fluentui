import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { VideoStylesProps } from '../../../../components/Video/Video';
import type { VideoVariables } from './videoVariables';

export const videoStyles: ComponentSlotStylesPrepared<VideoStylesProps, VideoVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: v.width,
    height: v.height || 'auto',
  }),
};
