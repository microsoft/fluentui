import * as React from 'react';

export interface IUseQueryStringResponse {
  queryString: string;
  setQueryString: (queryString: string) => void;
  clearQueryString: () => void;
}

export const useQueryString = (intialQueryString: string) => {
  const [queryString, setQueryString] = React.useState(intialQueryString);

  const clearQueryString = (): void => {
    setQueryString('');
  };

  return {
    queryString: queryString,
    setQueryString: setQueryString,
    clearQueryString: clearQueryString,
  } as IUseQueryStringResponse;
};
