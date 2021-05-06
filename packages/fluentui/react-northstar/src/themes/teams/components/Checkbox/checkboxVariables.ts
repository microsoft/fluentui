import { pxToRem } from '../../../../utils';
import * as _ from 'lodash';

export type CheckboxVariables = {
  rootPadding: string;

  textColor: string;
  indicatorColor: string;

  textColorHover: string;
  borderColorHover: string;
  background: string;
  borderColor: string;
  borderStyle: string;
  borderRadius: string;
  borderWidth: string;
  checkboxColor: string;
  gap: string;
  margin: string;
  padding: string;

  toggleBackground: string;
  toggleBorderColor: string;
  toggleBorderStyle: string;
  toggleBorderRadius: string;
  toggleBorderWidth: string;
  toggleIndicatorColor: string;
  toggleMargin: string;
  togglePadding: string;

  checkedBackground: string;
  checkedBorderColor: string;
  checkboxCheckedColor: string;
  checkedBackgroundHover: string;
  checkedTextColor: string;
  checkedIndicatorColor: string;
  checkboxToggleCheckedColor: string;
  checkboxToggleCheckedBackground: string;
  checkboxToggleCheckedBorderColor: string;
  toggleCheckedPadding: string;
  toggleIndicatorSize: string;
  toggleWidth: string;
  toggleHeight: string;

  disabledColor: string;
  disabledBackground: string;
  disabledBorderColor: string;
  disabledCheckboxColor: string;
  disabledToggleIndicatorColor: string;
  disabledToggleBackground: string;
  disabledToggleBorderColor: string;
  disabledBackgroundChecked: string;
  disabledCheckedIndicatorColor: string;
};

const toggleMovementDistance = pxToRem(20);
const padding = pxToRem(2);
const defaultValue = 'red';

export const checkboxVariables = (siteVars: any): CheckboxVariables => ({
  checkboxColor: 'transparent',

  toggleBackground: 'transparent',
  toggleBorderColor: siteVars.colors.grey[300],
  toggleBorderStyle: `solid`,
  toggleBorderWidth: pxToRem(1),
  toggleIndicatorColor: 'inherit',

  checkboxCheckedColor: siteVars.colors.grey[500],
  checkboxToggleCheckedBackground: 'transparent',
  checkboxToggleCheckedBorderColor: siteVars.colors.grey[500],
  checkboxToggleCheckedColor: 'inherit',

  disabledColor: siteVars.colors.grey[300],

  disabledCheckboxColor: siteVars.colors.grey[300],
  disabledToggleBackground: 'transparent',
  disabledToggleBorderColor: siteVars.colors.grey[200],
  textColor: _.get(siteVars, 'colorScheme.default.foreground1', defaultValue),
  background: 'transparent',
  borderColor: _.get(siteVars, 'colorScheme.default.foreground1', defaultValue),
  borderStyle: 'solid',
  borderRadius: siteVars.borderRadiusSmall,
  borderWidth: pxToRem(1),
  indicatorColor: 'transparent',
  gap: pxToRem(12),
  margin: `${pxToRem(2.8)} 0 0 0`,
  padding,
  rootPadding: '3px 5px',

  textColorHover: _.get(siteVars, 'colorScheme.default.foreground', defaultValue),
  borderColorHover: _.get(siteVars, 'colorScheme.default.foreground', defaultValue),
  checkedBackgroundHover: _.get(siteVars, 'colorScheme.brand.backgroundHover', defaultValue),

  toggleBorderRadius: pxToRem(999),
  toggleIndicatorSize: pxToRem(14),
  toggleMargin: '0',
  togglePadding: `${padding} ${toggleMovementDistance} ${padding} ${padding}`,
  toggleWidth: pxToRem(38),
  toggleHeight: pxToRem(20),

  checkedTextColor: _.get(siteVars, 'colorScheme.default.foreground', defaultValue),
  checkedBackground: _.get(siteVars, 'colorScheme.brand.backgroundActive1', defaultValue),
  checkedBorderColor: _.get(siteVars, 'colorScheme.brand.backgroundActive1', defaultValue),
  checkedIndicatorColor: _.get(siteVars, 'colorScheme.default.background', defaultValue),
  toggleCheckedPadding: `${padding} ${padding} ${padding} ${toggleMovementDistance}`,

  disabledBackground: _.get(siteVars, 'colorScheme.default.background', defaultValue),
  disabledBackgroundChecked: _.get(siteVars, 'colorScheme.default.backgroundDisabled', defaultValue),
  disabledBorderColor: _.get(siteVars, 'colorScheme.default.foregroundDisabled1', defaultValue),
  disabledCheckedIndicatorColor: _.get(siteVars, 'colorScheme.default.foregroundDisabled', defaultValue),
  disabledToggleIndicatorColor: _.get(siteVars, 'colorScheme.default.foregroundDisabled', defaultValue),
});
