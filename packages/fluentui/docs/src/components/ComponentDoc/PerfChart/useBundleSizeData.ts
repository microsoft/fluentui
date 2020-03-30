import * as React from 'react';
import * as _ from 'lodash';
import PerfDataContext from './PerfDataContext';

const useBundleSizeData = (filter?: string) => {
  const { loading, error, data = [] } = React.useContext(PerfDataContext);

  if (loading || error) {
    return { loading, error, data };
  }

  const filteredData = filter
    ? data
        .filter(entry => _.get(entry, `bundleSize.${filter}`))
        .map(entry => ({
          ...entry,
          bundleSize: { [filter]: entry.bundleSize[filter] },
          performance: undefined,
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

export default useBundleSizeData;
