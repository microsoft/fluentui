import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';

/**
 * A component corresponding the the content rendered inside the callout of the keytip component.
 *
 * @export
 * @class KeytipContent
 * @extends {BaseComponent<IKeytipProps>}
 */
export class KeytipContentBase extends BaseComponent<IKeytipProps, {}> {
  public render(): JSX.Element {
    const { content, styles, theme, disabled, visible } = this.props;

    const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>();
    const classNames = getClassNames(styles!, {
      theme: theme!,
      disabled,
      visible
    });

    return (
      <div className={classNames.container}>
        <span className={classNames.root}>{content}</span>
      </div>
    );
  }
}
