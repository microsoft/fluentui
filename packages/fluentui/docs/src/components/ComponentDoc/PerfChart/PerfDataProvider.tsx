import * as React from 'react';
import { openDB } from 'idb';
import PerfDataContext, { PerfSample } from './PerfDataContext';
import config from '../../../config';

const MAX_CACHE_SIZE = process.env.NODE_ENV !== 'production' ? 30 : 250;

function log(...args) {
  console.log('PerfDataProvider', ...args);
}

function openIndexedDb() {
  return openDB('perfData', 1, {
    upgrade(database, oldVersion, newVersion, transaction) {
      database.createObjectStore('stats', { keyPath: '_id' });
    },
  });
}

async function loadPerfDataFromCache(): Promise<PerfSample[] | undefined> {
  const db = await openIndexedDb();

  const data = await db
    .transaction('stats', 'readonly')
    .objectStore('stats')
    .getAll();

  return data.sort((a, b) => b._id - a._id);
}

async function savePerfDataToCache(data: PerfSample[]) {
  const db = await openIndexedDb();
  const tx = db.transaction('stats', 'readwrite');
  const store = tx.objectStore('stats');

  log(`Adding ${data.length} item(s) to cache`);
  data.forEach(value => {
    store.put(value);
  });

  await tx.done;
}

async function deleteOldPerfDataFromCache(allData: PerfSample[]) {
  const db = await openIndexedDb();
  const tx = db.transaction('stats', 'readwrite');
  const store = tx.objectStore('stats');

  const dataToDelete = allData.slice(MAX_CACHE_SIZE);
  log(`Deleting ${dataToDelete.length} old item(s) from cache`);
  dataToDelete.forEach(value => {
    store.delete(value._id);
  });

  await tx.done;
}

async function fetchDataFromServer(buildGt?: number): Promise<PerfSample[]> {
  const params = [
    process.env.NODE_ENV !== 'production' && 'withPrivateBuilds=true',
    buildGt && `buildGt=${buildGt}`,
  ].filter(Boolean);

  const query = params.length > 0 ? `?${params.join('&')}` : '';

  const response = await fetch(`${config.getStatsUri}${query}`);

  return response.json();
}

function mergeData(dataFromCache: PerfSample[], dataFromServer: PerfSample[]): PerfSample[] {
  // both sets are sorted in descending order
  // dataFromServer are newer than dataFromCache
  // the two sets do not overlap
  return [...(dataFromServer || []), ...(dataFromCache || [])];
}

const PerfDataProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    (async () => {
      try {
        const cachedData = await loadPerfDataFromCache();
        const maxCachedBuild = cachedData?.[0]?._id;
        log(`data from cache - ${cachedData.length} item(s), max build ${maxCachedBuild}`);
        const dataFromServer = await fetchDataFromServer(maxCachedBuild);
        const maxBuildFromServer = dataFromServer?.[0]?._id;
        log(`data from server - ${dataFromServer.length} item(s), max build ${maxBuildFromServer}`);
        savePerfDataToCache(dataFromServer);
        const mergedData = mergeData(cachedData, dataFromServer);
        log(`mergedData - ${mergedData.length} item(s)`);
        deleteOldPerfDataFromCache(mergedData);
        setData(mergedData);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    })();
  }, []);

  return <PerfDataContext.Provider value={{ loading, error, data }}>{children}</PerfDataContext.Provider>;
};

export default PerfDataProvider;
