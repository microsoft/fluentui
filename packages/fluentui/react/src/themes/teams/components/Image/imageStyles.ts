import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { ImageProps } from '../../../../components/Image/Image'
import { ImageVariables } from './imageVariables'

export type ImageStylesProps = Pick<ImageProps, 'avatar' | 'circular' | 'fluid'>

const imageStyles: ComponentSlotStylesPrepared<ImageStylesProps, ImageVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'middle',
    width: (props.fluid && '100%') || variables.width,
    height: variables.height || 'auto',
    ...(props.circular && { borderRadius: variables.circularRadius }),
    ...(props.avatar && {
      width: (props.fluid && '100%') || variables.avatarSize,
      borderRadius: variables.avatarRadius,
    }),
  }),
}

export default imageStyles
