### Prerequisites

All you need to get started with Fabric is [Node.js](https://nodejs.org/en/) and npm.

#### Node.js and npm

- Install **Node.js** (supported versions are 8.x through 10.x) from the [Node.js website](https://nodejs.org/en/).
- Install [Git](https://git-scm.com/).
- For code editing we like [Visual Studio Code](https://code.visualstudio.com/).

_You can check your node and npm version by running `node -v` and `npm -v` respectively._

#### create-react-app package

We will use [Create React App](https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html) to quickly create a React app.

Once node and npm are installed, type the following command in a console to install the `create-react-app` npm package.

```bash
npm install -g create-react-app
```

#### Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/).

We will use Visual Studio Code as our code editor for this tutorial. Feel free to use your favorite code editor of choice if you do not want to use Visual Studio Code.

### Step 1: Create React app

In a console, type the following command to create a simple React app.

_Optionally, we recommend using TypeScript by using the `--typescript` flag._

```bash
create-react-app button-demo --typescript
```

This will install the required dependencies and scaffold a simple React app.

![](https://github.com/OfficeDev/office-ui-fabric-react/wiki/images/create-react-app-created.png)

Once it's complete, navigate to the `button-demo` folder.

```bash
cd button-demo
```

Type the following command to launch the React app in your browser.

```bash
npm start
```

![](https://github.com/OfficeDev/office-ui-fabric-react/wiki/images/create-react-app-preview.png)

### Step 2: Install office-ui-fabric-react package

To use Fabric React in your project, you will need to first install the office-ui-fabric-react npm package. Type the following in the console to install the package:

```bash
npm install office-ui-fabric-react
```

If you have npm start command still running, terminate the command by pressing Ctrl+C.

### Step 3: Install all dependencies

All dependencies of the sample project need to be installed before the project can be launched. To install all dependencies, type the following:

```bash
npm install
```

### Step 4: Add PrimaryButton component

Open the `button-demo` project folder in Visual Studio Code.

Open the file `src\App.tsx` and replace the existing code inside `return` to only return the `PrimaryButton` component:

```tsx
import * as React from 'react';
import './App.css'

export App: React.FC = () => {
  return (
    <PrimaryButton onClick={() => alert("You clicked the button!")}>
      Hello World
    </PrimaryButton>
  );
}
```

Since `office-ui-fabric-react` is a npm module, we will need to import the button component in the `App` component.

The following import statement at the top of the `src\App.tsx` file just below `import './App.css'`:

```tsx
import { PrimaryButton } from 'office-ui-fabric-react';
```

Save the `src\App.tsx` file.

Below is an example of how you can similarly import other components:

```tsx
import { DefaultButton, DocumentCard, DocumentCardPreview, DocumentCardTitle, DocumentCardActivity } from 'office-ui-fabric-react';
```

Open `index.html` file.

Fabric React components provide support for Left-to-Right (LTR) and Right-to-Left (RTL) rendering out of the box.

You can specify the default direction in your `index.html`. Add the `dir` attribute with the value ltr to the `<html>` element:

```html
<html lang="en" dir="ltr"></html>
```

Load Office UI Fabric styles by linking to the Office UI Fabric CDN. Add the following to the `<head>` element:

```html
<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/9.6.1/css/fabric.min.css" />
```

Save the file.

### Step 5: Preview button

Switch to the console and type the following to preview your app in the browser:

```bash
npm start
```

You should see the `PrimaryButton` component in your app.

### Step 6: Using UI Fabric Icons

If you are using Fabric React components that have icons, you can make all icons available by calling the `initializeIcons` function from the `@uifabric/icons` package.

1. Install the `@uifabric/icons` npm package.

   ```bash
   npm install @uifabric/icons
   ```

2. Import `initializeIcons` function and then call it within your App.

   ```tsx
   import { initializeIcons } from '@uifabric/icons';

   // Register icons and pull the fonts from the default SharePoint CDN:
   initializeIcons();

   // ...or, register icons and pull the fonts from your own CDN:
   initializeIcons('https://my.cdn.com/path/to/icons/');
   ```

This will make ALL icons in the collection available, but will download them on demand when referenced using the `Icon` component.

### Next steps

If you are using Fabric React components that have icons, you can make all icons available by calling the `initializeIcons` function from the `@uifabric/icons` package.

1. Install the `@uifabric/icons` npm package.

   ```bash
   npm install @uifabric/icons
   ```

2. Import `initializeIcons` function and then call it within your App.

   ```tsx
   import { initializeIcons } from '@uifabric/icons';

   // Register icons and pull the fonts from the default SharePoint CDN:
   initializeIcons();

   // ...or, register icons and pull the fonts from your own CDN:
   initializeIcons('https://my.cdn.com/path/to/icons/');
   ```

This will make ALL icons in the collection available, but will download them on demand when referenced using the `Icon` component.
