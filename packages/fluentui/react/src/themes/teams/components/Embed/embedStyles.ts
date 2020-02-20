import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { pxToRem } from '../../../../utils'
import Embed, { EmbedProps, EmbedState } from '../../../../components/Embed/Embed'
import { EmbedVariables } from './embedVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

export default {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({ siteVariables })

    return {
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      cursor: 'pointer',
      width: v.width,
      height: v.height || 'auto',
      outline: 0,

      ...borderFocusStyles[':focus'],
      ':focus-visible': {
        [`& .${Embed.slotClassNames.control}`]: {
          borderColor: v.focusBorderColor,
          opacity: 1,
          ...borderFocusStyles[':focus-visible'],
        },
      },

      ':hover': {
        [`& .${Embed.slotClassNames.control}`]: {
          opacity: 1,
          zIndex: v.zIndex,
        },
      },
    }
  },
  control: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: `0 no-repeat ${v.controlBackgroundColor}`,
    backgroundPositionX: pxToRem(3),
    color: v.controlColor,

    opacity: p.active ? 0 : 1,
    pointerEvents: 'none',
    transition: 'opacity .22s ease-in-out',

    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  iframe: ({ props: p }): ICSSInJSStyle => ({
    display: 'block',
    ...(!p.iframeLoaded && { display: 'none' }),
  }),
} as ComponentSlotStylesPrepared<EmbedProps & EmbedState, EmbedVariables>
