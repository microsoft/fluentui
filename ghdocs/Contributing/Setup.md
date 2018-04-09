# Git branch setup

This document describes how to setup your development environment and contribute changes to the **office-ui-fabric-react** project. This document assumes basic working knowledge with Git and related tools. We are providing instructions specific to this project.

## Setup

- Make sure you have a **github** account. If not, create one.
- Install **Node.js LTS 8** or greater from thes **[Node.js website](https://nodejs.org/en/)**.
- Install **[Git](https://git-scm.com/)**.
- For code editing we like **[Visual Studio Code ](https://code.visualstudio.com/)**
- For Git branch management we like **[SourceTree](https://www.atlassian.com/software/sourcetree)**

## Building

If you do not wish to contribute chages to the **office-ui-fabric-react** project, please follow the instructions on the [README](../README.md) page. Else, keep reading.

## Creating your own fork

If you wish to contribute changes back to the **office-ui-fabric-react** repository, start by creating your own fork of the repository. This is essential. This will keep the number of branches on the main repository to a small count. There are lots of developers in this project and creating lots of branches on the main repository does not scale. In your own fork, you can create as many branches as you like.

- Navigate to **[Github](https://www.github.com)** with a browser and login to your github account. For the sake of this document, lets assume your account is **johndoe**.
- Navigate to **[Office-ui-fabric-react](https://github.com/OfficeDev/office-ui-fabric-react)** repository in the same browser session.
- Click on the **fork** button at the top right corner of the page.
- Create the fork on your user name. Your github profile should now show **office-ui-fabric-react** as one of your repositories.
- Create a folder on your device and clone your fork of the **office-ui-fabric-react** repository. e.g. https://github.com/**johndoe**/office-ui-fabric-react.git. Notice how your github user name is in the repository location.

```
> git clone https://github.com/johndoe/office-ui-fabric-react.git
```

## Building

Next, clone and build the code.

```
- git clone https://github.com/johndoe/office-ui-fabric-react.git
- cd packages/office-ui-fabric-react
- npm install
- npm run build
- npm start
```

## Setting up the upstream repository

Before starting to contribute changes, please setup your upstream repository to the primary **office-ui-fabric-react** repository.

- When you run **git remote -v**, you should see only your fork in the output list

```
>git remote -v

     origin  https://github.com/johndoe/office-ui-fabric-react.git (fetch)

     origin  https://github.com/johndoe/office-ui-fabric-react.git (push)
```

- Map the primary **office-ui-fabric-react** repository as the upstream remote

```
>git remote add upstream https://github.com/OfficeDev/office-ui-fabric-react.git
```

- Now running **git remote -v** should show the upstream repository also

```
>git remote -v

     origin  https://github.com/johndoe/office-ui-fabric-react.git (fetch)

     origin  https://github.com/johndoe/office-ui-fabric-react.git (push)

     upstream        https://github.com/OfficeDev/office-ui-fabric-react.git (fetch)

     upstream        https://github.com/OfficeDev/office-ui-fabric-react.git (push)
```

- At this point you are ready to start branching and contributing back changes.

## Making code changes and creating a pull request

Create a branch from your fork and start making the code changes. Either a new component or bug fixes to existing components. We recommend using [**SourceTree**](https://www.sourcetreeapp.com/) for working in your repo. Once you are happy with the changes, and want to merge them to the main **office-ui-fabric-react** project, create a pull request from your branch directly to "OfficeDev/office-ui-fabric-react  master".

Members on the **office-ui-fabric-react** core team will help merge your changes.

## Merging upstream master into your fork master

From time to time, your fork will get out of sync with the upstream remote. Use the following commands to get your fork up upto date.

```
git fetch upstream
git checkout master
git pull upstream master
```

## Merging upstream master into your current branch

From time to time, your current branch will get out of sync with the upstream remote. Use the following commands to get your branch up upto date.

```
git fetch upstream
git pull upstream master
```

All done!
