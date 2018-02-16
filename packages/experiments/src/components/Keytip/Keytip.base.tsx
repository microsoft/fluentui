import * as React from 'react';
import { IKeytip, IKeytipProps, IKeytipStyleProps, IKeytipStyles } from './Keytip.types';
import {
  // autobind,
  BaseComponent,
  customizable
} from '../../Utilities';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { getCalloutStyles } from './Keytip.styles';
import { classNamesFunction } from '../../Utilities';
import { convertSequencesToKeytipID } from '../../utilities/keysequence/IKeySequence';
import { constructKeytipTargetFromSequences } from '../../utilities/keytip/KeytipUtils';

const getClassNames = classNamesFunction<IKeytipStyleProps, IKeytipStyles>();

export interface IKeytipState {
  visible?: boolean;
}

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 *
 * @export
 * @class Keytip
 * @extends {BaseComponent<IKeytipProps, IKeytipState>}
 */
@customizable('Keytip', ['theme'])
export class KeytipBase extends BaseComponent<IKeytipProps, IKeytipState> implements IKeytip {
  public static defaultProps: Partial<IKeytipProps> = {
    visible: false
  };

  private _classNames: {[key in keyof IKeytipStyles]: string };

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipProps, context: any) {
    super(props, context);
  }

  public render(): JSX.Element {
    const {
      content,
      calloutProps,
      getStyles,
      theme,
      disabled,
      keySequences,
      visible
    } = this.props;

    this._classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        disabled,
        visible
      }
    );

    return (
      <Callout
        { ...calloutProps }
        isBeakVisible={ false }
        doNotLayer={ true }
        directionalHint={ DirectionalHint.bottomCenter }
        target={ constructKeytipTargetFromSequences(keySequences) }
        getStyles={ getCalloutStyles }
        preventDismissOnScroll={ true }
        className={ this._classNames.calloutContainer }
      >
        <div className={ this._classNames.container }>
          <span id={ convertSequencesToKeytipID(keySequences) } className={ this._classNames.root }>{ content }</span>
        </div >
      </Callout>
    );
  }

<<<<<<< HEAD
  /**
   *
   * @param keySequences
   */
  private _constructKeytipTarget(keySequences: IKeySequence[]): string {
    return '[data-ktp-id="' + convertSequencesToKeytipID(keySequences) + '"]';
  }
=======
  // COMMENTING OUT THINGS FOR DISCUSSION
  // @autobind
  // private _onKeytipDismiss(ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void {
  //   this.setState({
  //     visible: false
  //   });
  //   // TODO: should call manager.exitKeytipMode here but when you do it throws a big error in the console
  // }

>>>>>>> deea27e1605e4a5dfa3d7352b741bf24ab12776b
}