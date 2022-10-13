import * as BuildInterfaces from 'azure-devops-node-api/interfaces/BuildInterfaces';
import * as unzip from 'unzipper';
import { downloadAdoDropToDestination } from './getAdoDrop';
import { Apis } from './getApi';
import * as common from './getApi';
import { getProject } from './getProject';

export class NoArtifactFoundError extends Error {
  constructor(artifactName: string) {
    super(`No artifacts with name:  ${artifactName} were found`);
  }
}

export const downloadBuildArtifact = async (
  buildId: number,
  artifactName: string,
  outputLocation: string,
  apis: Apis,
  projectname: string | undefined = undefined,
  decompressionExperiment: boolean = true,
  maxRetries: number = 1,
): Promise<void> => {
  try {
    const { buildApi } = apis;
    const project = getProject(projectname);

    const artifact = await buildApi.getArtifact(project, buildId, artifactName);
    if (!artifact) {
      console.log(`ARTIFACT ${artifactName} not found..`);
      throw new NoArtifactFoundError(artifactName);
    }

    if (artifact.resource?.type === 'drop-path' && artifact.resource.data) {
      await downloadAdoDropToDestination(artifact.resource.data, artifactName, outputLocation);
      return;
    }

    try {
      const artifactContent = await buildApi.getArtifactContentZip(project, buildId, artifactName);

      console.log(`downloadBuildArtifact: Downloaded  ${artifactName} for buildId ${buildId}`);

      await extractArtifactContent({ artifactContent, outputLocation }, decompressionExperiment);

      return;
    } catch (buildArtifactError: any) {
      console.log(
        `downloadBuildArtifact: Failed to download/extract  ${artifactName} with error ${buildArtifactError}`,
      );
      throw new Error(`Failed downloading/extracting artifact(s) ${artifactName} ${buildArtifactError}`);
    }
  } catch (err: any) {
    console.log('error', err);
    if (maxRetries > 0) {
      return await downloadBuildArtifact(
        buildId,
        artifactName,
        outputLocation,
        apis,
        projectname,
        decompressionExperiment,
        maxRetries - 1,
      );
    } else {
      throw err;
    }
  }
};

function readStreamAsBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line: no-any
    const data: any[] = [];
    stream.on('data', chunk => {
      data.push(chunk);
    });
    stream.on('end', () => {
      console.log('readStreamAsBuffer: End');
    });
    stream.on('close', () => {
      console.log('readStreamAsBuffer: Close');
      resolve(Buffer.concat(data));
    });
    stream.on('error', streamError => {
      console.log('readStreamAsBuffer: Error-' + streamError);
      reject(streamError);
    });
  });
}

export const isBuildResultSuccessful = async (buildId: number, apis: Apis) => {
  const { buildApi } = apis;
  const project = getProject();

  const buildDetails: BuildInterfaces.Build = await buildApi.getBuild(project, buildId);
  if (buildDetails.result && buildDetails.result === BuildInterfaces.BuildResult.Succeeded) {
    console.log('# Build Successful for id: ' + buildId);
    return true;
  }
  console.log('# Build failed for id: ' + buildId);
  return false;
};

export const isBuildArtifactAvailable = async (buildId: number, artifactName: string, apis: Apis) => {
  const { buildApi } = apis;
  const project = getProject();

  const artifact = await buildApi.getArtifact(project, buildId, artifactName);
  if (!artifact) {
    console.log(`ARTIFACT ${artifactName} not found.. for buildid: ${buildId}`);
    return false;
  }

  return true;
};

export const getLastCommitInBuild = async (buildId: number, apis: Apis) => {
  if (!apis) {
    apis = await common.getApis();
  }

  const { buildApi } = apis;
  const project = getProject();
  const build = await buildApi.getBuild(project, buildId);

  if (build) {
    // const sourcebranch = build.sourceBranch;
    return build.sourceVersion;
  }
  return undefined;
};

const extractArtifactContent = async ({ artifactContent, outputLocation }, newdecompressionexp: boolean = true) => {
  const concurrencyLevel = 3;
  if (newdecompressionexp) {
    // This approach fixes unexpected end of file error in Zip file when opening directory and then extracting it
    try {
      const directory = await unzip.Open.buffer(await readStreamAsBuffer(artifactContent));
      await directory.extract({
        path: outputLocation,
        concurrency: concurrencyLevel,
      });
    } catch (decompresserror: any) {
      throw new Error('extractArtifactContent: Error' + decompresserror);
    }
  } else {
    return new Promise<void>((resolve, reject) => {
      artifactContent
        .pipe(unzip.Extract({ path: outputLocation, concurrency: concurrencyLevel }))
        .on('finish', () => {
          console.log('Finish');
        })
        .on('close', () => {
          console.log('Close');
          resolve();
        })
        .on('error', (e: Error) => {
          reject(new Error('Failed downloading artifacts: ' + e));
        });
    });
  }
};

export const getOwnerAliasOfBuild = async (buildId: number, apis?: Apis) => {
  if (!apis) {
    apis = await common.getApis();
  }

  const { buildApi } = apis;
  const project = getProject();
  const build = await buildApi.getBuild(project, buildId);

  if (build && build.requestedFor && build.requestedFor.uniqueName) {
    return build.requestedFor.uniqueName.split('@')[0];
  }
  return null;
};
