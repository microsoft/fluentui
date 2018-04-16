# Advanced usage

## Notes on module vs path-based imports

While it is possible to import all components as named imports from the main module entry point, it is not recommended to do so without using a bundler that supports es6 tree shaking. In other words, if you import the Button component like this:

```typescript
import { Button } from 'office-ui-fabric-react';
```

...this would work, but then unless you are using a tree-shaking bundler such as Rollup.js or Webpack 2, Webpack will assume you want every module exported from the main entry file to be included in your final bundle, which produces unnecessary large bundles and slows your page load down. Instead you can import the specific paths to trim down your bundle size:

```typescript
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { List } from 'office-ui-fabric-react/lib/List';
```

## Using an AMD bundler like r.js

If your project relies on AMD modules, they are dropped in the lib-amd folder. You will need to set up your bundler to handle the imports correctly. This may require you to symlink or copy the folder into your pre-bundle location.

## Deployment
We have now created an external deployment task for deploying your branch via FTP. There are no credentials in this deployment and using this feature will require your own web/FTP service.

### Getting started
In order to use the deployment feature, you have to run `gulp install-deploy`. Gulp will then prompt you with the information needed to get the deployment up and running. After that, the task will create a file in the root of your project called `ftpconfig.json`. You will need to provide:

1. Hostname `ftp.example.com`
2. Ftp Username `ftpuserexample`
3. Ftp Password `ftpSuperSecretPassword1`
4. Deployment Base URL `http://example.com/website-subfolder/`
5. FTP server file path `/wwwroot/base/path/website-subfolder/`
6. Secure connection `true`
7. Idle timeout `1000`

After the install is complete, run `gulp deploy`. This task will build the entire project and deploy it to your ftp server and provide a URL corresponding to the location of the files on your server.

### Issues
If you run into any issues you can open up `ftpconfig.json` in the root and double check all the credentials and information. You can make direct edits to the file, save, and re-run `gulp deploy`. You can also re-run `gulp install-deploy` and enter in all the prompted values if you'd like to start fresh.

### More information about each property

#### Hostname
Hostname is generally your domain name like `example.com` or `ftp.example.com`.

#### FTP Username
This is the FTP username provided by your web hosting service.

#### FTP Password
Your FTP password.

#### Deployment base URL
This will be the base URL for accessing your deployed files. Gulp will take this URL, combine it with your machine and branch name and print out a complete unique URL to the location of your React project on your web server.

#### Deployment Base Path
The deployment base path is the physical file path on your server where you want Fabric React to create new folders to upload your branch and project files.

#### Secure connection
If you need the connection to be secure choose yes.

#### Idle timeout
Time in milliseconds to keep the connection open while no uploads are happening.
