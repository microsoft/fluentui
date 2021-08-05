import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { AlertStylesProps } from '../../../../components/Alert/Alert';
import { AlertVariables } from './alertVariables';
import { AlertDismissActionStylesProps } from '../../../../components/Alert/AlertDismissAction';

export const getIntentColorsFromProps = (
  p: AlertDismissActionStylesProps,
  v: AlertVariables,
): Record<'color' | 'backgroundColor' | 'borderColor', string> => {
  if (p.danger) {
    return {
      color: v.dangerColor,
      backgroundColor: v.dangerBackgroundColor,
      borderColor: v.dangerBorderColor,
    };
  }

  if (p.info) {
    return {
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderColor: v.borderColor,
    };
  }

  if (v.oof) {
    return {
      color: v.oofColor,
      backgroundColor: v.oofBackgroundColor,
      borderColor: v.oofBorderColor,
    };
  }

  if (v.urgent) {
    return {
      color: v.urgentColor,
      backgroundColor: v.urgentBackgroundColor,
      borderColor: v.urgentBorderColor,
    };
  }

  if (p.success) {
    return {
      color: v.successColor,
      backgroundColor: v.successBackgroundColor,
      borderColor: v.successBorderColor,
    };
  }

  if (p.warning) {
    return {
      color: v.warningColor,
      backgroundColor: v.warningBackgroundColor,
      borderColor: v.warningBorderColor,
    };
  }

  return {
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderColor: v.borderColor,
  };
};

export const alertStyles: ComponentSlotStylesPrepared<AlertStylesProps, AlertVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderStyle: v.borderStyle,
    borderWidth: v.borderWidth,
    borderRadius: v.borderRadius,
    minHeight: v.minHeight,
    padding: v.padding,
    fontWeight: v.fontWeight,
    visibility: 'visible',
    boxSizing: 'border-box',

    ...getIntentColorsFromProps(p, v),

    ...((p.attached === 'top' || p.attached === true) && {
      borderRadius: `${v.borderRadius} ${v.borderRadius} 0 0`,
    }),

    ...(p.attached === 'bottom' && {
      borderRadius: `0 0 ${v.borderRadius} ${v.borderRadius}`,
    }),

    ...(p.fitted && { display: 'inline-flex' }),

    ...(p.dismissible && { padding: v.dismissiblePadding }),

    ...(!p.visible && {
      visibility: 'hidden',
    }),
  }),

  actions: ({ variables: v }): ICSSInJSStyle => ({
    margin: v.actionsMargin,
  }),

  header: ({ variables: v }): ICSSInJSStyle => ({
    fontWeight: v.headerFontWeight,
    margin: v.headerMargin,
  }),

  body: (): ICSSInJSStyle => ({
    display: 'flex',
    flexGrow: 1,
  }),

  content: (): ICSSInJSStyle => ({
    flexGrow: 1,
  }),

  icon: ({ variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.iconSize,
    height: v.iconSize,

    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },

    margin: v.iconMargin,
  }),
};
