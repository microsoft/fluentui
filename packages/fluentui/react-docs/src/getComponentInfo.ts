import * as Babel from '@babel/core';
import * as fs from 'fs';
import * as path from 'path';
import * as t from '@babel/types';
import * as _ from 'lodash';
import { ComponentDoc, parse, PropItem } from 'react-docgen-typescript';

import parseType from './parseType';
import parseDefaultValue from './parseDefaultValue';
import { ComponentInfo, ComponentProp, FileInfo } from './types';
import parseDocblock from './parseDocblock';

const getFileInfo = (filepath: string): FileInfo => {
  const absPath = path.resolve(process.cwd(), filepath);
  const dir = path.dirname(absPath);
  const dirname = path.basename(dir);
  const filename = path.basename(absPath);
  const filenameWithoutExt = path.basename(absPath, path.extname(absPath));
  const components = parse(absPath);

  if (!components.length) {
    throw new Error(`Could not find a component definition in "${filepath}".`);
  }
  if (components.length > 1) {
    throw new Error(
      [
        `Found more than one component definition in "${filepath}".`,
        'This is currently not supported, please ensure your module only defines a single React component.'
      ].join(' ')
    );
  }

  const info: ComponentDoc = components[0];

  return {
    absPath,
    dir,
    dirname,
    filename,
    filenameWithoutExt,
    info
  };
};

const getComponentInfoDefaultSchema = (filepath: string, ignoredParentInterfaces: string[] = []): ComponentInfo => {
  const { absPath, dir, filename, filenameWithoutExt, info } = getFileInfo(filepath);

  const componentFile = Babel.parse(fs.readFileSync(absPath).toString(), {
    configFile: false,
    presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]]
  }) as t.File;

  // add exported Component info
  // this 'require' instruction might break by producing partially initialized types - because of ts-node module's cache used during processing
  // - in that case we might consider to disable ts-node cache when running this command: https://github.com/ReactiveX/rxjs/commit/2f86b9ddccbf020b2e695dd8fe0b79194efa3f56
  const Component = require(absPath).default;

  if (!Component) {
    throw new Error(`Your file with component under "${absPath}" doesn't have a default export`);
  }

  // Create props definition for this component.
  let props: ComponentProp[] = [];

  _.forEach(info.props, (propDef: PropItem, propName: string) => {
    const { description, tags } = parseDocblock(propDef.description);
    const parentInterface = _.get(propDef, 'parent.name');

    // `propDef.parent` should be defined to avoid insertion of computed props
    const visibleInDefinition = propDef.parent && !_.includes(ignoredParentInterfaces, parentInterface);
    const visibleInTags = !_.find(tags, { title: 'docSiteIgnore' });

    if (visibleInDefinition && visibleInTags) {
      const types = parseType(componentFile, info.displayName, propName, propDef);
      const defaultValue = parseDefaultValue(Component, propDef, types);

      props.push({
        description,
        defaultValue,
        tags,
        types,
        name: propName,
        required: propDef.required
      });
    }
  });

  // sort props
  props = _.sortBy(props, 'name');

  const constructorName = _.get(Component, 'prototype.constructor.name', null);

  // replace the component.description string with a parsed docblock object
  const docblock = parseDocblock(info.description);

  // file and path info
  const repoPath = absPath.replace(`${process.cwd()}${path.sep}`, '').replace(new RegExp(_.escapeRegExp(path.sep), 'g'), '/');

  // singular form of the component's ../../ directory
  // "element" for "src/elements/Button/Button.js"
  const componentType = path.basename(path.dirname(dir)).replace(/s$/, '') as ComponentInfo['type'];

  // add component type
  let type = componentType;

  return {
    constructorName,
    Component,
    displayName: info.displayName,
    docblock,
    filename,
    filenameWithoutExt,
    props,
    repoPath,
    type
  };
};

const getComponentInfo = <T extends ComponentInfo>(
  filepath: string,
  ignoredParentInterfaces: string[] = [],
  schemaResolver?: (fileInfo: FileInfo, ignoredParentInterfaces: string[], componentInfo: ComponentInfo) => T
): T | ComponentInfo => {
  const componentInfo = getComponentInfoDefaultSchema(filepath, ignoredParentInterfaces);
  if (schemaResolver) {
    const fileInfo = getFileInfo(filepath);
    return schemaResolver(fileInfo, (ignoredParentInterfaces = []), componentInfo);
  }

  return componentInfo;
};

export default getComponentInfo;
