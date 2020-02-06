import { ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles'
import { TeamsTextVariables } from './textVariables'
import { TextProps } from '../../../../components/Text/Text'
import { getColorSchemeKey } from '../../colors'
import translateAlignProp from '../../../../styles/translateAlignProp'
import { WithAsProp } from '../../../../types'

export default {
  root: ({
    props: {
      as,
      atMention,
      color,
      important,
      timestamp,
      truncated,
      disabled,
      error,
      success,
      temporary,
      align,
      weight,
      size,
    },
    variables: v,
  }: ComponentStyleFunctionParam<WithAsProp<TextProps>, TeamsTextVariables>): ICSSInJSStyle => {
    const colors = v.colorScheme[getColorSchemeKey(color)]
    return {
      ...(color && { color: colors.foreground }),
      ...(atMention === true && { color: v.atMentionOtherColor }),
      ...(truncated && { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
      ...(disabled && { color: v.disabledColor }),
      ...(error && { color: v.errorColor }),
      ...(success && { color: v.successColor }),
      ...(temporary && { fontStyle: 'italic' }),
      ...(align && { display: 'block', textAlign: translateAlignProp(align) }), // textAlign makes sense only for block elements

      ...(weight === 'light' && { fontWeight: v.fontWeightLight }),
      ...(weight === 'semilight' && { fontWeight: v.fontWeightSemilight }),
      ...(weight === 'regular' && { fontWeight: v.fontWeightRegular }),
      ...(weight === 'semibold' && { fontWeight: v.fontWeightSemibold }),
      ...(weight === 'bold' && { fontWeight: v.fontWeightBold }),

      ...(size === 'smallest' && {
        fontSize: v.fontSizeSmallest,
        lineHeight: v.fontLineHeightSmallest,
      }),
      ...(size === 'smaller' && {
        fontSize: v.fontSizeSmaller,
        lineHeight: v.fontLineHeightSmaller,
      }),
      ...(size === 'small' && {
        fontSize: v.fontSizeSmall,
        lineHeight: v.fontLineHeightSmall,
      }),
      ...(size === 'medium' && {
        fontSize: v.fontSizeMedium,
        lineHeight: v.fontLineHeightMedium,
      }),
      ...(size === 'large' && {
        fontSize: v.fontSizeLarge,
        lineHeight: v.fontLineHeightLarge,
      }),
      ...(size === 'larger' && {
        fontSize: v.fontSizeLarger,
        lineHeight: v.fontLineHeightLarger,
      }),
      ...(size === 'largest' && {
        fontSize: v.fontSizeLargest,
        lineHeight: v.fontLineHeightLargest,
      }),
      ...(atMention === 'me' && {
        color: v.atMentionMeColor,
        fontWeight: v.atMentionMeFontWeight,
      }),
      ...(timestamp && {
        color: v.timestampColor,
        ':hover': { color: v.timestampHoverColor },
      }),
      ...(important && {
        color: v.importantColor,
        fontWeight: v.importantWeight,
      }),
    }
  },
}
