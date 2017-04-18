import { css, CSSProperties } from 'glamor';
import { fonts, iconFont } from '../styles/fonts';
import { defaultPalette } from '../styles/colors';

export function getStyles(): CSSProperties {
  return {
    iconTile: css(
      fonts.small,
      {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px',
        width: 150,
        height: 80,
        opacity: .6,
        cursor: 'default',
        outline: 'none',
        position: 'relative',

        ':focus:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          border: '1px solid ' + defaultPalette.themePrimary
        },

        ':focus': {
          color: defaultPalette.themePrimary,
          opacity: 1,
          background: defaultPalette.themeLighterAlt
        },
        ':hover': {
          opacity: 1,
          background: defaultPalette.themeLighterAlt
        },
        ':focus:hover': {
          background: defaultPalette.themeLight
        }
      }),

    icon: css(
      iconFont,
      {
        fontSize: '36px',
        paddingBottom: '8px'
      })
  };
}
