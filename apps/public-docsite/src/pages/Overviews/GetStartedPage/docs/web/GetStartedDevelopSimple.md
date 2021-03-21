Fluent UI React provides several starter kit options. Make sure you have the [latest LTS Node.js](https://nodejs.org/en/) installed, then choose one of the options below:

- [Option 1: Quick start](#option-1-quick-start)
- [Option 2: Using Create React App](#option-2-create-react-app)
- [Option 3: Using Gatsby.js](#option-3-gatsbyjs)

### Option 1: Quick start

Open a terminal and go to the folder where you want the project created, then run:

```shell
npm init uifabric
```

It'll prompt you for a project name. For example, if you call the project `my-app`, you can start it like this:

```shell
cd my-app
npm start
```

Open up the `App.tsx` file and start editing. You'll see your changes in the browser seconds after you hit save.

This scaffold uses the [Just](https://github.com/microsoft/just) build library. It is very flexible and requires no "eject" script to allow customizing configuration.

### Option 2: Create React App

Fluent UI also provides a template for [Create React App](https://facebook.github.io/create-react-app/) which is
a popular development stack maintained by the creators of React.

To get up and running, all you need is to boot Create React App using our `@fluentui/cra-template` template.
To do this, open a terminal and run:

```shell
# with npx
npx create-react-app my-app --template @fluentui/cra-template

# with npm
npm init react-app my-app --template @fluentui/cra-template

# with yarn
yarn create react-app my-app --template @fluentui/cra-template
```

Then you can start the app like this:

```shell
# with npm (default)
cd my-app
npm start

# with yarn (optional)
cd my-app
yarn start
```

### Option 3: Gatsby.js

To start creating a blazing fast static website or app using Fluent UI and [Gatsby.js](https://www.gatsbyjs.org/), run the following in a terminal:

```shell
npm install -g gatsby-cli
gatsby new gatsby-site kenotron/gatsby-starter-uifabric
cd gatsby-site
gatsby develop
```

This app can be deployed to the cloud in one click—[learn more here](https://github.com/microsoft/gatsby-starter-uifabric#-deploy).
