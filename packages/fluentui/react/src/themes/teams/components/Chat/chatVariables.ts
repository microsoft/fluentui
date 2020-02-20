export interface ChatVariables {
  backgroundColor: string;
}

export default (siteVars): ChatVariables => ({
  backgroundColor: siteVars.colors.grey[100],
});
