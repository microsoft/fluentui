import * as React from 'react';
import * as _ from 'lodash';
import PerfDataContext from './PerfDataContext';

const usePerfData = (filter?: string) => {
  const { loading, error, data = [] } = React.useContext(PerfDataContext);

  if (loading || error) {
    return { loading, error, data };
  }

  const filteredData = filter
    ? data
        .filter(entry => _.get(entry, `performance.${filter}`))
        .map(entry => ({
          ...entry,
          performance: { [filter]: entry.performance[filter] },
          bundleSize: undefined,
        }))
    : data;

  if (filteredData.length === 0) {
    return { loading, error: new Error('No data'), data: filteredData };
  }

  return {
    loading,
    error,
    data: filteredData,
  };
};

export default usePerfData;
