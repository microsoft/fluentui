export interface AccordionVariables {
  color: string;
}

export const accordionVariables = (siteVariables): AccordionVariables => ({
  color: siteVariables.bodyColor,
});
