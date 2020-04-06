import { StatusVariables } from '../../../teams/components/Status/statusVariables';

export default (siteVariables): Partial<StatusVariables> => ({
  successBackgroundColor: siteVariables.accessibleGreen,
  successTextColor: siteVariables.colors.black,
  infoBackgroundColor: siteVariables.accessibleCyan,
  infoTextColor: siteVariables.colors.black,
  warningBackgroundColor: siteVariables.accessibleYellow,
  warningTextColor: siteVariables.colors.black,
  errorBackgroundColor: siteVariables.red,
  errorTextColor: siteVariables.colors.black,
  defaultBackgroundColor: siteVariables.colors.white,
  defaultTextColor: siteVariables.colors.black,
});
