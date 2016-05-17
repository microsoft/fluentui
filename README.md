# Office UI Fabric for React

#### Getting Started

The office-ui-fabric-react repo uses internal NPM to consume private packages. To get this working, you need to follow the below instructions to access @ms scoped npm packages.

Once you have set these up, the repo Is tested like this:

```
git clone https://onedrive.visualstudio.com/DefaultCollection/Design/_git/office-ui-fabric-react

cd office-ui-fabric-react

npm install

gulp serve
```
**Email dzearing@microsoft.com if you have issues**

#### Private NPM access instructions

**NOTE:** this assumes that you have installed NPM and can access it on the command line. These

Private packages are not stored in public npm, but install in our internal artifactory instance. Private packages are scoped using @ms/ prefix, you will see this in import statements as well as in package.json dependency lists. (e.g. import '@ms/odsp-utilities')

In order to use private NPM modules, your .npmrc file needs to be able to resolve the @ms scope to the right artifactory (private npm repository) url with the right auth key. Follow these steps to get that set up:

1. Set up an artifactory password here: https://msblox.azurewebsites.net/Profile
2. Go to this url: [http://cxovm01.cloudapp.net/artifactory/webapp/#/artifacts/browse/tree/General/**npm-virtual**](http://cxovm01.cloudapp.net/artifactory/webapp/#/artifacts/browse/tree/General/npm-virtual)
3. NOTE if you are publishing packages and not just downloading them, use this URL instead (replace "virtual" with "local"): [http://cxovm01.cloudapp.net/artifactory/webapp/#/artifacts/browse/tree/General/**npm-local**](http://cxovm01.cloudapp.net/artifactory/webapp/#/artifacts/browse/tree/General/npm-local)
4. It may prompt you for a username/password. Click “SSO login”
5. Once signed in, click your username in top right to go to profile, enter password, expose the API key. Copy the API key.
6. Ensure you have the "curl" utility available at command line. Mac users should have the "curl" tool available by default, but Windows users may need to install it from here: [http://www.confusedbycode.com/curl/](http://www.confusedbycode.com/curl/)
7. On the command line, run curl to get your npm settings. Replace the username with your email (yourname@microsoft.com) and use the api key previously copied. NOTE that there is no space between the -u and username.

```
curl -i -u<username>:<api key> http://cxovm01.cloudapp.net/artifactory/api/npm/npm-virtual/auth/ms
```

**NOTE:** again if you're publishing packages, you will need to replace "virtual" above with "local"

This should return something like:
```
@ms:registry=http://cxovm01.cloudapp.net/artifactory/api/npm/npm-virtual/
//cxovm01.cloudapp.net/artifactory/api/npm/npm-virtual/:_password=XXXCYmN5d3VMamZ5eG9nREd5Y1Z0aGVlbmRn
//cxovm01.cloudapp.net/artifactory/api/npm/npm-virtual/:username=dzearing@microsoft.com
//cxovm01.cloudapp.net/artifactory/api/npm/npm-virtual/:email=dzearing@microsoft.com
//cxovm01.cloudapp.net/artifactory/api/npm/npm-virtual/:always-auth=true
```

You need to copy this and add it to your global .npmrc:
```
Windows:
                C:\Users\<username>\.npmrc
Mac:
                ~/.npmrc
```

NOTE: if the file doesn't exist, create one.

Once you're done, you should be able to install modules from the BLOX repository:

npm install --save @ms/office-ui-fabric-react

