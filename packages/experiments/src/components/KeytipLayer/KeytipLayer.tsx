import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps } from '../Keytip';
import {
  autobind,
  BaseComponent
} from '../../Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { IKeySequence, KeyCodes } from '../../Utilities';
import { KeytipManager } from './KeytipManager';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
}

const defaultSequence = {
  keyCodes: [KeyCodes.alt, KeyCodes.leftWindow]
} as IKeySequence;

const defaultGoBackSequence = {
  keyCodes: [KeyCodes.escape]
} as IKeySequence;

const ktpId = 'ktp';

/**
 * A layer that holds all keytip items
 *
 * @export
 * @class KeytipLayer
 * @extends {BaseComponent<IKeytipLayerProps>}
 */
export class KeytipLayer extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
  public static defaultProps: IKeytipLayerProps = {
    keytipStartSequences: [defaultSequence],
    id: ktpId + '-' + KeyCodes.alt + '-' + KeyCodes.leftWindow
  };

  private _keytipManager: KeytipManager = KeytipManager.getInstance();
  private _keyString: IKeySequence;

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    this.state = {
      inKeytipMode: false,
      keytips: []
    };

    this._keytipManager.setLayer(this);
  }

  public addKeytip(keytipProps: IKeytipProps) {
    return (previousState: IKeytipLayerState, currentProps: IKeytipLayerState) => {
      // TODO: check for duplicates
      let currentKeytips = [...previousState.keytips, ...[keytipProps]];
      return { ...previousState, keytips: currentKeytips };
    };
  }

  public registerKeytip(keytipProps: IKeytipProps) {
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
          return <Keytip key={ index } {...keytipProps} />;
        }) }
      </Layer>
    );
  }

  public componentDidMount() {
    this._events.on(window, 'mousedown', this._onDismiss);
    this._events.on(window, 'resize', this._onDismiss);
    this._events.on(window, 'keydown', this._onKeyDown);
    this._events.on(window, 'keypress', this._onKeyPress);
  }

  @autobind
  private _onDismiss(ev?: React.MouseEvent<HTMLElement>) {
    // if we are in keytip mode.. then exit keytip mode
    if (this.state.inKeytipMode) {
      this._exitKeytipMode();
    }
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.escape: {
        // exit current layer
      }
        break;
      case KeyCodes.tab:
      case KeyCodes.enter:
      case KeyCodes.space:
        this._exitKeytipMode();
        break;
    }
  }

  @autobind
  private _onKeyPress(ev: React.KeyboardEvent<HTMLElement>) {
    let handled = false;

    // call processInput
  }

  private _exitKeytipMode() {
    // TODO should we close menus if opened???
    this.setState({ keytips: [], inKeytipMode: false });
  }
}