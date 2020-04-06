import { pxToRem } from '../../../../utils';

export interface StatusVariables {
  borderColor: string;
  borderWidth: number;
  iconSize: string;
  successBackgroundColor: string;
  successTextColor: string;
  infoBackgroundColor: string;
  infoTextColor: string;
  warningBackgroundColor: string;
  warningTextColor: string;
  errorBackgroundColor: string;
  errorTextColor: string;
  defaultBackgroundColor: string;
  defaultTextColor: string;
}

export default siteVariables => ({
  borderColor: undefined,
  borderWidth: 2,
  iconSize: pxToRem(7),
  successBackgroundColor: siteVariables.colors.green[200],
  successTextColor: siteVariables.colors.white,
  infoBackgroundColor: siteVariables.colors.brand[500],
  infoTextColor: siteVariables.colors.white,
  warningBackgroundColor: siteVariables.colors.yellow[400],
  warningTextColor: siteVariables.colors.white,
  errorBackgroundColor: siteVariables.colors.red[400],
  errorTextColor: siteVariables.colors.white,
  defaultBackgroundColor: siteVariables.colors.grey[350],
  defaultTextColor: siteVariables.colors.white,
});
