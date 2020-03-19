import * as React from 'react';

export interface IUseQueryStringResponse {
  queryString: string;
  setQueryString: (queryString: string) => void;
}

export const useQueryString = (intialQueryString: string) => {
  const [queryString, setQueryString] = React.useState(intialQueryString);
  return { queryString: queryString, setQueryString: setQueryString } as IUseQueryStringResponse;
};
