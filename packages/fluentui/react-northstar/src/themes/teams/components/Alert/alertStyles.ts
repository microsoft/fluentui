import { ComponentSlotStylesPrepared, ICSSInJSStyle, SiteVariablesPrepared } from '@fluentui/styles';
import { AlertStylesProps } from '../../../../components/Alert/Alert';
import { AlertVariables } from './alertVariables';
import { AlertDismissActionStylesProps } from '../../../../components/Alert/AlertDismissAction';

export const getIntentColorsFromProps = (
  p: AlertDismissActionStylesProps,
  v: AlertVariables,
  siteVars: SiteVariablesPrepared,
): ICSSInJSStyle => {
  const { colors } = siteVars;

  if (p.danger) {
    return {
      color: v.dangerColor,
      backgroundColor: v.dangerBackgroundColor,
      borderColor: v.dangerBorderColor,
    };
  }

  if (p.info) {
    return {
      color: v.infoColor,
      backgroundColor: v.infoBackgroundColor,
      borderColor: v.infoBorderColor,
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
      color: colors.green[600], // $app-green-04
      backgroundColor: colors.grey[50], // $app-white
      borderColor: colors.green[200], // $app-green
    };
  }

  if (p.warning) {
    return {
      color: siteVars.colors.grey[450],
      backgroundColor: colors.grey[50], // $app-white
      borderColor: colors.yellow[400], // $app-yellow
    };
  }

  return {
    color: v.color,
    backgroundColor: v.backgroundColor,
    borderColor: v.borderColor,
  };
};

const alertStyles: ComponentSlotStylesPrepared<AlertStylesProps, AlertVariables> = {
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

    ...getIntentColorsFromProps(p, v, siteVariables),

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

export default alertStyles;
