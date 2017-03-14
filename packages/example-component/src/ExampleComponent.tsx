/**
* ExampleComponent.tsx
* Author:
* Copyright: Microsoft 2016
*
* Type definitions to support the plugin.
*/

import * as React from 'react';
import {
  BaseComponent,
  IRenderFunction,
  getNativeProps,
  buttonProperties,
  anchorProperties,
  css
} from '@uifabric/utilities';
import { IExampleComponentProps } from './ExampleComponent.Props';
let styles = require<any>('./ExampleComponent.scss');

/**
 * Example component implementation which renders the skeleton of a Button component.
 *
 * @export
 * @class ExampleComponent
 * @extends {BaseComponent<IExampleComponentProps, {}>}
 */
export class ExampleComponent extends BaseComponent<IExampleComponentProps, {}> {

  public render() {
    let {
      onRenderRoot = this._onRenderRoot
    } = this.props;

    return onRenderRoot(this.props, this._onRenderRoot);
  }

  private _onRenderRoot = (props: IExampleComponentProps): JSX.Element => {
    let { className, href } = this.props;

    if (!!href) {
      let anchorProps = getNativeProps<React.HTMLProps<HTMLAnchorElement>>(this.props, anchorProperties);

      return (
        <a
          { ...anchorProps }
          className={ css(styles.root, className) }
          { ...{ children: this._onRenderChildren() } }
        />
      );
    } else {
      let buttonProps = getNativeProps(this.props, anchorProperties);

      return (
        <button
          { ...buttonProps }
          className={ css(styles.button).toString() }
          { ...{ children: this._onRenderChildren() } }
        />
      );
    }
  };

  private _onRenderChildren() {
    let {
      children,
      onRenderIcon = this._onRenderIcon,
      onRenderText = this._onRenderText,
      onRenderChevron = this._onRenderChevron
    } = this.props;

    return (
      <div className={ css(styles.flexContainer).toString() }>
        { onRenderIcon(this.props, this._onRenderIcon) }
        { onRenderText(this.props, this._onRenderText) }
        { onRenderChevron(this.props, this._onRenderChevron) }
        { children }
      </div>
    );
  }

  private _onRenderIcon = (props: IExampleComponentProps): JSX.Element => {

    return <i className={ 'ms-Icon ms-Icon--Mail ' + css(styles.icon).toString() } />;
  }

  private _onRenderText = (props: IExampleComponentProps): JSX.Element => {
    return <div className={ css(styles.text).toString() }>{ props.text }</div>;
  }

  private _onRenderChevron = (props: IExampleComponentProps): JSX.Element => {
    return <i className={ 'ms-Icon ms-Icon--ChevronDown ' + css(styles.chevron).toString() } />;
  }
}
