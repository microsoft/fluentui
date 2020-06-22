module.exports = {
  projectRepo: 'microsoft/fluentui',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: "1024x768",
  baseBranch: (process.env.SYSTEM_PULLREQUEST_TARGETBRANCH
    ? process.env.SYSTEM_PULLREQUEST_TARGETBRANCH.replace(/^refs\/heads\//, "")
    : "5.0"),
  failureExitCode: 0
};
