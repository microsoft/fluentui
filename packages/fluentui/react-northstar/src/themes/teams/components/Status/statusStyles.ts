import { pxToRem, SizeValue } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { StatusStylesProps } from '../../../../components/Status/Status';
import { StatusVariables } from './statusVariables';

const getBackgroundColor = (state: string, variables: StatusVariables) => {
  switch (state) {
    case 'success':
      return variables.successBackgroundColor;
    case 'info':
      return variables.infoBackgroundColor;
    case 'warning':
      return variables.warningBackgroundColor;
    case 'error':
      return variables.errorBackgroundColor;
    case 'unknown':
    default:
      return variables.defaultBackgroundColor;
  }
};

const getTextColor = (state: string, variables: StatusVariables) => {
  switch (state) {
    case 'success':
      return variables.successTextColor;
    case 'info':
      return variables.infoTextColor;
    case 'warning':
      return variables.warningTextColor;
    case 'error':
      return variables.errorTextColor;
    case 'unknown':
    default:
      return variables.defaultTextColor;
  }
};

const sizeToPxValue: Record<SizeValue, number> = {
  smallest: 6,
  smaller: 10,
  small: 10,
  medium: 10,
  large: 10,
  larger: 16,
  largest: 0,
};

const iconSizeToPxValue: Record<SizeValue, number> = {
  smallest: 4,
  smaller: 6,
  small: 6,
  medium: 6,
  large: 6,
  larger: 10,
  largest: 0,
};

export const getSizeStyles = (sizeInPx: number, variables: StatusVariables) => {
  const borderWidth = (variables.borderColor && variables.borderWidth) || 0;
  const sizeInRem = pxToRem(sizeInPx + 2 * borderWidth);

  return {
    height: sizeInRem,
    width: sizeInRem,
  };
};

export const statusStyles: ComponentSlotStylesPrepared<StatusStylesProps, StatusVariables> = {
  root: ({ props: { color, size, state }, variables }): ICSSInJSStyle => {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...getSizeStyles(sizeToPxValue[size], variables),
      verticalAlign: 'middle',
      borderRadius: '9999px',
      ...(variables.borderColor && {
        borderColor: variables.borderColor,
        borderWidth: pxToRem(variables.borderWidth),
        borderStyle: 'solid',
      }),
      backgroundColor: color || getBackgroundColor(state, variables),
    };
  },

  icon: ({ props: { size, state }, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: pxToRem(iconSizeToPxValue[size]),
    height: pxToRem(iconSizeToPxValue[size]),
    color: getTextColor(state, v),
    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};
