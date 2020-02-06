import { pxToRem } from '../../../../utils'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { LabelProps } from '../../../../components/Label/Label'
import { LabelVariables } from './labelVariables'
import { getColorScheme } from '../../colors'

const labelStyles: ComponentSlotStylesPrepared<LabelProps, LabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color)

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: v.height,
      lineHeight: v.height,
      color: colors.background,
      backgroundColor: colors.foreground,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(3),
      padding: v.padding,
      ...(p.image &&
        (p.imagePosition === 'start'
          ? { paddingLeft: v.startPaddingLeft }
          : { paddingRight: v.endPaddingRight })),
      ...(p.circular && {
        borderRadius: v.circularRadius,
      }),
    }
  },

  image: ({ variables: v }): ICSSInJSStyle => ({
    height: v.height,
    width: v.height,
  }),

  icon: ({ props: p }): ICSSInJSStyle =>
    p.icon &&
    typeof p.icon === 'object' &&
    (p.icon as any).onClick && {
      cursor: 'pointer',
    },
}

export default labelStyles
