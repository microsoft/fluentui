import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import type { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';

/**
 * A component corresponding the content rendered inside the callout of the keytip component.
 * {@docCategory Keytips}
 */
export class KeytipContentBase extends React.Component<IKeytipProps, {}> {
  public render(): JSX.Element {
    const { content, styles, theme, disabled, visible } = this.props;

    const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>();
    const classNames = getClassNames(styles!, {
      theme: theme!,
      disabled,
      visible,
    });

    return (
      <div className={classNames.container}>
        <span className={classNames.root}>{content}</span>
      </div>
    );
  }
}
