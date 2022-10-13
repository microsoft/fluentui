import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import rimraf = require('rimraf');
import * as common from './azure-builddata/getApi';
import { getLastCommitInBuild } from './azure-builddata/getBuildArtifact';

export const getWritableFolderPathInApp = (folder: string) => path.join(__dirname, '..', '..', '..', folder);

export async function createFolderInApp(folderPath: string): Promise<void> {
  if (!fs.existsSync(folderPath)) {
    await fs.promises.mkdir(folderPath, { recursive: true });
    console.log('Created Folder: ' + folderPath);
  } else {
    console.log('Folder: ' + folderPath + ' already exists');
  }
}

export async function prepareFolders(
  isBaselineDataUpload = false,
  clientType: string,
  buildId: number,
): Promise<string[]> {
  const folderPaths: string[] = [];
  const apis = await common.getApis();
  const lastMergeCommitId = await getLastCommitInBuild(buildId, apis);

  if (!isBaselineDataUpload) {
    let baseLineFolder = '';
    let candidateDataFolder = '';
    let diffResultFolder = '';

    baseLineFolder = getWritableFolderPathInApp(['temp', clientType, 'baseline', buildId].join(path.sep));
    folderPaths.push(baseLineFolder);

    candidateDataFolder = getWritableFolderPathInApp(['temp', clientType, 'candidate', buildId].join(path.sep));
    folderPaths.push(candidateDataFolder);

    diffResultFolder = getWritableFolderPathInApp(['temp', clientType, `baseline-${buildId}`].join(path.sep));
    folderPaths.push(diffResultFolder);
  } else {
    let baseLineReleaseFolder = '';
    const baselineWithCommit = lastMergeCommitId ? `baseline-release-${lastMergeCommitId}` : 'baseline-release';
    baseLineReleaseFolder = getWritableFolderPathInApp(
      path.join('temp', clientType, baselineWithCommit, buildId.toString()),
    );
    folderPaths.push(baseLineReleaseFolder);
  }

  return folderPaths;
}

/* Find filenames and full path of the files from current folder and subfolders Using glob */
export function getFileDetailsFromFolder(
  dirname: string,
  fileExtension: string = 'json',
  includeSubFolders: boolean = false,
): { filename: string; filepath: string }[] {
  const globForFiles = includeSubFolders ? `${dirname}/**/*.${fileExtension}` : `${dirname}/*.${fileExtension}`;

  return glob.sync(globForFiles).map(singleFilePath => {
    return {
      filename: path.basename(singleFilePath),
      filepath: singleFilePath,
    };
  });
}

export const cleanupDirectories = (folders: string[]) => {
  console.log(`Cleaning directories: ${folders}`);
  return Promise.all(folders.map(cleanupDirectory))
    .then(() => {
      console.log('Cleaned up directory');
    })
    .catch(e => {
      console.log(`Error cleaning up directory: ${e}`);
    });
};

function cleanupDirectory(folder: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(folder.concat('/*'), { maxBusyTries: 5 }, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export const normalizeFolderPath = (folderPath: string) => folderPath.split(path.sep).join('/');

export function flattenDirectory(folder: string, separator: string): string {
  const flattenedFolder = path.join(folder, 'flattened');

  if (!fs.existsSync(flattenedFolder)) {
    console.log(`'${flattenedFolder}' doesn't exist, creating`);
    fs.mkdirSync(flattenedFolder);
  }

  glob.sync(`${folder}/**/*.*`).forEach(file => {
    const flattenedFileName = file
      .replace(normalizeFolderPath(folder), '')
      .split('/')
      .filter(part => part !== '')
      .join(separator);

    fs.copyFileSync(file, path.join(flattenedFolder, flattenedFileName));
  });

  return flattenedFolder;
}
