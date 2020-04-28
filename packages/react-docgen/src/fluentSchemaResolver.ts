import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

import { ComponentProp, FluentComponentInfo } from '@fluentui/react-docgen-types';
import {
  parseDefaultValue,
  getMappedShorthandProp,
  getFluentApiPathInfo,
  getFluentComponentClassName,
} from './utils/index';
import { ComponentInfoSchemaResolver } from './getComponentInfo';

function getAvailableBehaviors(accessibilityProp: ComponentProp | undefined): FluentComponentInfo['behaviors'] {
  const docTags = accessibilityProp && accessibilityProp.tags;
  const availableTag = _.find(docTags, { title: 'available' });
  const availableBehaviorNames = availableTag?.description ?? '';

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
}

export const fluentSchemaResolver: ComponentInfoSchemaResolver<FluentComponentInfo> = params => {
  const { absPath, componentDoc, componentFile, Component, sharedComponentInfo } = params;
  const { displayName } = sharedComponentInfo;

  const dir = path.dirname(absPath);
  const dirname = path.basename(dir);

  const apiPathInfo = getFluentApiPathInfo(displayName, absPath, sharedComponentInfo);

  // add component type
  // singular form of the component's ../../ directory
  // "component" for "packages/fluentui/react-northstar/src/components/Button/Button.tsx"
  let type = path.basename(path.dirname(dir)).replace(/s$/, '');
  // Tweak for Ref component as it is distributed as a separate package
  if (displayName === 'Ref') {
    type = 'component';
    apiPathInfo.isParent = true;
  }

  // "ListItem.js" is a subcomponent is the "List" directory
  const subcomponentRegExp = new RegExp(`^${dirname}\\w+\\.tsx$`);
  const subcomponents = apiPathInfo.isParent
    ? fs
        .readdirSync(dir)
        .filter(file => subcomponentRegExp.test(file))
        .map(file => path.basename(file, path.extname(file)))
    : undefined;

  // manually insert `as` prop
  let props = sharedComponentInfo.props;
  if (componentDoc.props.as) {
    props.push({
      description: 'An element type to render as (string or component).',
      defaultValue: parseDefaultValue(Component, componentDoc.props.as, []) || 'div',
      tags: [],
      types: [{ name: 'React.ElementType' }],
      name: 'as',
      required: false,
    });
  }
  props = _.sortBy(props, 'name');

  // tslint:disable:no-any
  const componentClassName =
    (Component as any).className ||
    (Component as any).deprecated_className ||
    getFluentComponentClassName(displayName, apiPathInfo);
  // tslint:enable:no-any

  return {
    ...sharedComponentInfo,
    ...apiPathInfo,
    props,
    type,
    subcomponents,
    componentClassName,
    mappedShorthandProp: getMappedShorthandProp(componentFile, displayName),
    behaviors: getAvailableBehaviors(_.find(sharedComponentInfo.props, { name: 'accessibility' })),
  };
};
