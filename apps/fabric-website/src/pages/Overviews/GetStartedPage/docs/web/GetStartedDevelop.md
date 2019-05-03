The UI Fabric library is really easy to use! To get started, make sure you have the latest LTS node.js installed:

- https://nodejs.org

After you have downloaded and installed this, you can pick one of the following ways to quickly start exploring UI Fabric.

## Easy Mode

Simply run this command in a folder in which you want to have the project created:

```shell
npm init uifabric
```

It'll prompt you for a project name. For example, if you chose to create a project called `my-app`, you can start working on the project like this:

```shell
npm start
```

This scaffold uses the [`just`](https://github.com/microsoft/just) build library. It is very flexible and requires no "eject" script to allow for customization on its configurations.

## Create React App

UI Fabric also provides a precanned `create-react-app` version of the above application due to its popularity and community support.

Clone or fork this repo: https://github.com/kenotron/create-react-app-uifabric

```shell
git clone https://github.com/kenotron/create-react-app-uifabric.git my-app
cd my-app
yarn
yarn start
```

## Gatsby.js

To create blazing fast React websites and apps using UI Fabric and Gatsby.js, use the following starter kit:

```shell
npm install -g gatsby-cli
gatsby new gatsby-site kenotron/gatsby-starter-uifabric
cd gatsby-site
gatsby develop
```

You can even read about how to deploy this to the cloud in one click here:

https://github.com/kenotron/gatsby-starter-uifabric#-deploy

## Next Steps

If you are interested in learning more about how to use UI Fabric, here are few resources:

1. [Frontend Bootcamp](https://microsoft.github.io/frontend-bootcamp/)'s day 2 materials
2. [UI Fabric Documentation](https://developer.microsoft.com/en-us/fabric/#/components)
