import * as React from 'react';
import { BaseComponent, classNamesFunction, customizable } from '../../Utilities';
import { convertSequencesToKeytipID } from '../../utilities/keysequence/IKeySequence';
import { IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';

/**
 * A component corresponding the the content rendered inside the callout of the keytip component.
 *
 * @export
 * @class KeytipContent
 * @extends {BaseComponent<IKeytipProps>}
 */
@customizable('KeytipContent', ['theme'])
export class KeytipContentBase extends BaseComponent<IKeytipProps, {}> {

  public render(): JSX.Element {
    const {
      content,
      getStyles,
      theme,
      disabled,
      keySequences,
      visible
      } = this.props;

    const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>();
    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        disabled,
        visible
      }
    );

    return (
      <div className={ classNames.container } >
        <span id={ convertSequencesToKeytipID(keySequences) } className={ classNames.root }>{ content }</span>
      </div >
    );
  }
}