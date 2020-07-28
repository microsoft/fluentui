export interface HierarchicalTreeTitleVariables {
  defaultColor: string;
}

export const hierarchicalTreeTitleVariables = (siteVars: any): HierarchicalTreeTitleVariables => {
  return {
    defaultColor: siteVars.colors.grey[750],
  };
};
