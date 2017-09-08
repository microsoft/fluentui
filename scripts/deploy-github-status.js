let argv = require('yargs').argv;
let GitHubApi = require('github');

const REPO_DETAILS = {
  owner: "OfficeDev",
  repo: "office-ui-fabric-react"
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
  "state": "success",
  "target_url": "http://odsp-ext.azurewebsites.net/fabric-deploy-test/" + argv.prID,
  "description": "PR Deployed - click \"Details\" to view site",
  "context": "vsts/pr-deploy"
};

github.repos.createStatus(statusConfig, (err, res) => {
  if (err) {
    throw new Error(`Failed to deploy this pull request. \n ${err}`);
  }


});