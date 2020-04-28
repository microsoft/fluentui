import * as fs from 'fs-extra';
import * as path from 'path';
import * as glob from 'glob';
import _ from 'lodash';

import { componentsSrcByPackage } from './constants';
import config from '../config';
import { getAllComponentInfo, fluentSchemaResolver } from '@fluentui/react-docgen';

const { paths } = config;

export function writeComponentInfo() {
  // Get resolved globs of files by package path
  const filePathsByPackage = _.chain(componentsSrcByPackage)
    .map((packageName, relativeGlob): [string, string[]] => [
      paths.packages(packageName),
      glob.sync(paths.posix.packages(packageName, relativeGlob)),
    ])
    .fromPairs()
    .value();

  const componentInfos = getAllComponentInfo({
    filePathsByPackage,
    schemaResolver: fluentSchemaResolver,
    ignoredParentInterfaces: ['DOMAttributes', 'HTMLAttributes'],
  });

  for (const info of componentInfos) {
    fs.writeJSONSync(path.basename(info.filenameWithoutExt) + '.info.json', info, { spaces: 2 });
  }
}
