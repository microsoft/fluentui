export interface StatusVariables {
  borderColor: string;
  borderWidth: number;
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

export const statusVariables = (siteVariables): StatusVariables => ({
  borderColor: undefined,
  borderWidth: 2,
  successBackgroundColor: siteVariables.colorScheme.green.background,
  successTextColor: siteVariables.colorScheme.green.foreground1,
  infoBackgroundColor: siteVariables.colorScheme.brand.background,
  infoTextColor: siteVariables.colorScheme.default.foreground2,
  warningBackgroundColor: siteVariables.colorScheme.yellow.background,
  warningTextColor: siteVariables.colorScheme.yellow.foreground2,
  errorBackgroundColor: siteVariables.colorScheme.red.background,
  errorTextColor: siteVariables.colorScheme.red.foreground2,
  defaultBackgroundColor: siteVariables.colorScheme.default.background5,
  defaultTextColor: siteVariables.colorScheme.default.foreground4,
});
