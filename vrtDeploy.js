let fs = require('vinyl-fs');
let ftp = require('vinyl-ftp');
let minimist = require('minimist');

let args = minimist(process.argv.slice(2));

let conn = new ftp({
  host: 'waws-prod-bay-049.ftp.azurewebsites.windows.net',
  user: args.user,
  password: args.password
});

fs.src(['./packages/office-ui-fabric-react/visualtests/baseline/*.png'], { buffer: false })
  .pipe(conn.dest('/site/wwwroot/mgodbolt/vrt/'));

