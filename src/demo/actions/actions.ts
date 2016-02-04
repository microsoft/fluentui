export const NAVIGATE_TO_PAGE = 'NAVIGATE_TO_PAGE';

export const navigateToPage = (pageName: string) => {
  return {
    type: NAVIGATE_TO_PAGE,
    pageName: pageName
  };
};
