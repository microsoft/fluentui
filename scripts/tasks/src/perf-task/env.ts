/**
 * Hardcoded PR deploy URL for local testing
 */
const DEPLOY_URL = 'fluentuipr.z22.web.core.windows.net';

export const DEPLOYHOST = process.env.DEPLOYHOST ?? DEPLOY_URL;
export const DEPLOYURL = process.env.DEPLOYURL;
export const SYSTEM_PULLREQUEST_TARGETBRANCH = process.env.SYSTEM_PULLREQUEST_TARGETBRANCH;

const envPrefix = { filePath: 'PerfCommentFilePath', status: 'PerfCommentStatus' };

export const EnvVariablesByProject: { [projectName: string]: { filePath: string; status: string } } = {
  '@fluentui/react': { filePath: `${envPrefix.filePath}React`, status: `${envPrefix.status}React` },
  '@fluentui/react-components': {
    filePath: `${envPrefix.filePath}ReactComponents`,
    status: `${envPrefix.status}ReactComponents`,
  },
  '@fluentui/react-northstar': {
    filePath: `${envPrefix.filePath}ReactNorthstar`,
    status: `${envPrefix.status}ReactNorthstar`,
  },
};
