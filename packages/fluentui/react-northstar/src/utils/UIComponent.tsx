import { AccessibilityActionHandlers } from '@fluentui/react-bindings';
import * as React from 'react';
import * as _ from 'lodash';
// @ts-ignore We have this export in package, but it is not present in typings
import { ThemeContext } from 'react-fela';

import { ProviderContextPrepared } from '../types';
import renderComponent, { RenderResultConfig } from './renderComponent';

// TODO @Bugaa92: deprecated by createComponent.tsx
class UIComponent<P, S = {}> extends React.Component<P, S> {
  readonly childClass = this.constructor as typeof UIComponent;
  static defaultProps: { [key: string]: any };
  static displayName: string;
  static deprecated_className: string;

  static contextType = ThemeContext;
  static propTypes: any;

  /** Array of props to exclude from list of handled ones. */
  static unhandledProps: string[] = [];

  static _handledPropsCache: string[] = undefined;
  static get handledProps() {
    if (!this._handledPropsCache) {
      this._handledPropsCache = _.difference(_.keys(this.propTypes), this.unhandledProps).sort();
    }

    return this._handledPropsCache;
  }

  actionHandlers: AccessibilityActionHandlers;
  context: ProviderContextPrepared;

  // stores debug information
  fluentUIDebug: any = null;

  constructor(props, context) {
    super(props, context);
    if (process.env.NODE_ENV !== 'production') {
      const child = this.constructor;
      const childName = child.name;

      if (typeof this.renderComponent !== 'function') {
        throw new Error(`${childName} extending UIComponent is missing a renderComponent() method.`);
      }
    }

    this.renderComponent = this.renderComponent.bind(this);
  }

  isFirstRenderRef: React.MutableRefObject<boolean> = { current: true };

  renderComponent(config: RenderResultConfig<P>): React.ReactNode {
    throw new Error('renderComponent is not implemented.');
  }

  render() {
    return renderComponent(
      {
        className: this.childClass.deprecated_className,
        displayName: this.childClass.displayName,
        handledProps: this.childClass.handledProps,
        props: this.props,
        state: this.state,
        actionHandlers: this.actionHandlers,
        render: this.renderComponent,
        saveDebug: updatedDebug => (this.fluentUIDebug = updatedDebug),
        isFirstRenderRef: this.isFirstRenderRef,
      },
      this.context,
    );
  }
}

export default UIComponent;
