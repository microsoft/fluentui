import { css, CSSProperties } from 'glamor';
import { styles } from '@uifabric/styling';

export function getStyles(): CSSProperties {

  return {
    iconTile: css(
      styles.fonts.small,
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
          border: '1px solid ' + styles.colors.themePrimary
        },

        ':focus': {
          color: styles.colors.themePrimary,
          opacity: 1,
          background: styles.colors.themeLighterAlt
        },
        ':hover': {
          opacity: 1,
          background: styles.colors.themeLighterAlt
        },
        ':focus:hover': {
          background: styles.colors.themeLight
        }
      }),

    icon: css(
      styles.fonts.icon,
      {
        fontSize: '36px',
        paddingBottom: '8px'
      })
  };
}
