import * as React from 'react';
import { IKeytipLayerProps } from './KeytipLayer.types';
import { Keytip, IKeytipProps, KeytipTransitionModifier } from '../Keytip';
import {
  BaseComponent
} from '../../Utilities';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { KeyCodes, findIndex } from '../../Utilities';
import { convertSequencesToKeytipID, fullKeySequencesAreEqual } from '../../utilities/keysequence/IKeySequence';
import { IKeytipTransitionKey } from '../../utilities/keysequence/IKeytipTransitionKey';
import { KeytipManager } from '../../utilities/keytip/KeytipManager';
import { ktpFullPrefix, ktpSeparator } from '../../utilities/keytip/KeytipUtils';

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
    id: ktpFullPrefix + 'Alt' + ktpSeparator + 'Meta'
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

  /**
   * Register a keytip in this layer
   *
   * @param keytipProps - IKeytipProps to add to this layer
   */
  public registerKeytip(keytipProps: IKeytipProps): void {
    this.setState(this.addKeytip(keytipProps));
  }

  /**
   * Unregister a keytip in this layer
   *
   * @param keytipProps - IKeytipProps to remove from this layer
   */
  public unregisterKeytip(keytipProps: IKeytipProps): void {
    this.setState(this.removeKeytip(keytipProps));
  }

  /**
   * Add or update a keytip to this layer by modifying this layer's state
   *
   * @param keytipProps - Keytip to add or update in the layer
   * @returns Function to call with setState
   */
  public addKeytip(keytipProps: IKeytipProps): {} {
    return (previousState: IKeytipLayerState) => {
      const previousKeytips: IKeytipProps[] = previousState.keytips;

      // Try to find keytipProps in previousKeytips to update
      const keytipToUpdateIndex = findIndex(previousKeytips, (previousKeytip: IKeytipProps) => {
        return fullKeySequencesAreEqual(keytipProps.keySequences, previousKeytip.keySequences);
      });

      const currentKeytips = [...previousState.keytips];
      if (keytipToUpdateIndex >= 0) {
        // Replace the keytip props
        currentKeytips.splice(keytipToUpdateIndex, 1, keytipProps);
      } else {
        // Add the new keytip props
        currentKeytips.push(keytipProps);
      }
      return { ...previousState, keytips: currentKeytips };
    };
  }

  /**
   * Removes a keytip from this layer's state
   *
   * @param keytipToRemove - IKeytipProps of the keytip to remove
   * @returns Function to call with setState
   */
  public removeKeytip(keytipToRemove: IKeytipProps): {} {
    return (previousState: IKeytipLayerState) => {
      const currentKeytips = previousState.keytips;
      // Filter out keytips that don't equal the one to remove
      const filteredKeytips: IKeytipProps[] = currentKeytips.filter((currentKeytip: IKeytipProps) => {
        return !fullKeySequencesAreEqual(currentKeytip.keySequences, keytipToRemove.keySequences);
      });
      return { ...previousState, keytips: filteredKeytips };
    };
  }

  /**
   * Sets the visibility of the keytips in this layer
   *
   * @param ids - Keytip IDs that should have their visibility updated
   * @param visible - T/F if the specified Keytips will be visible or not
   */
  public setKeytipVisibility(ids: string[], visible: boolean): void {

    this.setState((previousState: IKeytipLayerState) => {
      const currentKeytips: IKeytipProps[] = [...previousState.keytips];
      for (const keytip of currentKeytips) {
        const keytipId = convertSequencesToKeytipID(keytip.keySequences);
        if (ids.indexOf(keytipId) >= 0) {
          keytip.visible = visible;
        }
      }
      return { ...previousState, keytips: currentKeytips };
    });
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
    this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.on(window, 'keypress', this._onKeyPress, true /* useCapture */);

    // Add handler to remove Keytips when we scroll the page
    window.addEventListener('scroll', (): void => {
      if (this.state.inKeytipMode) {
        this._keytipManager.exitKeytipMode();
      }
    }, { capture: true });
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

  private _onDismiss = (ev?: React.MouseEvent<HTMLElement>): void => {
    // if we are in keytip mode, then exit keytip mode
    if (this.state.inKeytipMode) {
      this._keytipManager.exitKeytipMode();
    }
  }

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
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
        const transitionKey: IKeytipTransitionKey = { key: ev.key };
        transitionKey.modifierKeys = this._getModifierKey(ev);
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
  private _getModifierKey(ev: React.KeyboardEvent<HTMLElement>): KeytipTransitionModifier[] | undefined {
    const modifierKeys = [];
    if (ev.altKey) {
      modifierKeys.push(KeytipTransitionModifier.alt);
    }
    if (ev.ctrlKey) {
      modifierKeys.push(KeytipTransitionModifier.ctrl);
    }
    if (ev.shiftKey) {
      modifierKeys.push(KeytipTransitionModifier.shift);
    }
    // TODO: include windows key or option for MAC
    return modifierKeys.length ? modifierKeys : undefined;
  }

  private _onKeyPress = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // Call processInput
    this._keytipManager.processInput(ev.key);
  }
}