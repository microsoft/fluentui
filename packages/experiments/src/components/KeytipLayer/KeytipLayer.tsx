import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps } from '../Keytip';
import {
  autobind,
  BaseComponent
} from '../../Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { KeyCodes } from '../../Utilities';
import { IKeySequence } from '../../utilities/keysequence';
import { KeytipManager } from './KeytipManager';
import { ktpFullPrefix, ktpSeparator } from '../../utilities/keytip/KeytipUtils';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
}

const defaultStartSequence = {
  keyCodes: [KeyCodes.alt, KeyCodes.leftWindow]
} as IKeySequence;

const defaultExitSequence = {
  keyCodes: [KeyCodes.alt, KeyCodes.leftWindow]
} as IKeySequence;

const defaultGoBackSequence = {
  keyCodes: [KeyCodes.escape]
} as IKeySequence;

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
          return <Keytip key={ index } {...keytipProps} />;
        }) }
      </Layer>
    );
  }

  public componentDidMount(): void {
    this._events.on(window, 'mousedown', this._onDismiss);
    this._events.on(window, 'resize', this._onDismiss);
    this._events.on(window, 'keydown', this._onKeyDown);
    this._events.on(window, 'keypress', this._onKeyPress);
  }

  public exitKeytipMode(): void {
    if (this.props.onExitKeytipMode) {
      this.props.onExitKeytipMode();
    }
    this.setState({ keytips: [], inKeytipMode: false });
  }

  public enterKeytipMode(): void {
    if (this.props.onEnterKeytipMode) {
      this.props.onEnterKeytipMode();
    }
    // TODO
  }

  @autobind
  private _onDismiss(ev?: React.MouseEvent<HTMLElement>): void {
    // if we are in keytip mode.. then exit keytip mode
    if (this.state.inKeytipMode) {
      this.exitKeytipMode();
    }
  }

  @autobind
  private _onKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    switch (ev.which) {
      case KeyCodes.escape: {
        // exit current layer
      }
        break;
      case KeyCodes.tab:
      case KeyCodes.enter:
      case KeyCodes.space:
        this.exitKeytipMode();
        break;
    }
  }

  @autobind
  private _onKeyPress(ev: React.KeyboardEvent<HTMLElement>): void {
    // call processInput
  }
}