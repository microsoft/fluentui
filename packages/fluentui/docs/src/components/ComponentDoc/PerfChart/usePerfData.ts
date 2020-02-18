import * as React from 'react'
import PerfDataContext from '../PerfChart/PerfDataContext'
import * as _ from 'lodash'

const usePerfData = (filter?: string) => {
  const { loading, error, data = [] } = React.useContext(PerfDataContext)

  if (loading || error) {
    return { loading, error, data }
  }

  const filteredData = filter
    ? data
        .filter(entry => _.get(entry, `performance.${filter}`))
        .map(entry => ({
          ...entry,
          performance: { [filter]: entry.performance[filter] },
        }))
    : data

  if (filteredData.length === 0) {
    return { loading, error: new Error('No data'), data: filteredData }
  }

  return {
    loading,
    error,
    data: filteredData,
  }
}

export default usePerfData
