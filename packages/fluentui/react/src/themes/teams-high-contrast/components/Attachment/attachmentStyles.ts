import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'
import Button from '../../../../components/Button/Button'
import Icon from '../../../../components/Icon/Icon'

const attachmentStyles: ComponentSlotStylesPrepared<AttachmentProps, AttachmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...((p.actionable || p.onClick) && {
      ':focus-visible': {
        backgroundColor: v.backgroundColorHover,
        color: v.textColorHover,

        [`& .${Button.className}`]: {
          color: v.textColorHover,
        },

        [`& .${Icon.className}`]: {
          color: v.textColorHover,
        },
      },

      ':hover': {
        [`& .${Button.className}`]: {
          color: v.textColorHover,
        },

        [`& .${Icon.className}`]: {
          color: v.textColorHover,
        },
      },
    }),
  }),
}

export default attachmentStyles
