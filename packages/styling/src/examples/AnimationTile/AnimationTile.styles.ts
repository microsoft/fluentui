import {
  IStyle,
  ITheme,
  getTheme,
  mergeStyles
} from '@uifabric/styling';

export interface IAnimationTileStyles {
  root: IStyle;
  title: IStyle;
  container: IStyle;
  animationBox: IStyle;
  isLeft: IStyle;
  isRight: IStyle;
  isTop: IStyle;
  isBottom: IStyle;
  isIn: IStyle;
}

export function getStyles(theme: ITheme = getTheme()): IAnimationTileStyles {
  return {

    root: mergeStyles({
      marginBottom: '20px'
    }),

    title: mergeStyles({
      ...theme.fonts.medium,
      marginBottom: '8px'
    }),

    container: mergeStyles({
      overflow: 'hidden',
      position: 'relative',
      maxWidth: '400px',
      height: '100px',
      border: '1px solid black',
      backgroundImage:
      'url("data:image/svg+xml;base64,' + 'PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc' +
      '+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwx' +
      'IGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J' +
      '2JsYWNrJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+Cg==")',
      backgroundRepeat: 'repeat',
    }),

    animationBox: mergeStyles({
      position: 'absolute',

      background: theme.palette.themePrimary,
      width: '25%',
      height: '100%'
    }),

    isLeft: mergeStyles({
      left: 0,
      top: 0,
      width: '25%',
      height: '100%'
    }),

    isRight: mergeStyles({
      right: 0,
      top: 0,
      width: '25%',
      height: '100%'
    }),

    isTop: mergeStyles({
      left: 0,
      top: 0,
      width: '100%',
      height: '50%'
    }),

    isBottom: mergeStyles({
      left: 0,
      bottom: 0,
      width: '100%',
      height: '50%'
    }),

    isIn: mergeStyles({
      opacity: 0
    })
  };
}