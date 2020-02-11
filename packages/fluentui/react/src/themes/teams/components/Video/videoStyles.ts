import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { VideoProps } from '../../../../components/Video/Video'
import { VideoVariables } from './videoVariables'

export default {
  root: ({ variables: v }): ICSSInJSStyle => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: v.width,
    height: v.height || 'auto',
  }),
} as ComponentSlotStylesPrepared<VideoProps, VideoVariables>
