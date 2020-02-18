import fs from 'fs';
import through2 from 'through2';

import config from '../../config';
import sh from '../sh';

const insideGitRepo = fs.existsSync(config.paths.base('.git'));

export default () =>
  through2.obj((file, enc, done) => {
    sh(`doctoc ${file.path} --github --maxlevel 4`)
      .then(() => insideGitRepo && sh(`git add ${file.path}`))
      .then(() => {
        done(null, file);
      })
      .catch(done);
  });
