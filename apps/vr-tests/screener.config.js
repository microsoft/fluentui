module.exports = {
  projectRepo: 'OfficeDev/office-ui-fabric-react',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch:
    (process.env['Build.Reason'] === 'PullRequest' && process.env['Build.SourceBranchName']) ||
    'master',
  failureExitCode: 0,
  alwaysAcceptBaseBranch: true
};

// if (process.env['Build.SourceBranchName'] === 'master') {
// config.browsers = [
//   {
//     browserName: 'internet explorer',
//     version: '11.103'
//   },
//   {
//     browserName: 'chrome'
//   },
// {
//   browserName: 'firefox'
// },
// {
//   browserName: 'microsoftedge'
// }
// ];

// config.sauce = {
//   username: 'dzearing',
//   accessKey: process.env.SAUCE_API_KEY
// };
// }
