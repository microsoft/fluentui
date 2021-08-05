import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { pxToRem } from '../../../../utils';
import { EmbedStylesProps, embedSlotClassNames } from '../../../../components/Embed/Embed';
import { EmbedVariables } from './embedVariables';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { playIndicatorUrl } from './playIndicatorUrl';
import { pauseIndicatorUrl } from './pauseIndicatorUrl';

export const embedStyles: ComponentSlotStylesPrepared<EmbedStylesProps, EmbedVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({ variables: siteVariables });

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
        [`& .${embedSlotClassNames.control}`]: {
          borderColor: v.focusBorderColor,
          opacity: 1,
          ...borderFocusStyles[':focus-visible'],
        },
      },

      ':hover': {
        [`& .${embedSlotClassNames.control}`]: {
          opacity: 1,
          zIndex: v.zIndex,
        },
      },
    };
  },
  control: ({ props: p, variables: v }): ICSSInJSStyle => ({
    width: pxToRem(48),
    height: pxToRem(48),
    color: v.controlColor,

    padding: pxToRem(4),
    borderRadius: '50%',

    backgroundColor: v.controlBackgroundColor,
    backgroundImage: playIndicatorUrl(v.controlColor),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: v.controlBackgroundSize,
    backgroundPositionX: pxToRem(12),

    ...(p.active && {
      backgroundImage: pauseIndicatorUrl(v.controlColor),
    }),

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
} as ComponentSlotStylesPrepared<EmbedStylesProps, EmbedVariables>;
