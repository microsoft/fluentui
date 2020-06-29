import * as Babel from '@babel/core';
import * as t from '@babel/types';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import { BehaviorInfo, ComponentInfo, ComponentProp } from './docs-types';
import * as docgen from './docgen';
import parseDefaultValue from './parseDefaultValue';
import parseDocblock from './parseDocblock';
import parseType from './parseType';
import getShorthandInfo from './getShorthandInfo';

const getAvailableBehaviors = (accessibilityProp: ComponentProp | undefined): BehaviorInfo[] | undefined => {
  const docTags = accessibilityProp && accessibilityProp.tags;
  const availableTag = _.find(docTags, { title: 'available' });
  const availableBehaviorNames = _.get(availableTag, 'description', '');

  if (!availableBehaviorNames) {
    return undefined;
  }

  return availableBehaviorNames
    .replace(/\s/g, '')
    .split(',')
    .map(name => ({
      name,
      displayName: _.upperFirst(name.replace('Behavior', '')),
      category: _.upperFirst(name.split(/(?=[A-Z])/)[0]),
    }));
};

const getComponentInfo = (tsConfigPath: string, filepath: string, ignoredParentInterfaces: string[]): ComponentInfo => {
  const absPath = path.resolve(process.cwd(), filepath);

  const dir = path.dirname(absPath);
  const dirname = path.basename(dir);
  const filename = path.basename(absPath);
  const filenameWithoutExt = path.basename(absPath, path.extname(absPath));

  // singular form of the component's ../../ directory
  // "element" for "src/elements/Button/Button.js"
  const componentType = path.basename(path.dirname(dir)).replace(/s$/, '') as ComponentInfo['type'];

  const components = docgen.withCustomConfig(tsConfigPath, {}).parse(absPath);

  if (!components.length) {
    throw new Error(`Could not find a component definition in "${filepath}".`);
  }
  if (components.length > 1) {
    throw new Error(
      [
        `Found more than one component definition in "${filepath}".`,
        'This is currently not supported, please ensure your module only defines a single React component.',
      ].join(' '),
    );
  }
  const info: docgen.ComponentDoc = components[0];

  // add exported Component info
  //
  // this 'require' instruction might break by producing partially initialized types - because of ts-node module's cache used during processing
  // - in that case we might consider to disable ts-node cache when running this command: https://github.com/ReactiveX/rxjs/commit/2f86b9ddccbf020b2e695dd8fe0b79194efa3f56
  const Component = require(absPath).default;

  if (!Component) {
    throw new Error(`Your file with component under "${absPath}" doesn't have a default export`);
  }

  const componentFile = Babel.parse(fs.readFileSync(absPath).toString(), {
    configFile: false,
    presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
  }) as t.File;
  const constructorName = _.get(Component, 'prototype.constructor.name', null);

  // add component type
  let type = componentType;
  // add parent/child info
  let isParent = filenameWithoutExt === dirname;

  // Tweak for Ref component as it is distributed as a separate package
  if (info.displayName === 'Ref') {
    type = 'component';
    isParent = true;
  }

  const isChild = !isParent;
  const parentDisplayName = isParent ? null : dirname;
  // "Field" for "FormField" since it is accessed as "Form.Field" in the API
  const subcomponentName = isParent ? null : info.displayName.replace(parentDisplayName!, '');

  // "ListItem.js" is a subcomponent is the "List" directory
  const subcomponentRegExp = new RegExp(`^${dirname}\\w+\\.tsx$`);
  const subcomponents = isParent
    ? fs
        .readdirSync(dir)
        .filter(file => subcomponentRegExp.test(file))
        .map(file => path.basename(file, path.extname(file)))
    : null;

  // where this component should be exported in the api
  const apiPath = isChild ? `${parentDisplayName}.${subcomponentName}` : info.displayName;

  // class name for the component
  // example, the "button" in class="ui-button"
  // name of the component, sub component, or plural parent for sub component groups
  const componentClassName = (isChild
    ? _.includes(subcomponentName, 'Group')
      ? `ui-${parentDisplayName}s`
      : `ui-${parentDisplayName}__${subcomponentName}`
    : `ui-${info.displayName}`
  ).toLowerCase();

  // replace the component.description string with a parsed docblock object
  const docblock = parseDocblock(info.description);

  // file and path info
  const repoPath = absPath
    .replace(`${process.cwd()}${path.sep}`, '')
    .replace(new RegExp(_.escapeRegExp(path.sep), 'g'), '/');

  let props: ComponentProp[] = [];

  _.forEach(info.props, (propDef: docgen.PropItem, propName: string) => {
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
        required: propDef.required,
      });
    }
  });

  // manually insert `as` prop
  if (info.props.as) {
    props.push({
      description: 'An element type to render as (string or component).',
      defaultValue: parseDefaultValue(Component, info.props.as, []) || 'div',
      tags: [],
      types: [{ name: 'React.ElementType' }],
      name: 'as',
      required: false,
    });
  }

  // sort props
  props = _.sortBy(props, 'name');

  // available behaviors
  const behaviors = getAvailableBehaviors(_.find(props, { name: 'accessibility' }));

  return {
    ...getShorthandInfo(componentFile, info.displayName),
    apiPath,
    behaviors,
    componentClassName,
    constructorName,
    displayName: info.displayName,
    docblock,
    filename,
    filenameWithoutExt,
    isChild,
    isParent,
    parentDisplayName,
    props,
    repoPath,
    subcomponentName,
    subcomponents,
    type,
  };
};

export default getComponentInfo;
