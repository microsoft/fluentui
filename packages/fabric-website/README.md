# [Fabric website](http://dev.office.com/fabric)

##### The official website for the Offce UI Fabric project.

Office UI Fabric is a collection of projects that represent the Office and Office 365 design language in code. This website helps document, explain, and guide folks to the variety of sub-projects that make up Fabric.

## Build the website

Before you get started, make sure you have [node.js](https://nodejs.org/), [gulp](http://gulpjs.com/), and [git](https://git-scm.com/) installed. To view the documentation including examples, contracts, current statuses, and to add functionality or fix issues locally, you can:

1. `git clone https://github.com/OfficeDev/office-ui-fabric-react.git` - this is the [Office UI Fabric React project](https://github.com/OfficeDev/office-ui-fabric-react) which you will want to name *office-ui-fabric-react*
2. `npm install` the Fabric React project you just cloned in the previous step
3. `gulp serve` the Fabric React project
4. Stop the local web server
5. `git clone https://onedrive.visualstudio.com/DefaultCollection/Design/_git/fabric-website` (the Fabric website project) into a sibling directory to the *office-ui-fabric-react* folder you just created and cloned Fabric React into
6. `npm install` from within the Fabric website folder you created in the previous step
7. `npm link ../office-ui-fabric-react` This tells NPM to use your local build of Fabric React instead of the regular copy where the link is to the project you cloned in step **1**
8. `gulp serve`

This will open a web browser with the home page. You can make changes to the code which will automatically build and refresh the page using live-reload.

## Deploy the website

1. Git checkout the `master` branch of this project.
2. Update the version number for this release at the top of `package.json`
 - To determine the new version number, review the merged pull requests since the last release and follow [semantic versioning](http://semver.org).
 - The new version will almost always be a minor increment. E.g. 4.1.0 becomes 4.2.0
3. Update the dependencies for Fabric Core and Fabric React in `package.json`
 - This will ensure that the site itself is built with the latest versions of Fabric.
 - View the [Fabric Core releases](https://github.com/OfficeDev/office-ui-fabric-core/releases) and [Fabric React releases](https://github.com/OfficeDev/office-ui-fabric-react/releases) to determine the version numbers of the latest releases.
4. Update the home page (`src/pages/HomePage/HomePage.tsx`) to show the latest releases under the "Get Started" button.
5. Navigate to the sibling office-ui-fabric-react project (see build instructions above), which is used as the source of component pages.
6. Git checkout the commit of Fabric React that is tagged with the latest release.
7. Run `gulp nuke` and `npm install`, followed by `gulp serve`. Verify that the Fabric React project is building correctly and works.
8. Navigate back over to the Fabric Website folder.
9. Run `gulp nuke` and `npm install`, followed by `gulp serve` to build the site locally. Test all pages and functionality to ensure it is working as expected.
10. Git checkout a new branch (you should still be on `master`) named something like `[alias]/[new-version-number]-changes`. Make a commit that includes your changes to `package.json` and `HomePage.tsx`. Push this to VSTS.
11. Run `gulp deploy` to deploy a test build of the website. Once again, test the website to ensure it is working as expected.
12. Create a pull request in VSTS, merging the branch (e.g. `miwhea/4.2.0-changes`) into `master`.
13. Once it is approved and merged, the `master` branch is now ready for release.
14. Git checkout the `deploy` branch of the Fabric Website.
15. Git checkout a new release branch named in the form `release/[new-version-number]`.
16. Merge the latest commits from `master` into this new branch you created.
 - Have any new URLs been added? Prepend `/Modules/DevOffice.Fabric/` to the URL so that the paths are correct on dev.office.com. For example: `dist/images/logo-office-dev.svg` becomes `/Modules/DevOffice.Fabric/dist/images/logo-office-dev.svg`
17. Run `gulp serve` to build and test the site locally.
18. Log in via FTP (credentials are in our team's OneNote) and replace the current files with `index.html`, `dist/` and `images/`.
19. You've deployed the website! Test the live site one final time (and ask others to do the same) to be sure there are no unexpected issues.

**Note**: Were any steps missing? Could the instructions be made clearer for the next person? Update the instructions above and submit a pull request!

## Licenses

All files on the Office UI Fabric React GitHub repository are subject to the MIT license. Please read the License file at the root of the project. 

Usage of the fonts referenced in Office UI Fabric files is subject to the [license](https://spoprod-a.akamaihd.net/files/fabric/assets/license.txt).

- - - 

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.