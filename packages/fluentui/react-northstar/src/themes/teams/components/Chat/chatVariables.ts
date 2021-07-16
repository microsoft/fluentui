export interface ChatVariables {
  backgroundColor: string;
}

export const chatVariables = (siteVars): ChatVariables => ({
  backgroundColor: siteVars.colorScheme.default.background2,
});
