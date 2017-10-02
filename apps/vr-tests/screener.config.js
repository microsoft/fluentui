module.exports = {
  projectRepo: 'OfficeDev/office-ui-fabric-react',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch: (process.env.TRAVIS_PULL_REQUEST !== 'false' && process.env.TRAVIS_BRANCH) || 'master',
  failureExitCode: 0
};

// if (process.env.TRAVIS_BRANCH === 'master') {
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
