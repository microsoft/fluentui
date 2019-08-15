Fabric React provides several starter kit options. Make sure you have the [latest LTS Node.js](https://nodejs.org/en/) installed, then choose one of the options below:

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

UI Fabric also provides a starter using [Create React App](https://facebook.github.io/create-react-app/), a popular development stack maintained by the creators of React.

Open a terminal, go to an appropriate folder, and clone the [starter repo](https://github.com/microsoft/create-react-app-uifabric):

```shell
git clone https://github.com/microsoft/create-react-app-uifabric.git my-app
cd my-app
```

Then install dependencies and start the app like this:

```shell
# with npm (default)
npm install
npm start

# with yarn (optional)
yarn
yarn start
```

### Option 3: Gatsby.js

To start creating a blazing fast static website or app using UI Fabric and [Gatsby.js](https://www.gatsbyjs.org/), run the following in a terminal:

```shell
npm install -g gatsby-cli
gatsby new gatsby-site kenotron/gatsby-starter-uifabric
cd gatsby-site
gatsby develop
```

This app be deployed to the cloud in one click—[learn more here](https://github.com/microsoft/gatsby-starter-uifabric#-deploy).
