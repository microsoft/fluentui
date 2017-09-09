let argv = require('yargs').argv;
let GitHubApi = require('github');

const REPO_DETAILS = {
  owner: "erichdev", // TODO: Change to OfficeDev ************************************
  repo: "office-ui-fabric-react",
};

let statusConfig = Object.assign({},
  REPO_DETAILS,
  {
    state: argv.state,
    target_url: "http://odsp-ext.azurewebsites.net/fabric-deploy-test/" + argv.prID,
    description: "PR deployed. Click \"Details\" to view site",
    context: "vsts/pr-deploy"
  });

let pr = parsePRNumber();

if (!argv.token) {
  throw new Error("No token specified. Use --token=<token> to provide a token.");
}

// Authenticate with github.
let github = new GitHubApi({ debug: argv.debug });

github.authenticate({
  type: 'token',
  token: argv.token
});

getLatestCommitFromPR();

function createStatus(sha) {
  github.repos.createStatus(Object.assign({}, statusConfig, { sha }),
    (err, res) => {
      if (err) {
        throw new Error(`Failed to deploy pull request #${pr}. \n ${err}`);
      }

      console.log(`Successfully deployed pull request #${pr}`);
    });
}


function getLatestCommitFromPR() {
  github.pullRequests.get(Object.assign({}, REPO_DETAILS, { number: pr }), onGetLatestCommit);
}

function onGetLatestCommit(err, res) {
  if (err)
    throw new Error(`Failed to get latest commit. \n ${err}`);

  // Extract the head sha from response. See https://developer.github.com/v3/pulls/#get-a-single-pull-request for full response details
  if (res.head && res.head.sha)
    createStatus(res.head.sha);
}

/*
The PR ID is input in the format 'refs/pull/12/merge'. This function returns just the number.
*/
function parsePRNumber() {
  let splitString;

  if (argv.prID) {
    splitString = argv.prID.split('/');
  }

  if (!argv.prID || !splitString[2])
    throw new Error(`Failed to get PR number. \n ${err}`);

  return splitString[2];
}