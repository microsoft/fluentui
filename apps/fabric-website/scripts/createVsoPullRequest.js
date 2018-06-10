'use strict';

/**
 * Script used to create a pull request throught the VSO API
 */

let request = require('request');

/**
 * Environment variable set during the build that data will be POST to.
 * @type string
 */
const vsoApiUrl = process.env.VSO_API_URL;

/**
 * The name of the source branch. Example: refs/heads/topic/sometopic
 * @type string
 */
const srcRefName = process.env.BUILD_SOURCEBRANCHNAME;

/**
 * The name of the target branch. Example: refs/heads/master
 * @type string
 */
const targetRefName = process.env.TARGET_REF_NAME;

/**
 * Title of the pull request.
 * @type string
 */
const baseTitle = process.env.BASE_TITLE;

/**
 * The base reference path for the branch. Example refs/heads/.
 * @type string
 */
const baseBranchPath = 'refs/heads/';

/**
 * Importing the package.json to get the current package version.
 * @type string
 */
const packageData = require('../package');

/**
 * Title of the pull request.
 * @type string
 */
const title = baseTitle + ' - ' + packageData.version;

/**
 * Description of the pull request.
 * @type string
 */
const description = process.env.DESCRIPTION;


/**
 * Object of data to POST to the API
 */
const postFields = {
  "sourceRefName": baseBranchPath + srcRefName,
  "targetRefName": baseBranchPath + targetRefName,
  "title": { title },
  "description": { prDescription }
};

/**
 * Main function to kick off the post request
 */
function createVsoBranch() {
  request.post({ url: vsoApiUrl, form: postFields }, function (err, httpResponse, body) {
    if (err) {
      console.error(err);
    }

    console.log("HTTP Response:", httpResponse);
    console.log("Body Response:", body)
  });
}

createVsoBranch();