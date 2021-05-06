export interface ChatVariables {
  backgroundColor: string;
}

export const chatVariables = (siteVars): ChatVariables => ({
  backgroundColor: siteVars.colors.grey[100],
});
