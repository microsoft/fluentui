import * as _ from 'lodash';
import * as React from 'react';

import { createComponentInternal } from './createComponentInternal';
import type {
  ComponentSlotClasses,
  ReactAccessibilityBehavior,
  AccessibilityActionHandlers,
} from '@fluentui/react-bindings';
import type { ComponentSlotStylesResolved } from '@fluentui/styles';
import type { CreateComponentReturnType } from './createComponentInternal';
import type { ObjectOf } from '../types';

export interface CreateComponentRenderConfig {
  accessibility: ReactAccessibilityBehavior;
  classes: ComponentSlotClasses;
  rtl: boolean;
  styles: ComponentSlotStylesResolved;
}

export interface CreateComponentConfig<P> {
  displayName: string;
  className?: string;
  render: (props: P & { config: CreateComponentRenderConfig }) => React.ReactNode;
  defaultProps?: any;
  actionHandlers?: AccessibilityActionHandlers;
}

export const createComponent = <P extends ObjectOf<any> = any>({
  displayName,
  className,
  render,
  defaultProps,
  actionHandlers,
}: CreateComponentConfig<P>): CreateComponentReturnType<P> => {
  return createComponentInternal<P>({
    displayName,
    className,
    render: (config, props) => {
      const filteredConfig = _.pick(config, ['accessibility', 'classes', 'rtl', 'styles']);
      return render({ config: filteredConfig, ...props });
    },
    defaultProps,
    actionHandlers,
  });
};
