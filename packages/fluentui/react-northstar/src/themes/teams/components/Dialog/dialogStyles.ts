import { DialogStylesProps } from '../../../../components/Dialog/Dialog';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DialogVariables } from './dialogVariables';
import { buttonClassName } from '../../../../components/Button/Button';
import { flexClassName } from '../../../../components/Flex/Flex';

export const dialogStyles: ComponentSlotStylesPrepared<DialogStylesProps, DialogVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    background: v.rootBackground,
    border: v.border,
    borderRadius: v.rootBorderRadius,
    outline: 'none',
    padding: v.rootPadding,
    position: 'relative',
    width: v.rootWidth,
    maxWidth: '100vw',
    maxHeight: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',

    display: 'grid',
    gridTemplateColumns: '1fr auto',
    msGridColumns: '1fr auto',

    boxShadow: v.boxShadow,
    color: v.foregroundColor,
    [`@media screen and (max-width: ${v.rootWidth})`]: {
      padding: v.rootPaddingZoom,
    },
  }),

  footer: (): ICSSInJSStyle => ({
    gridColumn: '1 / -1',
    gridRow: 3,
    msGridRow: 3,
  }),

  actions: ({ variables: v }): ICSSInJSStyle => ({
    display: 'flex',
    width: '100%',
    [`& .${flexClassName}`]: {
      flexWrap: 'wrap',
      width: '100%',
    },
    [`@media screen and (max-width: ${v.footerActionsBreakpoint})`]: {
      [`& .${buttonClassName}`]: {
        width: '100%',
        maxWidth: '100%',
        margin: 0,
      },
      [`& .${flexClassName} > :not(:last-child)`]: {
        marginBottom: '0.5rem',
      },
    },
  }),

  content: ({ variables: v }): ICSSInJSStyle => ({
    margin: v.contentMargin,

    gridColumn: '1 / span 2',
    gridRow: 2,

    msGridColumn: 1,
    msGridColumnSpan: 2,
    msGridRow: 2,

    justifySelf: 'left',
    width: '100%',

    [`@media screen and (max-width: ${v.rootWidth}), screen and (max-height: 400px)`]: {
      maxHeight: '100%',
      overflow: 'unset',
    },
  }),

  header: ({ variables: v }): ICSSInJSStyle => ({
    margin: v.headerMargin,
    gridRow: 1,
    msGridRow: 1,
    gridColumn: 1,
    msGridColumn: 1,
    justifySelf: 'left',
    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
  }),

  headerAction: ({ variables: v }) => ({
    gridRow: 1,
    msGridRow: 1,
    gridColumn: 2,
    msGridColumn: 2,
    color: v.foregroundColor,
    margin: v.headerActionMargin,
  }),

  overlay: ({ props: p, variables: v }): ICSSInJSStyle => ({
    alignItems: 'center',
    background: 'transparent',
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    overflow: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: v.overlayZIndex,

    ...(p.backdrop && { background: v.overlayBackground }),
  }),
};
