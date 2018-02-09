import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps } from '../Keytip';
import {
  autobind,
  BaseComponent
} from '../../Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { KeyCodes, ModifierKeyCodes } from '../../Utilities';
import { IKeytipTransitionSequence, IKeytipTransitionKey, convertSequencesToKeytipID } from '../../utilities/keysequence';
import { KeytipManager } from './KeytipManager';
import { ktpFullPrefix, ktpSeparator } from '../../utilities/keytip/KeytipUtils';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
}

const defaultStartSequence = {
  keys: [{ key: 'Meta', modifierKey: ModifierKeyCodes.alt }]
} as IKeytipTransitionSequence;

const defaultExitSequence = {
  keys: [{ key: 'Meta', modifierKey: ModifierKeyCodes.alt }]
} as IKeytipTransitionSequence;

const defaultGoBackSequence = {
  keys: [{ key: 'Escape' }]
} as IKeytipTransitionSequence;

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
    keytipGoBackSequences: [defaultGoBackSequence],
    id: ktpFullPrefix + KeyCodes.alt + ktpSeparator + KeyCodes.leftWindow
  };

  private _keytipManager: KeytipManager = KeytipManager.getInstance();

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    this.state = {
      inKeytipMode: false,
      keytips: []
    };

    this._keytipManager.init(this);
  }

  public addKeytip(keytipProps: IKeytipProps): {} {
    return (previousState: IKeytipLayerState, currentProps: IKeytipLayerState) => {
      // TODO: check for duplicates
      let currentKeytips = [...previousState.keytips, ...[keytipProps]];
      return { ...previousState, keytips: currentKeytips };
    };
  }

  public setKeytipVisibility(ids: string[], visible: boolean): void {
    this.setState((previousState: IKeytipLayerState, currentProps: IKeytipLayerState) => {
      let currentKeytips: IKeytipProps[] = [...previousState.keytips];
      for (let keytip of currentKeytips) {
        let keytipId = convertSequencesToKeytipID(keytip.keySequences);
        if (ids.indexOf(keytipId) >= 0) {
          keytip.visible = visible;
        }
      }
      return { ...previousState, keytips: currentKeytips };
    });
  }

  public registerKeytip(keytipProps: IKeytipProps): void {
    this.setState(this.addKeytip(keytipProps));
  }

  public render(): JSX.Element {
    const {
      id
    } = this.props;

    const {
      keytips
    } = this.state;

    return (
      <Layer id={ id }>
        { keytips && keytips.map((keytipProps: IKeytipProps, index: number) => {
          return <Keytip key={ index } { ...keytipProps } />;
        }) }
      </Layer>
    );
  }

  public componentDidMount(): void {
    this._events.on(window, 'mousedown', this._onDismiss);
    this._events.on(window, 'resize', this._onDismiss);
    this._events.on(window, 'scroll', this._onDismiss);
    this._events.on(window, 'keydown', this._onKeyDown);
    this._events.on(window, 'keypress', this._onKeyPress);
    // TODO: SHOULD WE DO THIS: -> To remove callout when scrolled
    window.addEventListener('scroll', (): void => {
      if (this.state.inKeytipMode) {
        this._keytipManager.exitKeytipMode();
      }
    }, { capture: true });
  }

  public exitKeytipMode(): void {
    if (this.props.onExitKeytipMode) {
      this.props.onExitKeytipMode();
    }
    this.setState({ inKeytipMode: false });
  }

  public enterKeytipMode(): void {
    if (this.props.onEnterKeytipMode) {
      this.props.onEnterKeytipMode();
    }
    this.setState({ inKeytipMode: true });
  }

  @autobind
  private _onDismiss(ev?: React.MouseEvent<HTMLElement>): void {
    // if we are in keytip mode.. then exit keytip mode
    if (this.state.inKeytipMode) {
      this._keytipManager.exitKeytipMode();
    }
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    switch (ev.which) {
      case KeyCodes.tab:
      case KeyCodes.enter:
      case KeyCodes.space:
        this._keytipManager.exitKeytipMode();
        break;
      default:
        // TODO: Add other meta keys
        let transitionKey: IKeytipTransitionKey = { key: ev.key };
        if (ev.altKey) {
          transitionKey.modifierKey = ModifierKeyCodes.alt;
        }
        this._keytipManager.processTransitionInput({ key: ev.key });
        break;
    }
  }

  @autobind
  private _onKeyPress(ev: React.KeyboardEvent<HTMLElement>): void {
    // call processInput
    // TODO: why don't we just pass in one key?
    this._keytipManager.processInput({ keys: [ev.key] });
  }
}