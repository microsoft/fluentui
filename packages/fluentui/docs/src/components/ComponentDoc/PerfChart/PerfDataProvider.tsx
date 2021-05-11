import * as React from 'react';
import PerfDataContext from './PerfDataContext';
import config from '../../../config';

/**
 * Fetches data from network and stores them to context.
 * In production build, returns error instead of fetching the data.
 * TODO:
 * [ ] cache data in Local Storage
 * [ ] optionally fetch more data
 * [ ] refresh support
 * [ ] serve static data in public builds
 */
const PerfDataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const query = process.env.NODE_ENV === 'production' ? '' : '?withPrivateBuilds=true';

    fetch(`${config.getStatsUri}${query}`)
      .then(response => response.json())
      .then(responseJson => {
        setData(responseJson);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return <PerfDataContext.Provider value={{ loading, error, data }}>{children}</PerfDataContext.Provider>;
};

export default PerfDataProvider;
