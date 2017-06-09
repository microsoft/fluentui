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
  getNativeProps,
  buttonProperties,
  anchorProperties,
  css
} from '@uifabric/utilities';
import { IExampleComponentProps } from './ExampleComponent.Props';

/* tslint:disable:no-any */
import * as stylesImport from './ExampleComponent.scss';
const styles: any = stylesImport;
/* tslint:enable:no-any */

/**
 * Example component implementation which renders the skeconston of a Button component.
 *
 * @export
 * @class ExampleComponent
 * @extends {BaseComponent<IExampleComponentProps, {}>}
 */
export class ExampleComponent extends BaseComponent<IExampleComponentProps, {}> {

  public render(): JSX.Element | null {
    const {
      onRenderRoot = this._onRenderRoot
    } = this.props;

    return onRenderRoot(this.props, this._onRenderRoot);
  }

  private _onRenderRoot = (props: IExampleComponentProps): JSX.Element => {
    const { className, href }: IExampleComponentProps = this.props;

    if (!!href) {
      const anchorProps: React.HTMLAttributes<HTMLAnchorElement> =
        getNativeProps(this.props, anchorProperties);

      return (
        <a
          { ...anchorProps }
          className={ css(styles.root, className) }
          { ...{ children: this._onRenderChildren() } }
        />
      );
    } else {
      const buttonProps: React.HTMLAttributes<HTMLButtonElement> =
        getNativeProps(this.props, buttonProperties);

      return (
        <button
          { ...buttonProps }
          className={ css(styles.button).toString() }
          { ...{ children: this._onRenderChildren() } }
        />
      );
    }
  }

  private _onRenderChildren(): JSX.Element {
    const {
      children,
      onRenderIcon = this._onRenderIcon,
      onRenderText = this._onRenderText,
      onRenderChevron = this._onRenderChevron
    } = this.props;

    return (
      <div className={ css(styles.flexContainer).toString() }>
        { onRenderIcon(this.props, this._onRenderIcon) }
        { onRenderText(this.props, this._onRenderText) }
        { children }
        { onRenderChevron(this.props, this._onRenderChevron) }
      </div>
    );
  }

  private _onRenderIcon = (props: IExampleComponentProps): JSX.Element => {

    return <i className={ 'ms-Icon ms-Icon--Mail ' + css(styles.icon).toString() } />;
  }

  private _onRenderText = (props: IExampleComponentProps): JSX.Element | null => {
    return !!props.text ? (
      <div className={ css(styles.text).toString() }>{ props.text }</div>
    ) : null;
  }

  private _onRenderChevron = (props: IExampleComponentProps): JSX.Element => {
    return <i className={ 'ms-Icon ms-Icon--ChevronDown ' + css(styles.chevron).toString() } />;
  }
}
