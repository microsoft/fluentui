import * as vm from 'azure-devops-node-api';
import * as nodeApi from 'azure-devops-node-api';
import * as ba from 'azure-devops-node-api/BuildApi';
import * as GitApi from 'azure-devops-node-api/GitApi';
import * as lim from 'azure-devops-node-api/interfaces/LocationsInterfaces';
import { getEnv } from '../getEnv';
import { measure } from '../measure';

export function getAuthHeader(): string {
  return `Basic ${Buffer.from(`:${getEnv('API_TOKEN')}`).toString('base64')}`;
}

export function getWebApi(serverUrl?: string, crossOriginAuthAllowed?: boolean): Promise<vm.WebApi> {
  serverUrl = serverUrl || getEnv('API_URL');
  return getApi(serverUrl, crossOriginAuthAllowed);
}

async function getApi(serverUrl: string, crossOriginAuthAllowed: boolean = true): Promise<vm.WebApi> {
  return new Promise<vm.WebApi>(async (resolve, reject) => {
    try {
      const token = getEnv('API_TOKEN');
      const authHandler = vm.getPersonalAccessTokenHandler(token, crossOriginAuthAllowed);
      const option = undefined;
      const vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler, option);
      const connData: lim.ConnectionData = await vsts.connect();
      console.log(`Hello ${connData.authenticatedUser && connData.authenticatedUser.providerDisplayName}`);
      resolve(vsts);
    } catch (err: any) {
      reject(err);
    }
  });
}

export type Apis = {
  webApi: nodeApi.WebApi;
  gitApi: GitApi.IGitApi;
  buildApi: ba.IBuildApi;
};

export async function getApis(): Promise<Apis> {
  const initApisMeasure = measure('Initializing Apis');

  const webApiMeasure = measure('Init Web Api');
  const webApi = await getWebApi();
  webApiMeasure.stop();

  const gitApiMeasure = measure('Init Git Api');
  const buildApiMeasure = measure('Init Build Api');
  const [gitApi, buildApi] = await Promise.all([
    webApi.getGitApi().then(gitApi => {
      gitApiMeasure.stop();
      return gitApi;
    }),
    webApi.getBuildApi().then(buildApi => {
      buildApiMeasure.stop();
      return buildApi;
    }),
  ]);

  initApisMeasure.stop();
  return {
    webApi,
    gitApi,
    buildApi,
  };
}
