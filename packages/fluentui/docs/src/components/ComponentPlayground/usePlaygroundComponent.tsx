import * as FluentUI from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

import { ComponentInfo } from '../../types';
import componentInfoContext from '../../utils/componentInfoContext';

import createHookGenerator from './createHookGenerator';

const usePlaygroundComponent = (componentName: string): [React.ReactElement, string[]] => {
  const context = FluentUI.useFluentContext();
  const componentInfo: ComponentInfo = componentInfoContext.byDisplayName[componentName];

  if (process.env.NODE_ENV !== 'production') {
    if (!componentInfo) {
      throw new Error(
        `Cannot find a definition for "${componentName}", please check that "docs/src/componentInfo/${componentName}.info.json" file exists`,
      );
    }

    if (!FluentUI[componentName]) {
      throw new Error(
        `Cannot find an export for "${componentName}", please check that it is exported from "@fluentui/react-northstar"`,
      );
    }
  }

  const propValues: Record<string, any> = {};
  const unsupportedProps: string[] = [];

  componentInfo.props.forEach(propDef => {
    const hookDefinition = createHookGenerator({
      componentInfo,
      propName: propDef.name,
      propDef,
      theme: context.theme,
    });

    if (hookDefinition) {
      const { hook, ...options } = hookDefinition;
      const [propValue] = hook(options);

      if (_.isNil(propValue) || propValue === '') {
        return;
      }

      propValues[propDef.name] = propValue;

      return;
    }

    unsupportedProps.push(propDef.name);
  });

  const element = React.createElement(FluentUI[componentName], propValues);

  return [element, unsupportedProps];
};

export default usePlaygroundComponent;
