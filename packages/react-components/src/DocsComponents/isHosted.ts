const getURLParameter = (p: string) => {
  const url = window.location.search.substring(1);
  const params = url.split('&');
  const match = params.find(param => {
    return param.split('=')[0] === p;
  });
  return match?.split('=')[1];
};

export const isHosted = () => getURLParameter('hosted') === 'true';
