export interface AccordionVariables {
  color: string;
}

export default (siteVariables): AccordionVariables => ({
  color: siteVariables.bodyColor,
});
