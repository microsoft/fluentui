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

export default siteVariables => ({
  borderColor: undefined,
  borderWidth: 2,
  successBackgroundColor: siteVariables.colorScheme.green.foreground,
  successTextColor: siteVariables.colorScheme.default.foreground4,
  infoBackgroundColor: siteVariables.colorScheme.brand.foreground,
  infoTextColor: siteVariables.colorScheme.default.foreground4,
  warningBackgroundColor: siteVariables.colorScheme.yellow.foreground,
  warningTextColor: siteVariables.colorScheme.default.foreground4,
  errorBackgroundColor: siteVariables.colorScheme.red.foreground,
  errorTextColor: siteVariables.colorScheme.default.foreground4,
  defaultBackgroundColor: siteVariables.colorScheme.default.background5,
  defaultTextColor: siteVariables.colorScheme.default.foreground4,
});
