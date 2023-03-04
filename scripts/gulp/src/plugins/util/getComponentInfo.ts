import * as Babel from '@babel/core';
import * as t from '@babel/types';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import { BehaviorInfo, ComponentInfo, ComponentProp } from './docs-types';
import * as docgen from './docgen';
import parseDefaultPropsValues from './parseDefaultPropsValues';
import parseDocblock from './parseDocblock';
import parseType from './parseType';
import getShorthandInfo from './getShorthandInfo';
import { getProgram, loadFiles } from './tsLanguageService';
import { Program } from 'typescript';

export type GetComponentInfoOptions = {
  /** Path to the file containing a single component. */
  filePath: string;
  /** Path to the tsconfig to use for processing the component file. */
  tsconfigPath: string;
  /** Ignore props inherited from these interfaces. */
  ignoredParentInterfaces?: string[];
};

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

export default function getComponentInfo(options: GetComponentInfoOptions): ComponentInfo {
  const { filePath, ignoredParentInterfaces, tsconfigPath } = options;
  const absPath = path.resolve(process.cwd(), filePath);

  const dir = path.dirname(absPath);
  const dirname = path.basename(dir);
  const filename = path.basename(absPath);
  const filenameWithoutExt = path.basename(absPath, path.extname(absPath));

  // singular form of the component's ../../ directory
  // "element" for "src/elements/Button/Button.js"
  const componentType = path.basename(path.dirname(dir)).replace(/s$/, '') as ComponentInfo['type'];

  loadFiles([filePath]);

  const components = docgen.parseWithProgramProvider(absPath, {}, {}, () => getProgram(tsconfigPath) as Program);

  if (!components.length) {
    throw new Error(`Could not find a component definition in "${filePath}".`);
  }
  if (components.length > 1) {
    throw new Error(
      [
        `Found more than one component definition in "${filePath}".`,
        'This is currently not supported, please ensure your module only defines a single React component.',
      ].join(' '),
    );
  }

  const info: docgen.ComponentDoc = components[0];
  const componentAst = Babel.parse(fs.readFileSync(absPath).toString(), {
    configFile: false,
    presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]],
  }) as t.File;

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
  // for example, "Menu" for "ToolbarMenu" since it is accessed as "Toolbar.Menu" in the API
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
  const componentClassName = (
    isChild
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

  const defaultProps = parseDefaultPropsValues({
    componentAst,
    componentName: info.displayName,
    props: info.props,
  });
  let props: ComponentProp[] = [];

  _.forEach(info.props, (propDef: docgen.PropItem, propName: string) => {
    const { description, tags } = parseDocblock(propDef.description);
    const parentInterface = _.get(propDef, 'parent.name');

    // `propDef.parent` should be defined to avoid insertion of computed props
    const visibleInDefinition = propDef.parent && !_.includes(ignoredParentInterfaces, parentInterface);
    const visibleInTags = !_.find(tags, { title: 'docSiteIgnore' });

    if (visibleInDefinition && visibleInTags) {
      const types = parseType(componentAst, info.displayName, propName, propDef);

      props.push({
        description,
        defaultValue: defaultProps[propName],
        tags,
        types: types,
        name: propName,
        required: propDef.required,
        resolvedType: propDef.resolvedType,
      });
    }
  });

  // manually insert `as` prop
  if (info.props.as) {
    props.push({
      description: 'An element type to render as (string or component).',
      defaultValue: defaultProps.as,
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
    ...getShorthandInfo(componentAst, info.displayName),
    apiPath,
    behaviors,
    componentClassName,
    constructorName: info.displayName,
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
}
