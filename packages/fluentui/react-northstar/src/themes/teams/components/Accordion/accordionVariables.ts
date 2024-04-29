export interface AccordionVariables {
  color: string;
  focusBorderColor: string;
  focusBorderRadius: string;
  focusBorderWidth: string;
}

export const accordionVariables = (siteVars: any): AccordionVariables => ({
  color: siteVars.bodyColor,
  focusBorderColor: siteVars.focusOuterBorderColor,
  focusBorderRadius: siteVars.borderRadiusMedium,
  focusBorderWidth: siteVars.borderWidth,
});
