import * as React from 'react';
import { IKeytipLayerProps, IKeytipLayerStyles, IKeytipLayerStyleProps } from './KeytipLayer.types';
import { getLayerStyles } from './KeytipLayer.styles';
import { Keytip, IKeytipProps } from '../../Keytip';
import { Layer } from '../../Layer';
import { BaseComponent, classNamesFunction, getDocument, arraysEqual, warn, isMac } from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { KeytipTree } from './KeytipTree';
import { IKeytipTreeNode } from './IKeytipTreeNode';
import { ktpTargetFromId, ktpTargetFromSequences, sequencesToID, mergeOverflows } from '../../utilities/keytips/KeytipUtils';
import { transitionKeysContain, KeytipTransitionModifier, IKeytipTransitionKey } from '../../utilities/keytips/IKeytipTransitionKey';
import { KeytipEvents, KTP_LAYER_ID, KTP_ARIA_SEPARATOR } from '../../utilities/keytips/KeytipConstants';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
  visibleKeytips: IKeytipProps[];
}

// Default sequence is Alt-Windows (Alt-Meta) in Windows, Option-Control (Alt-Control) in Mac
const defaultStartSequence: IKeytipTransitionKey = {
  key: isMac() ? 'Control' : 'Meta',
  modifierKeys: [KeytipTransitionModifier.alt]
};

// Default exit sequence is the same as the start sequence
const defaultExitSequence: IKeytipTransitionKey = defaultStartSequence;

// Default return sequence is Escape
const defaultReturnSequence: IKeytipTransitionKey = {
  key: 'Escape'
};

const getClassNames = classNamesFunction<IKeytipLayerStyleProps, IKeytipLayerStyles>();

/**
 * A layer that holds all keytip items
 * {@docCategory Keytips}
 */
export class KeytipLayerBase extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
  public static defaultProps: IKeytipLayerProps = {
    keytipStartSequences: [defaultStartSequence],
    keytipExitSequences: [defaultExitSequence],
    keytipReturnSequences: [defaultReturnSequence],
    content: ''
  };

  private _keytipTree: KeytipTree;

  private _keytipManager: KeytipManager = KeytipManager.getInstance();
  private _classNames: { [key in keyof IKeytipLayerStyles]: string };
  private _currentSequence: string;
  private _newCurrentKeytipSequences?: string[];

  private _delayedKeytipQueue: string[] = [];
  private _delayedQueueTimeout: number;

  private _keyHandled = false;

  // tslint:disable-next-line:no-any
  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    const managerKeytips = [...this._keytipManager.getKeytips()];
    this.state = {
      inKeytipMode: false,
      // Get the initial set of keytips
      keytips: managerKeytips,
      visibleKeytips: this._getVisibleKeytips(managerKeytips)
    };

    this._keytipTree = new KeytipTree();
    // Add regular and persisted keytips to the tree
    for (const uniqueKeytip of this._keytipManager.keytips.concat(this._keytipManager.persistedKeytips)) {
      this._keytipTree.addNode(uniqueKeytip.keytip, uniqueKeytip.uniqueID);
    }

    this._currentSequence = '';

    // Add keytip listeners
    this._events.on(this._keytipManager, KeytipEvents.KEYTIP_ADDED, this._onKeytipAdded);
    this._events.on(this._keytipManager, KeytipEvents.KEYTIP_UPDATED, this._onKeytipUpdated);
    this._events.on(this._keytipManager, KeytipEvents.KEYTIP_REMOVED, this._onKeytipRemoved);
    this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_ADDED, this._onPersistedKeytipAdded);
    this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_REMOVED, this._onPersistedKeytipRemoved);
    this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, this._onPersistedKeytipExecute);
  }

  public render(): JSX.Element {
    const { content, styles } = this.props;

    const { keytips, visibleKeytips } = this.state;

    this._classNames = getClassNames(styles, {});

    return (
      <Layer styles={getLayerStyles}>
        <span id={KTP_LAYER_ID} className={this._classNames.innerContent}>{`${content}${KTP_ARIA_SEPARATOR}`}</span>
        {keytips &&
          keytips.map((keytipProps: IKeytipProps, index: number) => {
            return (
              <span key={index} id={sequencesToID(keytipProps.keySequences)} className={this._classNames.innerContent}>
                {keytipProps.keySequences.join(KTP_ARIA_SEPARATOR)}
              </span>
            );
          })}
        {visibleKeytips &&
          visibleKeytips.map((visibleKeytipProps: IKeytipProps) => {
            return <Keytip key={sequencesToID(visibleKeytipProps.keySequences)} {...visibleKeytipProps} />;
          })}
      </Layer>
    );
  }

  public componentDidMount(): void {
    // Add window listeners
    this._events.on(window, 'mouseup', this._onDismiss, true /* useCapture */);
    this._events.on(window, 'pointerup', this._onDismiss, true /* useCapture */);
    this._events.on(window, 'resize', this._onDismiss);
    this._events.on(window, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.on(window, 'keypress', this._onKeyPress, true /* useCapture */);
    this._events.on(window, 'scroll', this._onDismiss, true /* useCapture */);

    // Add keytip listeners
    this._events.on(this._keytipManager, KeytipEvents.ENTER_KEYTIP_MODE, this._enterKeytipMode);
    this._events.on(this._keytipManager, KeytipEvents.EXIT_KEYTIP_MODE, this._exitKeytipMode);
  }

  public componentWillUnmount(): void {
    // Remove window listeners
    this._events.off(window, 'mouseup', this._onDismiss, true /* useCapture */);
    this._events.off(window, 'pointerup', this._onDismiss, true /* useCapture */);
    this._events.off(window, 'resize', this._onDismiss);
    this._events.off(window, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.off(window, 'keypress', this._onKeyPress, true /* useCapture */);
    this._events.off(window, 'scroll', this._onDismiss, true /* useCapture */);

    // Remove keytip listeners
    this._events.off(this._keytipManager, KeytipEvents.KEYTIP_ADDED, this._onKeytipAdded);
    this._events.off(this._keytipManager, KeytipEvents.KEYTIP_UPDATED, this._onKeytipUpdated);
    this._events.off(this._keytipManager, KeytipEvents.KEYTIP_REMOVED, this._onKeytipRemoved);
    this._events.off(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_ADDED, this._onPersistedKeytipAdded);
    this._events.off(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_REMOVED, this._onPersistedKeytipRemoved);
    this._events.off(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, this._onPersistedKeytipExecute);
    this._events.off(this._keytipManager, KeytipEvents.ENTER_KEYTIP_MODE, this._enterKeytipMode);
    this._events.off(this._keytipManager, KeytipEvents.EXIT_KEYTIP_MODE, this._exitKeytipMode);
  }

  // The below public functions are only public for testing purposes
  // They are not intended to be used in app code by using a KeytipLayer reference

  public getCurrentSequence(): string {
    return this._currentSequence;
  }

  public getKeytipTree(): KeytipTree {
    return this._keytipTree;
  }

  /**
   * Processes an IKeytipTransitionKey entered by the user
   *
   * @param transitionKey - IKeytipTransitionKey received by the layer to process
   */
  public processTransitionInput(transitionKey: IKeytipTransitionKey, ev?: React.KeyboardEvent<HTMLElement>): void {
    const currKtp = this._keytipTree.currentKeytip;
    if (transitionKeysContain(this.props.keytipExitSequences!, transitionKey) && currKtp) {
      // If key sequence is in 'exit sequences', exit keytip mode
      this._keyHandled = true;
      this._exitKeytipMode(ev);
    } else if (transitionKeysContain(this.props.keytipReturnSequences!, transitionKey)) {
      // If key sequence is in return sequences, move currentKeytip to parent (or if currentKeytip is the root, exit)
      if (currKtp) {
        this._keyHandled = true;
        if (currKtp.id === this._keytipTree.root.id) {
          // We are at the root, exit keytip mode
          this._exitKeytipMode(ev);
        } else {
          // If this keytip has a onReturn prop, we execute the func.
          if (currKtp.onReturn) {
            currKtp.onReturn(this._getKtpExecuteTarget(currKtp), this._getKtpTarget(currKtp));
          }

          // Reset currentSequence
          this._currentSequence = '';
          // Return pointer to its parent
          this._keytipTree.currentKeytip = this._keytipTree.getNode(currKtp.parent);
          // Show children keytips of the new currentKeytip
          this.showKeytips(this._keytipTree.getChildren());
          this._warnIfDuplicateKeytips();
        }
      }
    } else if (transitionKeysContain(this.props.keytipStartSequences!, transitionKey) && !currKtp) {
      // If key sequence is in 'entry sequences' and currentKeytip is null, we enter keytip mode
      this._keyHandled = true;
      this._enterKeytipMode();
      this._warnIfDuplicateKeytips();
    }
  }

  /**
   * Processes inputs from the document listener and traverse the keytip tree
   *
   * @param key - Key pressed by the user
   */
  public processInput(key: string, ev?: React.KeyboardEvent<HTMLElement>): void {
    // Concat the input key with the current sequence
    const currSequence: string = this._currentSequence + key;
    let currKtp = this._keytipTree.currentKeytip;

    // currentKeytip must be defined, otherwise we haven't entered keytip mode yet
    if (currKtp) {
      const node = this._keytipTree.getExactMatchedNode(currSequence, currKtp);
      if (node) {
        this._keytipTree.currentKeytip = currKtp = node;
        const currKtpChildren = this._keytipTree.getChildren();

        // Execute this node's onExecute if defined
        if (currKtp.onExecute) {
          currKtp.onExecute(this._getKtpExecuteTarget(currKtp), this._getKtpTarget(currKtp));
          // Reset currKtp, this might have changed from the onExecute
          currKtp = this._keytipTree.currentKeytip;
        }

        // To exit keytipMode after executing the keytip it must not have a menu or have dynamic children
        if (currKtpChildren.length === 0 && !(currKtp.hasDynamicChildren || currKtp.hasMenu)) {
          this._exitKeytipMode(ev);
        } else {
          // Show all children keytips
          this.showKeytips(currKtpChildren);
          this._warnIfDuplicateKeytips();
        }

        // Clear currentSequence
        this._currentSequence = '';
        return;
      }

      const partialNodes = this._keytipTree.getPartiallyMatchedNodes(currSequence, currKtp);
      if (partialNodes.length > 0) {
        // We found nodes that partially match the sequence, so we show only those
        // Omit showing persisted nodes here
        const ids = partialNodes
          .filter((partialNode: IKeytipTreeNode) => {
            return !partialNode.persisted;
          })
          .map((partialNode: IKeytipTreeNode) => {
            return partialNode.id;
          });
        this.showKeytips(ids);

        // Save currentSequence
        this._currentSequence = currSequence;
      }
    }
  }

  /**
   * Show the given keytips and hide all others
   *
   * @param ids - Keytip IDs to show
   */
  public showKeytips(ids: string[]): void {
    // Update the visible prop in the manager
    for (const keytip of this._keytipManager.getKeytips()) {
      const keytipId = sequencesToID(keytip.keySequences);
      if (ids.indexOf(keytipId) >= 0) {
        keytip.visible = true;
      } else if (
        keytip.overflowSetSequence &&
        ids.indexOf(sequencesToID(mergeOverflows(keytip.keySequences, keytip.overflowSetSequence))) >= 0
      ) {
        // Check if the ID with the overflow is the keytip we're looking for
        keytip.visible = true;
      } else {
        keytip.visible = false;
      }
    }
    // Apply the manager changes to the Layer state
    this._setKeytips();
  }

  /**
   * Enters keytip mode for this layer
   */
  private _enterKeytipMode(): void {
    if (this._keytipManager.shouldEnterKeytipMode) {
      this._keytipTree.currentKeytip = this._keytipTree.root;
      // Show children of root
      this.showKeytips(this._keytipTree.getChildren());

      this._setInKeytipMode(true /* inKeytipMode */);

      if (this.props.onEnterKeytipMode) {
        this.props.onEnterKeytipMode();
      }
    }
  }

  /**
   * Exits keytip mode for this layer
   */
  private _exitKeytipMode(ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>): void {
    this._keytipTree.currentKeytip = undefined;
    this._currentSequence = '';
    // Hide all keytips
    this.showKeytips([]);

    // Reset the delayed keytips if any
    this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
    this._delayedKeytipQueue = [];

    this._setInKeytipMode(false /* inKeytipMode */);

    if (this.props.onExitKeytipMode) {
      this.props.onExitKeytipMode(ev);
    }
  }

  /**
   * Sets the keytips state property
   *
   * @param keytipProps - Keytips to set in this layer
   */
  private _setKeytips(keytipProps: IKeytipProps[] = this._keytipManager.getKeytips()) {
    this.setState({ keytips: keytipProps, visibleKeytips: this._getVisibleKeytips(keytipProps) });
  }

  /**
   * Callback function to use for persisted keytips
   *
   * @param overflowButtonSequences - The overflow button sequence to execute
   * @param keytipSequences - The keytip that should become the 'currentKeytip' when it is registered
   */
  private _persistedKeytipExecute(overflowButtonSequences: string[], keytipSequences: string[]) {
    // Save newCurrentKeytip for later
    this._newCurrentKeytipSequences = keytipSequences;

    // Execute the overflow button's onExecute
    const overflowKeytipNode = this._keytipTree.getNode(sequencesToID(overflowButtonSequences));
    if (overflowKeytipNode && overflowKeytipNode.onExecute) {
      overflowKeytipNode.onExecute(this._getKtpExecuteTarget(overflowKeytipNode), this._getKtpTarget(overflowKeytipNode));
    }
  }

  private _getVisibleKeytips(keytips: IKeytipProps[]): IKeytipProps[] {
    // Filter out non-visible keytips and duplicates
    const seenIds: { [childSequence: string]: number } = {};
    return keytips.filter(keytip => {
      const keytipId = sequencesToID(keytip.keySequences);
      seenIds[keytipId] = seenIds[keytipId] ? seenIds[keytipId] + 1 : 1;
      return keytip.visible && seenIds[keytipId] === 1;
    });
  }

  private _onDismiss = (ev?: React.MouseEvent<HTMLElement>): void => {
    // if we are in keytip mode, then exit keytip mode
    if (this.state.inKeytipMode) {
      this._exitKeytipMode(ev);
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    this._keyHandled = false;
    // using key since which has been deprecated and key is now widely suporrted.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
    let key = ev.key;
    switch (key) {
      case 'Alt':
        // ALT puts focus in the browser bar, so it should not be used as a key for keytips.
        // It can be used as a modifier
        break;
      case 'Tab':
      case 'Enter':
      case 'Spacebar':
      case ' ':
      case 'ArrowUp':
      case 'Up':
      case 'ArrowDown':
      case 'Down':
      case 'ArrowLeft':
      case 'Left':
      case 'ArrowRight':
      case 'Right':
        if (this.state.inKeytipMode) {
          this._keyHandled = true;
          this._exitKeytipMode(ev);
        }
        break;
      default:
        // Special cases for browser-specific keys that are not at standard
        // (according to http://www.w3.org/TR/uievents-key/#keys-navigation)
        if (key === 'Esc') {
          // Edge: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/5290772/
          key = 'Escape';
        } else if (key === 'OS' || key === 'Win') {
          // Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1232918
          // Edge: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
          // and https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16424492/
          key = 'Meta';
        }
        const transitionKey: IKeytipTransitionKey = { key };
        transitionKey.modifierKeys = this._getModifierKey(key, ev);
        this.processTransitionInput(transitionKey, ev);
        break;
    }
  };

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
    if (ev.ctrlKey && key !== 'Control') {
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

  private _onKeyPress = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (this.state.inKeytipMode && !this._keyHandled) {
      // Call processInput
      this.processInput(ev.key.toLocaleLowerCase(), ev);
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  private _onKeytipAdded = (eventArgs: any) => {
    const keytipProps = eventArgs.keytip;
    const uniqueID = eventArgs.uniqueID;

    this._keytipTree.addNode(keytipProps, uniqueID);
    this._setKeytips();

    // Add the keytip to the queue to show later
    if (this._keytipTree.isCurrentKeytipParent(keytipProps)) {
      this._addKeytipToQueue(sequencesToID(keytipProps.keySequences));
      // Check to make sure that child of currentKeytip is successfully added to currentKeytip's children and update it if not
      // Note: Added this condition because KeytipTree.addNode was not always reflecting updates made to a parent node in currentKeytip
      // when that parent is the currentKeytip
      if (
        this._keytipTree.currentKeytip &&
        this._keytipTree.currentKeytip.hasDynamicChildren &&
        this._keytipTree.currentKeytip.children.indexOf(keytipProps.id) < 0
      ) {
        this._keytipTree.currentKeytip = this._keytipTree.getNode(this._keytipTree.currentKeytip.id);
      }
    }

    if (this._newCurrentKeytipSequences && arraysEqual(keytipProps.keySequences, this._newCurrentKeytipSequences)) {
      this._triggerKeytipImmediately(keytipProps);
    }

    if (this._isCurrentKeytipAnAlias(keytipProps)) {
      let keytipSequence = keytipProps.keySequences;
      if (keytipProps.overflowSetSequence) {
        keytipSequence = mergeOverflows(keytipSequence, keytipProps.overflowSetSequence);
      }
      this._keytipTree.currentKeytip = this._keytipTree.getNode(sequencesToID(keytipSequence));
    }
  };

  private _onKeytipUpdated = (eventArgs: any) => {
    const keytipProps = eventArgs.keytip;
    const uniqueID = eventArgs.uniqueID;
    this._keytipTree.updateNode(keytipProps, uniqueID);
    this._setKeytips();
  };

  private _onKeytipRemoved = (eventArgs: any) => {
    const keytipProps = eventArgs.keytip;
    const uniqueID = eventArgs.uniqueID;

    // Remove keytip from the delayed queue
    this._removeKeytipFromQueue(sequencesToID(keytipProps.keySequences));

    // Remove the node from the Tree
    this._keytipTree.removeNode(keytipProps, uniqueID);
    this._setKeytips();
  };

  private _onPersistedKeytipAdded = (eventArgs: any) => {
    const keytipProps = eventArgs.keytip;
    const uniqueID = eventArgs.uniqueID;
    this._keytipTree.addNode(keytipProps, uniqueID, true);
  };

  private _onPersistedKeytipRemoved = (eventArgs: any) => {
    const keytipProps = eventArgs.keytip;
    const uniqueID = eventArgs.uniqueID;
    this._keytipTree.removeNode(keytipProps, uniqueID);
  };

  private _onPersistedKeytipExecute = (eventArgs: any) => {
    this._persistedKeytipExecute(eventArgs.overflowButtonSequences, eventArgs.keytipSequences);
  };

  /**
   * Trigger a keytip immediately and set it as the current keytip
   *
   * @param keytipProps - Keytip to trigger immediately
   */
  private _triggerKeytipImmediately(keytipProps: IKeytipProps) {
    // This keytip should become the currentKeytip and should execute right away
    let keytipSequence = [...keytipProps.keySequences];
    if (keytipProps.overflowSetSequence) {
      keytipSequence = mergeOverflows(keytipSequence, keytipProps.overflowSetSequence);
    }

    // Set currentKeytip
    this._keytipTree.currentKeytip = this._keytipTree.getNode(sequencesToID(keytipSequence));
    if (this._keytipTree.currentKeytip) {
      // Show all children keytips if any
      const children = this._keytipTree.getChildren();
      if (children.length) {
        this.showKeytips(children);
      }

      if (this._keytipTree.currentKeytip.onExecute) {
        this._keytipTree.currentKeytip.onExecute(
          this._getKtpExecuteTarget(this._keytipTree.currentKeytip),
          this._getKtpTarget(this._keytipTree.currentKeytip)
        );
      }
    }

    // Unset _newCurrKtpSequences
    this._newCurrentKeytipSequences = undefined;
  }

  private _addKeytipToQueue(keytipID: string) {
    // Add keytip
    this._delayedKeytipQueue.push(keytipID);
    // Clear timeout
    this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
    // Reset timeout
    this._delayedQueueTimeout = this._async.setTimeout(() => {
      if (this._delayedKeytipQueue.length) {
        this.showKeytips(this._delayedKeytipQueue);
        this._delayedKeytipQueue = [];
      }
    }, 300);
  }

  private _removeKeytipFromQueue(keytipID: string) {
    const index = this._delayedKeytipQueue.indexOf(keytipID);
    if (index >= 0) {
      // Remove keytip
      this._delayedKeytipQueue.splice(index, 1);
      // Clear timeout
      this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
      // Reset timeout
      this._delayedQueueTimeout = this._async.setTimeout(() => {
        if (this._delayedKeytipQueue.length) {
          this.showKeytips(this._delayedKeytipQueue);
          this._delayedKeytipQueue = [];
        }
      }, 300);
    }
  }

  private _getKtpExecuteTarget(currKtp: IKeytipTreeNode): HTMLElement | null {
    return getDocument()!.querySelector(ktpTargetFromId(currKtp.id));
  }

  private _getKtpTarget(currKtp: IKeytipTreeNode): HTMLElement | null {
    return getDocument()!.querySelector(ktpTargetFromSequences(currKtp.keySequences));
  }

  /**
   * Returns T/F if the keytipProps keySequences match the currentKeytip, and the currentKeytip is in an overflow well
   * This will make 'keytipProps' the new currentKeytip
   *
   * @param keytipProps - Keytip props to check
   * @returns - T/F if this keytip should become the currentKeytip
   */
  private _isCurrentKeytipAnAlias(keytipProps: IKeytipProps): boolean {
    const currKtp = this._keytipTree.currentKeytip;
    if (currKtp && (currKtp.overflowSetSequence || currKtp.persisted) && arraysEqual(keytipProps.keySequences, currKtp.keySequences)) {
      return true;
    }
    return false;
  }

  /**
   * Sets if we are in keytip mode.
   * Note, this sets both the state for the layer as well as
   * the value that the manager will expose externally.
   * @param inKeytipMode - Boolean so set whether we are in keytip mode or not
   */
  private _setInKeytipMode = (inKeytipMode: boolean): void => {
    this.setState({ inKeytipMode: inKeytipMode });
    this._keytipManager.inKeytipMode = inKeytipMode;
  };

  /**
   * Emits a warning if duplicate keytips are found for the children of the current keytip
   */
  private _warnIfDuplicateKeytips = (): void => {
    const duplicateKeytips = this._getDuplicateIds(this._keytipTree.getChildren());
    if (duplicateKeytips.length) {
      warn('Duplicate keytips found for ' + duplicateKeytips.join(', '));
    }
  };

  /**
   * Returns duplicates among keytip IDs
   * If the returned array is empty, no duplicates were found
   *
   * @param keytipIds - Array of keytip IDs to find duplicates for
   * @returns - Array of duplicates that were found. If multiple duplicates were found it will only be added once to this array
   */
  private _getDuplicateIds = (keytipIds: string[]): string[] => {
    const seenIds: { [id: string]: number } = {};
    return keytipIds.filter(keytipId => {
      seenIds[keytipId] = seenIds[keytipId] ? seenIds[keytipId] + 1 : 1;
      // Only add the first duplicate keytip seen
      return seenIds[keytipId] === 2;
    });
  };
}
