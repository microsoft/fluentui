import { pxToRem } from '../../../../utils';

export interface TreeTitleVariables {
  color: string;
  padding: string;
}

export default (siteVars: any): TreeTitleVariables => {
  return {
    color: siteVars.colorScheme.default.foreground,
    padding: `${pxToRem(1)} 0`,
  };
};
