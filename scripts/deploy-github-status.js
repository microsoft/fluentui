let argv = require('yargs').argv;
let GitHubApi = require('github');

const REPO_DETAILS = {

};

if (!argv.token) {
  throw new Error("No token specified. Use --token=<token> to provide a token.");
}

// Authenticate with github.
let github = new GitHubApi({ debug: argv.debug });

github.authenticate({
  type: 'token',
  token: argv.token
});

let statusConfig = {
  owner: "erichdev",
  repo: "office-ui-fabric-react",
  state: "success",
  sha: argv.commitID,
  target_url: "http://odsp-ext.azurewebsites.net/fabric-deploy-test/" + argv.prID,
  description: "PR Deployed - click \"Details\" to view site",
  context: "vsts/pr-deploy"
};

github.repos.createStatus(statusConfig, (err, res) => {
  if (err) {
    throw new Error(`Failed to deploy pull request #${argv.prID}. \n ${err}`);
  }

  console.log(`Successfully deployed pull request #${argv.prID}`);
});