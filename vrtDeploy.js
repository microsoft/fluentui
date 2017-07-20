const fs = require('vinyl-fs');
const ftp = require('vinyl-ftp');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const dest = path.join('/site/wwwroot/mgodbolt/vrt/', args.pull || './');
const conn = new ftp({
  host: 'waws-prod-bay-049.ftp.azurewebsites.windows.net',
  user: args.user,
  password: args.password
});

fs.src(['./packages/office-ui-fabric-react/visualtests/baseline/*.png'], { buffer: false })
  .pipe(conn.dest(dest));
