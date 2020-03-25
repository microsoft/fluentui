import { pxToRem } from '../../../../utils';
import * as _ from 'lodash';

export interface TreeTitleVariables {
  color: string;
  indicatorColor: string;

  padding: string;
  gap: string;
  selectionIndicatorMargin: string;
  borderColor: string;
  borderStyle: string;
  borderRadius: string;
  borderWidth: string;
  background: string;

  checkedBackground: string;
  checkedBorderColor: string;
  checkedIndicatorColor: string;

  disabledBackground: string;
  disabledBackgroundChecked: string;
  disabledBorderColor: string;
  disabledCheckedIndicatorColor: string;
}

const defaultValue = 'red';

export default (siteVars: any): TreeTitleVariables => {
  return {
    color: siteVars.colorScheme.default.foreground,
    padding: `${pxToRem(1)} 0`,

    borderColor: _.get(siteVars, 'colorScheme.default.foreground1', defaultValue),
    borderStyle: 'solid',
    borderRadius: pxToRem(3),
    borderWidth: pxToRem(1),
    indicatorColor: 'transparent',
    gap: pxToRem(12),
    selectionIndicatorMargin: `0 0 0 0`,
    background: 'transparent',

    checkedBackground: _.get(siteVars, 'colorScheme.brand.backgroundActive1', defaultValue),
    checkedBorderColor: _.get(siteVars, 'colorScheme.brand.backgroundActive1', defaultValue),
    checkedIndicatorColor: _.get(siteVars, 'colorScheme.default.background', defaultValue),

    disabledBackground: _.get(siteVars, 'colorScheme.default.background', defaultValue),
    disabledBackgroundChecked: _.get(siteVars, 'colorScheme.default.backgroundDisabled', defaultValue),
    disabledBorderColor: _.get(siteVars, 'colorScheme.default.foregroundDisabled1', defaultValue),
    disabledCheckedIndicatorColor: _.get(siteVars, 'colorScheme.default.foregroundDisabled', defaultValue),
  };
};
