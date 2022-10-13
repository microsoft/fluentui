import * as bluebird from 'bluebird';
import * as fs from 'fs';
import * as https from 'https';
import { groupBy, keys } from 'lodash';
import * as path from 'path';
import { performance } from 'perf_hooks';
import { getAuthHeader, getWebApi } from './getApi';
import { execFileSync } from 'child_process';

const ORG_NAME = 'office';
const DROP_SERVICE_URL = `https://artifacts.dev.azure.com/${ORG_NAME}`;

const MAX_CONCURRENCY_DOWNLOAD = 50;

const getDropManifestUrl = dropName => `${DROP_SERVICE_URL}/_apis/drop/manifests/${dropName}`;

type ManifestEntry = {
  path: string;
  blob: {
    id: string;
    size: number;
    expiration: number;
    url: string;
  };
};

async function getManifest(dropName: string): Promise<ManifestEntry[]> {
  const api = await getWebApi(DROP_SERVICE_URL, false);
  const result = await api.rest.get<ManifestEntry[]>(getDropManifestUrl(dropName));
  if (!result.result) {
    throw new Error('Drop not found');
  }
  return result.result;
}

async function downloadFileAuthenticated(url: string, downloadPath: string, retries = 3): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      const file = fs.createWriteStream(downloadPath);
      const handleError = err => {
        file.close();
        fs.unlink(downloadPath, () => reject(err));
      };
      https
        .get(url, { headers: { Authorization: getAuthHeader() } }, res => {
          if (res.statusCode !== 200) {
            handleError(new Error('Status code not 200'));
          } else {
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              resolve();
            });
          }
        })
        .on('error', handleError);
    });
  } catch (err: any) {
    if (retries > 0) {
      console.log('Download failed for ', url, 'retrying');
      return downloadFileAuthenticated(url, downloadPath, retries - 1);
    }
    console.log('Download failed for ', url, 'with error', err);
    throw err;
  }
}

async function ensureDirectoryForFile(fileName: string): Promise<void | undefined | string> {
  const destinationDirectory: string = path.dirname(fileName);
  return fs.promises.mkdir(destinationDirectory, { recursive: true });
}

async function downloadSingleFile(
  blobUrl: string,
  destinationDirectory: string,
  destinationPaths: string[],
): Promise<void> {
  const fullDestinationPaths: string[] = destinationPaths.map(destinationPath =>
    path.join(destinationDirectory, destinationPath),
  );
  await ensureDirectoryForFile(fullDestinationPaths[0]);
  await downloadFileAuthenticated(blobUrl, fullDestinationPaths[0]);

  // In case same blob id used for multiple files - copy from the first file downloaded
  if (fullDestinationPaths.length > 1) {
    await Promise.all(
      fullDestinationPaths.slice(1).map(async destinationPath => {
        await ensureDirectoryForFile(destinationPath);
        await fs.promises.copyFile(fullDestinationPaths[0], destinationPath);
      }),
    );
  }
}

async function downloadDropUsingApi(dropPath: string, destinationFolder: string) {
  const manifestData = await getManifest(dropPath);
  console.log('Manifest downloaded');
  // We group by blob ids so we can skip downloading the same blob twice
  const manifestEntriesBlobIdMap = groupBy(manifestData, 'blob.id');
  console.log('Downloading', manifestData.length, 'files using', keys(manifestEntriesBlobIdMap).length, 'blobs');
  // @ts-ignore
  await bluebird.map(
    Object.values(manifestEntriesBlobIdMap),
    manifestEntriesForBlob =>
      downloadSingleFile(
        manifestEntriesForBlob[0].blob.url,
        destinationFolder,
        manifestEntriesForBlob.map(entry => entry.path),
      ),
    { concurrency: MAX_CONCURRENCY_DOWNLOAD },
  );
}

async function downloadDropUsingDropExe(dropExeLocation: string, dropPath: string, downloadLocation: string) {
  execFileSync(
    'drop.exe',
    ['get', '-s', 'office', '-n', dropPath, '-d', downloadLocation, '--patAuthEnvVar', 'API_TOKEN'],
    {
      cwd: path.normalize(dropExeLocation),
      stdio: [process.stdin, process.stdout, process.stderr],
    },
  );
}

export async function downloadAdoDropToDestination(
  dropName: string,
  artifactName: string,
  destinationFolder: string,
): Promise<void> {
  const start = performance.now();
  const finalDestinationFolder = path.join(destinationFolder, artifactName);
  console.log('Downloading ADO Drop ', dropName, 'to destination', finalDestinationFolder);
  fs.mkdirSync(finalDestinationFolder, { recursive: true });
  if (process.env.DROP_EXE_LOCATION) {
    await downloadDropUsingDropExe(process.env.DROP_EXE_LOCATION, dropName, finalDestinationFolder);
  } else {
    await downloadDropUsingApi(dropName, finalDestinationFolder);
  }
  console.log('Download complete in', performance.now() - start, 'ms');
}
