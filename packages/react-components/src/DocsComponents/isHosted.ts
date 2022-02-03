// We are doing some conditional styling for when the storybook iframes are "hosted"
// in the Fluent UI website. This utility checkes for a &hosted=true in the url Param

const getURLParameter = (p: string) => {
  const url = window.location.search.substring(1);
  const searchParams = new URLSearchParams(url);
  return searchParams.get(p);
};

export const isHosted = () => getURLParameter('hosted') === 'true';
