import * as React from 'react';

type QueryResult<Value> = {
  value: Value;
  state: 'idle' | 'loading' | 'loaded' | 'error';
};

/**
 * This function is just for the sake of the example,
 * a library for fetching data (like react-query) might be a better option
 */
export function useQuery<Value>(initialValue: Value) {
  const [queryResult, setQueryResult] = React.useState<QueryResult<Value>>({ value: initialValue, state: 'idle' });
  const query = React.useCallback((fn: () => PromiseLike<Value> | Value) => {
    setQueryResult(curr => ({ ...curr, state: 'loading' }));
    Promise.resolve(fn())
      .then(nextValue => {
        setQueryResult({ value: nextValue, state: 'loaded' });
      })
      .catch(() => {
        setQueryResult(curr => ({ ...curr, state: 'error' }));
      });
  }, []);
  return { ...queryResult, query } as const;
}
