import _ from 'lodash';
import * as React from 'react';

import { ComponentPropType } from './docs-types';
import { PropItem } from './docgen';

const parseDefaultValue = (Component: React.ComponentType, propDef: PropItem, types: ComponentPropType[]) => {
  if (Component.defaultProps && _.has(Component.defaultProps, propDef.name)) {
    const defaultValue = Component.defaultProps[propDef.name];

    if (_.isFunction(defaultValue)) {
      return defaultValue.name;
    }

    if (_.isNumber(defaultValue) || _.isString(defaultValue) || _.isBoolean(defaultValue)) {
      return defaultValue;
    }

    if (_.isPlainObject(defaultValue) || _.isArray(defaultValue)) {
      return defaultValue;
    }

    if (_.isNull(defaultValue)) {
      return null;
    }

    throw new Error(`Can't parse a value in "${Component.name}.defaultProps.${propDef.name}"`);
  }

  if (propDef.name === 'as') {
    return 'div';
  }

  if (types.length === 1 && types[0].name === 'boolean') {
    return false;
  }

  return undefined;
};

export default parseDefaultValue;
