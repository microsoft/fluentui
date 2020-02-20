export interface HierarchicalTreeTitleVariables {
  defaultColor: string;
}

export default (siteVars: any): HierarchicalTreeTitleVariables => {
  return {
    defaultColor: siteVars.colors.grey[750],
  };
};
