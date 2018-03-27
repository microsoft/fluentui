import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { getLayerStyles } from './KeytipLayer.styles';
import { Keytip, IKeytipProps } from '../../Keytip';
import { Layer } from '../../Layer';
import {
  autobind,
  BaseComponent,
  KeyCodes,
  KeytipTransitionModifier,
  IKeytipTransitionKey,
  ktpLayerId,
  ktpAriaSeparator,
  ktpAriaSeparatorId
} from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips';
import { hiddenContentStyle } from '../../Styling';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
}

const defaultStartSequence: IKeytipTransitionKey = {
  key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt]
};

const defaultExitSequence: IKeytipTransitionKey = {
  key: 'Meta', modifierKeys: [KeytipTransitionModifier.alt]
};

const defaultReturnSequence: IKeytipTransitionKey = {
  key: 'Escape'
};

/**
 * A layer that holds all keytip items
 *
 * @export
 * @class KeytipLayer
 * @extends {BaseComponent<IKeytipLayerProps>}
 */
export class KeytipLayer extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
  public static defaultProps: IKeytipLayerProps = {
    keytipStartSequences: [defaultStartSequence],
    keytipExitSequences: [defaultExitSequence],
    keytipReturnSequences: [defaultReturnSequence],
    content: 'Alt Windows'
  };

  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    this.state = {
      inKeytipMode: false,
      // Get the initial set of keytips
      keytips: [...this._keytipManager.keytips],
    };

    this._keytipManager.init(this);
  }

  /**
   * Sets the keytips state property
   *
   * @param keytipProps - Keytips to set in this layer
   */
  public setKeytips(keytipProps: IKeytipProps[]) {
    this.setState({ keytips: keytipProps });
  }

  public render(): JSX.Element {
    const {
      content
    } = this.props;

    const {
      keytips
    } = this.state;

    const hiddenStyle = {
      ...hiddenContentStyle,
      visibility: 'hidden',
      opacity: 0
    };

    return (
      <Layer getStyles={ getLayerStyles }>
        <span id={ ktpLayerId } style={ { hiddenStyle } }>{ content }</span>
        <span id={ ktpAriaSeparatorId } style={ { hiddenStyle } }>{ ktpAriaSeparator }</span>
        { keytips && keytips.map((keytipProps: IKeytipProps, index: number) => {
          return <Keytip key={ index } { ...keytipProps } />;
        }) }
      </Layer>
    );
  }

  public componentDidMount(): void {
    // Add window listeners
    this._events.on(window, 'mousedown', this._onDismiss);
    this._events.on(window, 'resize', this._onDismiss);
    this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.on(window, 'keypress', this._onKeyPress, true /* useCapture */);
    this._events.on(window, 'scroll', this._onDismiss, true /* useCapture */);
  }

  public componentWillUnmount(): void {
    // Remove window listeners
    this._events.off(window, 'mousedown', this._onDismiss);
    this._events.off(window, 'resize', this._onDismiss);
    this._events.off(window, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.off(window, 'keypress', this._onKeyPress, true /* useCapture */);
    this._events.off(window, 'scroll', this._onDismiss, true /* useCapture */);
  }

  /**
   * Exits keytip mode for this layer
   */
  public exitKeytipMode(): void {
    if (this.props.onExitKeytipMode) {
      this.props.onExitKeytipMode();
    }
    this.setState({ inKeytipMode: false });
  }

  /**
   * Enters keytip mode for this layer
   */
  public enterKeytipMode(): void {
    if (this.props.onEnterKeytipMode) {
      this.props.onEnterKeytipMode();
    }
    this.setState({ inKeytipMode: true });
  }

  @autobind
  private _onDismiss(ev?: React.MouseEvent<HTMLElement>): void {
    // if we are in keytip mode, then exit keytip mode
    if (this.state.inKeytipMode) {
      this._keytipManager.exitKeytipMode();
    }
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    switch (ev.which) {
      case KeyCodes.alt:
        // ALT puts focus in the browser bar, so it should not be used as a key for keytips.
        // It can be used as a modifier
        break;
      case KeyCodes.tab:
      case KeyCodes.enter:
      case KeyCodes.space:
        this._keytipManager.exitKeytipMode();
        break;
      default:
        let key = ev.key;
        if (key === 'OS' || key === 'Win') {
          // Special cases for browser-specific changes that will be fixed in the future
          // Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1232918
          // Edge: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
          // and https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16424492/
          key = 'Meta';
        }
        const transitionKey: IKeytipTransitionKey = { key };
        transitionKey.modifierKeys = this._getModifierKey(key, ev);
        this._keytipManager.processTransitionInput(transitionKey);
        break;
    }
  }

  /**
   * Gets the ModifierKeyCodes based on the keyboard event
   *
   * @param ev - React.KeyboardEvent
   * @returns List of ModifierKeyCodes that were pressed
   */
  private _getModifierKey(key: string, ev: React.KeyboardEvent<HTMLElement>): KeytipTransitionModifier[] | undefined {
    const modifierKeys = [];
    if (ev.altKey && key !== 'Alt') {
      modifierKeys.push(KeytipTransitionModifier.alt);
    }
    if (ev.ctrlKey && key !== 'Ctrl') {
      modifierKeys.push(KeytipTransitionModifier.ctrl);
    }
    if (ev.shiftKey && key !== 'Shift') {
      modifierKeys.push(KeytipTransitionModifier.shift);
    }
    if (ev.metaKey && key !== 'Meta') {
      modifierKeys.push(KeytipTransitionModifier.meta);
    }
    return modifierKeys.length ? modifierKeys : undefined;
  }

  @autobind
  private _onKeyPress(ev: React.KeyboardEvent<HTMLElement>): void {
    // Call processInput
    this._keytipManager.processInput(ev.key);
  }
}