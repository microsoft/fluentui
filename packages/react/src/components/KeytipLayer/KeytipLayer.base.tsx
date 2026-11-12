import * as React from 'react';
import { getLayerStyles } from './KeytipLayer.styles';
import { Keytip } from '../../Keytip';
import { Layer } from '../../Layer';
import {
  classNamesFunction,
  getDocument,
  arraysEqual,
  warn,
  isMac,
  EventGroup,
  Async,
  initializeComponentRef,
  KeyCodes,
  isElementVisibleAndNotHidden,
} from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { KeytipTree } from './KeytipTree';
import {
  ktpTargetFromId,
  ktpTargetFromSequences,
  sequencesToID,
  mergeOverflows,
} from '../../utilities/keytips/KeytipUtils';
import { transitionKeysContain } from '../../utilities/keytips/IKeytipTransitionKey';
import { KeytipEvents, KTP_LAYER_ID, KTP_ARIA_SEPARATOR } from '../../utilities/keytips/KeytipConstants';
import type { IKeytipLayerProps, IKeytipLayerStyles, IKeytipLayerStyleProps } from './KeytipLayer.types';
import type { IKeytipProps } from '../../Keytip';
import type { IKeytipTreeNode } from './IKeytipTreeNode';
import type { KeytipTransitionModifier, IKeytipTransitionKey } from '../../utilities/keytips/IKeytipTransitionKey';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx, getWindowEx } from '../../utilities/dom';

import type { JSXElement } from '@fluentui/utilities';

export interface IKeytipLayerState {
  inKeytipMode: boolean;
  keytips: IKeytipProps[];
  visibleKeytips: IKeytipProps[];
}

// Default sequence is Alt-Windows (Alt-Meta) in Windows, Option-Control (Alt-Control) in Mac
const defaultStartSequence: IKeytipTransitionKey = {
  key: isMac() ? 'Control' : 'Meta',
  modifierKeys: [KeyCodes.alt],
};

// Default exit sequence is the same as the start sequence
const defaultExitSequence: IKeytipTransitionKey = defaultStartSequence;

// Default return sequence is Escape
const defaultReturnSequence: IKeytipTransitionKey = {
  key: 'Escape',
};

const getClassNames = classNamesFunction<IKeytipLayerStyleProps, IKeytipLayerStyles>();

/**
 * A layer that holds all keytip items
 * {@docCategory Keytips}
 */
export class KeytipLayerBase extends React.Component<IKeytipLayerProps, IKeytipLayerState> {
  public static defaultProps: IKeytipLayerProps = {
    keytipStartSequences: [defaultStartSequence],
    keytipExitSequences: [defaultExitSequence],
    keytipReturnSequences: [defaultReturnSequence],
    content: '',
  };

  public static contextType = WindowContext;
  public context: any;

  private _events: EventGroup;
  private _activationEvents?: EventGroup;
  private _async: Async;

  private _keytipTree: KeytipTree;

  private _keytipManager: KeytipManager = KeytipManager.getInstance();
  private _classNames: { [key in keyof IKeytipLayerStyles]: string };
  private _currentSequence: string;
  private _newCurrentKeytipSequences?: string[];

  private _delayedKeytipQueue: string[] = [];
  private _delayedQueueTimeout: number;

  private _keyHandled = false;

  private _activationKey?: string;
  private _pendingActivation?: IKeytipTransitionKey;
  private _consumeActivationKeyUp?: string;
  private _exitingActivationKey?: string;
  private _consecutiveActivationEligible = false;
  private _isComposing = false;
  private _handledKeyDowns = new WeakSet<React.KeyboardEvent<HTMLElement>>();
  private _pendingKeyDowns = new Set<React.KeyboardEvent<HTMLElement>>();

  constructor(props: IKeytipLayerProps, context: any) {
    super(props, context);

    initializeComponentRef(this);
    this._events = new EventGroup(this);
    this._async = new Async(this);

    const keytips = this._keytipManager.getKeytips();

    this.state = {
      inKeytipMode: false,
      keytips,
      visibleKeytips: this._getVisibleKeytips(keytips),
    };

    this._buildTree();

    this._currentSequence = '';

    // Add keytip listeners
    this._events.on(this._keytipManager, KeytipEvents.KEYTIP_ADDED, this._onKeytipAdded);
    this._events.on(this._keytipManager, KeytipEvents.KEYTIP_UPDATED, this._onKeytipUpdated);
    this._events.on(this._keytipManager, KeytipEvents.KEYTIP_REMOVED, this._onKeytipRemoved);
    this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_ADDED, this._onPersistedKeytipAdded);
    this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_REMOVED, this._onPersistedKeytipRemoved);
    this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, this._onPersistedKeytipExecute);
  }

  public render(): JSXElement {
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
    const win = getWindowEx(this.context);
    // Add window listeners
    this._events.on(win, 'mouseup', this._onDismiss, true /* useCapture */);
    this._events.on(win, 'pointerup', this._onDismiss, true /* useCapture */);
    this._events.on(win, 'resize', this._onDismiss);
    this._events.on(win, 'keydown', this._onKeyDown, true /* useCapture */);
    this._events.on(win, 'keypress', this._onKeyPress, true /* useCapture */);
    this._events.on(win, 'scroll', this._onDismiss, true /* useCapture */);

    if (this.props.keytipActivationBehavior) {
      this._updateActivationListeners();
    }

    // Add keytip listeners
    this._events.on(this._keytipManager, KeytipEvents.ENTER_KEYTIP_MODE, this._enterKeytipMode);
    this._events.on(this._keytipManager, KeytipEvents.EXIT_KEYTIP_MODE, this._exitKeytipMode);
  }

  public componentDidUpdate(prevProps: IKeytipLayerProps): void {
    const behavior = this.props.keytipActivationBehavior;
    if (!!prevProps.keytipActivationBehavior !== !!behavior) {
      this._updateActivationListeners();
    }
    if ((behavior && this.props.enabled === false) || (prevProps.keytipActivationBehavior && !behavior)) {
      if (this._keytipTree.currentKeytip) {
        this._exitKeytipMode();
      }
      this._resetActivationGesture();
      this._isComposing = false;
    }
  }

  public componentWillUnmount(): void {
    if (this.props.keytipActivationBehavior) {
      this._resetActivationGesture();
      this._keytipManager.inKeytipMode = false;
      this._keytipManager.getKeytips().forEach(keytip => (keytip.visible = false));
    }
    this._activationEvents?.dispose();
    this._async.dispose();
    this._events.dispose();
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
      if (this.props.keytipActivationBehavior) {
        this._keyHandled = !!this._enterKeytipMode(transitionKey);
        if (this._keyHandled) {
          this._warnIfDuplicateKeytips();
        }
      } else {
        this._keyHandled = true;
        this._enterKeytipMode(transitionKey);
        this._warnIfDuplicateKeytips();
      }
    }
  }

  /**
   * Processes inputs from the document listener and traverse the keytip tree
   *
   * @param key - Key pressed by the user
   */
  public processInput(key: string, ev?: React.KeyboardEvent<HTMLElement>): 'handled' | 'partial' | 'unmatched' | void {
    // Concat the input key with the current sequence
    const behavior = this.props.keytipActivationBehavior;
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
          if (behavior && !currKtp) {
            this._currentSequence = '';
            return 'handled';
          }
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
        return behavior ? 'handled' : undefined;
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
        return behavior ? 'partial' : undefined;
      }
    }
    return behavior ? 'unmatched' : undefined;
  }

  /**
   * Show the given keytips and hide all others
   *
   * @param ids - Keytip IDs to show
   */
  public showKeytips(ids: string[]): void {
    // Update the visible prop in the manager
    for (const keytip of this._keytipManager.getKeytips()) {
      let keytipId = sequencesToID(keytip.keySequences);
      if (keytip.overflowSetSequence) {
        // Check if the ID with the overflow is the keytip we're looking for
        keytipId = sequencesToID(mergeOverflows(keytip.keySequences, keytip.overflowSetSequence));
      }
      if (ids.indexOf(keytipId) >= 0) {
        keytip.visible = true;
      } else {
        keytip.visible = false;
      }
    }
    // Apply the manager changes to the Layer state
    this._setKeytips();
  }

  private _updateActivationListeners(): void {
    if (this.props.keytipActivationBehavior) {
      const win = getWindowEx(this.context);
      this._activationEvents = new EventGroup(this);
      this._activationEvents.on(win, 'keydown', this._onKeyDownBubble);
      this._activationEvents.on(win, 'keyup', this._onKeyUp, true /* useCapture */);
      this._activationEvents.on(win, 'blur', this._onBlur);
      this._activationEvents.on(win, 'compositionstart', this._onCompositionStart, true /* useCapture */);
      this._activationEvents.on(win, 'compositionend', this._onCompositionEnd, true /* useCapture */);
    } else {
      this._activationEvents?.dispose();
      this._activationEvents = undefined;
    }
  }

  /**
   * Enters keytip mode for this layer
   */
  private _enterKeytipMode(
    transitionKey?: IKeytipTransitionKey,
    ev?: React.KeyboardEvent<HTMLElement>,
  ): boolean | void {
    const behavior = this.props.keytipActivationBehavior;
    if ((!behavior || this.props.enabled !== false) && this._keytipManager.shouldEnterKeytipMode) {
      if (behavior) {
        this._resetActivationGesture(false);
      }
      if (this._keytipManager.delayUpdatingKeytipChange) {
        this._buildTree();
        this._setKeytips();
      }
      this._keytipTree.currentKeytip = this._keytipTree.root;
      // Show children of root
      this.showKeytips(this._keytipTree.getChildren());

      this._setInKeytipMode(true /* inKeytipMode */);

      if (ev && transitionKey && behavior) {
        const modifierOnly = this._isModifierKey(transitionKey.key) && !transitionKey.modifierKeys;
        if (modifierOnly) {
          this._activationKey = transitionKey.key;
          this._consecutiveActivationEligible = true;
        }
        // Host callbacks may transfer focus, exit, or replace the layer. Claim the gesture first.
        if (behavior.consumeActivationEvent) {
          this._consumeKeyEvent(ev);
        }
      }

      if (this.props.onEnterKeytipMode) {
        this.props.onEnterKeytipMode(transitionKey);
      }
      return behavior ? true : undefined;
    }
    return behavior ? false : undefined;
  }

  private _buildTree(): void {
    this._keytipTree = new KeytipTree();
    // Add regular and persisted keytips to the tree
    for (const id of Object.keys(this._keytipManager.keytips)) {
      const uniqueKeytip = this._keytipManager.keytips[id];
      this._keytipTree.addNode(uniqueKeytip.keytip, uniqueKeytip.uniqueID);
    }

    for (const id of Object.keys(this._keytipManager.persistedKeytips)) {
      const uniqueKeytip = this._keytipManager.persistedKeytips[id];
      this._keytipTree.addNode(uniqueKeytip.keytip, uniqueKeytip.uniqueID);
    }
  }

  /**
   * Exits keytip mode for this layer
   */
  private _exitKeytipMode(ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>): void {
    if (this.props.keytipActivationBehavior) {
      // Preserve the exiting gesture until release, even when activation passes through.
      this._resetActivationGesture(false);
    }
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
      overflowKeytipNode.onExecute(
        this._getKtpExecuteTarget(overflowKeytipNode),
        this._getKtpTarget(overflowKeytipNode),
      );
    }
  }

  private _getVisibleKeytips(keytips: IKeytipProps[]): IKeytipProps[] {
    // Filter out non-visible keytips and duplicates
    const seenIds: { [childSequence: string]: number } = {};
    return keytips.filter(keytip => {
      let keytipId = sequencesToID(keytip.keySequences);
      if (keytip.overflowSetSequence) {
        // Account for overflow set sequences when checking for duplicates
        keytipId = sequencesToID(mergeOverflows(keytip.keySequences, keytip.overflowSetSequence));
      }
      seenIds[keytipId] = seenIds[keytipId] ? seenIds[keytipId] + 1 : 1;

      // Return true only if the keytip is visible and the corresponding target is also visible
      return keytip.visible && this._isKeytipInstanceTargetVisible(keytip.keySequences, seenIds[keytipId]);
    });
  }

  private _isKeytipInstanceTargetVisible = (keySequences: string[], instanceCount: number): boolean => {
    const doc = getDocumentEx(this.context);
    const win = getWindowEx(this.context);
    const targetSelector = ktpTargetFromSequences(keySequences);
    const matchingElements = doc?.querySelectorAll(targetSelector) ?? [];

    // If there are multiple elements for the keytip sequence, return true if the element instance
    // that corresponds to the keytip instance is visible, otherwise return if there is only one instance
    return matchingElements.length > 1 && instanceCount <= matchingElements.length
      ? isElementVisibleAndNotHidden(matchingElements[instanceCount - 1] as HTMLElement, win ?? undefined)
      : instanceCount === 1;
  };

  private _onDismiss = (ev?: React.MouseEvent<HTMLElement>): void => {
    // if we are in keytip mode, then exit keytip mode
    if (this.state.inKeytipMode) {
      this._exitKeytipMode(ev);
    }
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    this._keyHandled = false;
    if (this.props.keytipActivationBehavior) {
      this._onActivationKeyDown(ev);
      return;
    }
    // using key since which has been deprecated and key is now widely suporrted.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which
    let key = ev.key;
    switch (key) {
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

  private _normalizeKey(key: string): string {
    return key === 'Esc' ? 'Escape' : key === 'OS' || key === 'Win' ? 'Meta' : key;
  }

  private _isModifierKey(key: string): boolean {
    return key === 'Alt' || key === 'Control' || key === 'Shift' || key === 'Meta' || key === 'AltGraph';
  }

  private _isModifierHeld(key: string | undefined, ev: React.KeyboardEvent<HTMLElement>): boolean {
    switch (key) {
      case 'Alt':
        return ev.altKey;
      case 'Control':
        return ev.ctrlKey;
      case 'Shift':
        return ev.shiftKey;
      case 'Meta':
        return ev.metaKey;
      default:
        return false;
    }
  }

  private _isIgnoredKeyboardEvent(ev: React.KeyboardEvent<HTMLElement>): boolean {
    return (
      this._isComposing ||
      ev.nativeEvent?.isComposing ||
      ('isComposing' in ev && ev.isComposing === true) ||
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- Legacy IME events use keyCode 229.
      ev.keyCode === 229 ||
      ev.key === 'Process' ||
      ev.key === 'AltGraph' ||
      ev.getModifierState?.('AltGraph') ||
      (ev.altKey && ev.ctrlKey)
    );
  }

  private _consumeKeyEvent(ev: React.KeyboardEvent<HTMLElement>): void {
    ev.preventDefault();
    ev.stopPropagation();
  }

  private _resetActivationGesture(resetKeyUp = true): void {
    this._activationKey = undefined;
    this._pendingActivation = undefined;
    this._consecutiveActivationEligible = false;
    this._pendingKeyDowns.clear();
    if (resetKeyUp) {
      this._consumeActivationKeyUp = undefined;
      this._exitingActivationKey = undefined;
    }
  }

  private _onActivationKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    const behavior = this.props.keytipActivationBehavior!;
    const key = this._normalizeKey(ev.key);
    const transitionKey: IKeytipTransitionKey = { key, modifierKeys: this._getModifierKey(key, ev) };

    const keytipsAllowed = this.props.enabled !== false && this._keytipManager.shouldEnterKeytipMode;
    if (this._isIgnoredKeyboardEvent(ev) || !keytipsAllowed) {
      if (this._keytipTree.currentKeytip) {
        this._exitKeytipMode(ev);
      }
      this._resetActivationGesture();
      return;
    }

    if (
      this._consumeActivationKeyUp &&
      key !== this._consumeActivationKeyUp &&
      !this._isModifierHeld(this._consumeActivationKeyUp, ev)
    ) {
      this._consumeActivationKeyUp = undefined;
    }

    if (
      this._exitingActivationKey &&
      ((key === this._exitingActivationKey && !ev.repeat) || !this._isModifierHeld(this._exitingActivationKey, ev))
    ) {
      this._exitingActivationKey = undefined;
    }

    if (this._pendingActivation && key !== this._pendingActivation.key) {
      // Any other key makes this a chord, not a standalone modifier tap.
      this._pendingActivation = undefined;
    }

    const isStart = transitionKeysContain(this.props.keytipStartSequences!, transitionKey);

    if (!this._isModifierKey(key)) {
      this._consecutiveActivationEligible = false;
    }

    if (isStart && this._isModifierKey(key) && !transitionKey.modifierKeys) {
      this._handledKeyDowns.add(ev);
      if (ev.repeat) {
        if (this._consumeActivationKeyUp === key) {
          this._consumeKeyEvent(ev);
        }
        return;
      }

      if (this._keytipTree.currentKeytip) {
        const passThrough =
          behavior.consecutiveActivationBehavior === 'exitAndPassThrough' &&
          this._activationKey === key &&
          this._consecutiveActivationEligible;
        this._consumeActivationKeyUp = undefined;
        if (!passThrough && behavior.consumeActivationEvent) {
          this._consumeActivationKeyUp = key;
          this._consumeKeyEvent(ev);
        }
        this._exitingActivationKey = key;
        this._exitKeytipMode(ev);
      } else if (!ev.defaultPrevented && !this._exitingActivationKey) {
        this._pendingActivation = transitionKey;
        if (behavior.consumeActivationEvent) {
          this._consumeActivationKeyUp = key;
          this._consumeKeyEvent(ev);
        }
      }
      return;
    }

    if (!this._keytipTree.currentKeytip && isStart) {
      this._handledKeyDowns.add(ev);
      if (!this._exitingActivationKey && !ev.defaultPrevented && this._enterKeytipMode(transitionKey, ev)) {
        this._warnIfDuplicateKeytips();
      }
      return;
    }

    if (this._keytipTree.currentKeytip && !this._isModifierKey(key)) {
      this._pendingKeyDowns.add(ev);
      // A stopped event never reaches the bubble listener. Clear stale badges after app arbitration.
      this._async.setTimeout(() => {
        if (this._pendingKeyDowns.delete(ev) && this._keytipTree.currentKeytip) {
          this._exitKeytipMode(ev);
        }
      }, 0);
    }
  }

  private _onKeyDownBubble = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const behavior = this.props.keytipActivationBehavior;
    if (!behavior) {
      return;
    }
    this._pendingKeyDowns.delete(ev);
    if (this._handledKeyDowns.has(ev) || !this._keytipTree.currentKeytip) {
      return;
    }
    if (ev.defaultPrevented) {
      this._exitKeytipMode(ev);
      return;
    }

    const key = this._normalizeKey(ev.key);
    const transitionKey = { key, modifierKeys: this._getModifierKey(key, ev) };
    if (transitionKeysContain(this.props.keytipExitSequences!, transitionKey)) {
      if (behavior.consumeActivationEvent) {
        this._consumeKeyEvent(ev);
      }
      this._exitKeytipMode(ev);
      return;
    }
    this.processTransitionInput(transitionKey, ev);
    if (this._keyHandled) {
      this._consumeKeyEvent(ev);
      return;
    }
    if (this._isModifierKey(key)) {
      return;
    }

    const hasInputModifiers = ev.altKey || ev.ctrlKey || ev.metaKey || (ev.shiftKey && this._activationKey === 'Shift');
    if (hasInputModifiers) {
      this._exitKeytipMode(ev);
      return;
    }

    const result = key.length === 1 ? this.processInput(key.toLocaleLowerCase(), ev) : 'unmatched';
    if (result !== 'unmatched') {
      this._consumeKeyEvent(ev);
    } else if (
      behavior.unmatchedInputBehavior === 'exitAndPassThrough' ||
      [
        'Tab',
        'Enter',
        'Spacebar',
        ' ',
        'ArrowUp',
        'Up',
        'ArrowDown',
        'Down',
        'ArrowLeft',
        'Left',
        'ArrowRight',
        'Right',
      ].indexOf(key) >= 0
    ) {
      this._exitKeytipMode(ev);
    }
  };

  private _onKeyUp = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (!this.props.keytipActivationBehavior) {
      return;
    }
    if (
      this._isIgnoredKeyboardEvent(ev) ||
      this.props.enabled === false ||
      !this._keytipManager.shouldEnterKeytipMode
    ) {
      if (this._keytipTree.currentKeytip) {
        this._exitKeytipMode(ev);
      }
      this._resetActivationGesture();
      return;
    }
    const key = this._normalizeKey(ev.key);
    const pendingActivation = this._pendingActivation;
    const wasDefaultPrevented = ev.defaultPrevented;
    this._pendingActivation = undefined;
    if (this._consumeActivationKeyUp === key) {
      this._consumeActivationKeyUp = undefined;
      this._consumeKeyEvent(ev);
    }
    if (this._consumeActivationKeyUp && !this._isModifierHeld(this._consumeActivationKeyUp, ev)) {
      this._consumeActivationKeyUp = undefined;
    }
    if (this._exitingActivationKey === key || !this._isModifierHeld(this._exitingActivationKey, ev)) {
      this._exitingActivationKey = undefined;
    }
    if (!this._isModifierKey(key)) {
      this._consecutiveActivationEligible = false;
    }
    if (
      pendingActivation?.key === key &&
      !wasDefaultPrevented &&
      !this._isModifierHeld(key, ev) &&
      !this._getModifierKey(key, ev) &&
      transitionKeysContain(this.props.keytipStartSequences!, pendingActivation) &&
      this._enterKeytipMode(pendingActivation, ev)
    ) {
      this._warnIfDuplicateKeytips();
    }
  };

  private _onBlur = (): void => {
    if (this.props.keytipActivationBehavior) {
      if (this._keytipTree.currentKeytip) {
        this._exitKeytipMode();
      }
      this._resetActivationGesture();
      this._isComposing = false;
    }
  };

  private _onCompositionStart = (): void => {
    if (this.props.keytipActivationBehavior) {
      this._onBlur();
      this._isComposing = true;
    }
  };

  private _onCompositionEnd = (): void => {
    if (this.props.keytipActivationBehavior) {
      this._isComposing = false;
    }
  };

  /**
   * Gets the ModifierKeyCodes based on the keyboard event
   *
   * @param ev - React.KeyboardEvent
   * @returns List of ModifierKeyCodes that were pressed
   */
  private _getModifierKey(key: string, ev: React.KeyboardEvent<HTMLElement>): KeytipTransitionModifier[] | undefined {
    const modifierKeys: KeytipTransitionModifier[] = [];
    if (ev.altKey && key !== 'Alt') {
      modifierKeys.push(KeyCodes.alt);
    }
    if (ev.ctrlKey && key !== 'Control') {
      modifierKeys.push(KeyCodes.ctrl);
    }
    if (ev.shiftKey && key !== 'Shift') {
      modifierKeys.push(KeyCodes.shift);
    }
    if (ev.metaKey && key !== 'Meta') {
      modifierKeys.push(KeyCodes.leftWindow);
    }
    return modifierKeys.length ? modifierKeys : undefined;
  }

  private _onKeyPress = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (this.props.keytipActivationBehavior) {
      return;
    }
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
      // Ensure existing children are still shown.
      this._delayedKeytipQueue = this._delayedKeytipQueue.concat(this._keytipTree.currentKeytip?.children || []);

      this._addKeytipToQueue(sequencesToID(keytipProps.keySequences));

      // Ensure the child of currentKeytip is successfully added to currentKeytip's children and update it if not.
      // Note: Added this condition because KeytipTree.addNode was not always reflecting updates made to a parent node
      // in currentKeytip when that parent is the currentKeytip.
      if (
        this._keytipTree.currentKeytip &&
        this._keytipTree.currentKeytip.hasDynamicChildren &&
        this._keytipTree.currentKeytip.children.indexOf(keytipProps.id) < 0
      ) {
        const currNode = this._keytipTree.getNode(this._keytipTree.currentKeytip.id);
        if (currNode) {
          this._keytipTree.currentKeytip = currNode;
        }
      }
    }

    this._persistedKeytipChecks(keytipProps);
  };

  private _onKeytipUpdated = (eventArgs: any) => {
    const keytipProps = eventArgs.keytip;
    const uniqueID = eventArgs.uniqueID;
    this._keytipTree.updateNode(keytipProps, uniqueID);
    this._setKeytips();
    if (this._keytipTree.isCurrentKeytipParent(keytipProps)) {
      // Ensure existing children are still shown.
      this._delayedKeytipQueue = this._delayedKeytipQueue.concat(this._keytipTree.currentKeytip?.children || []);
      this._addKeytipToQueue(sequencesToID(keytipProps.keySequences));
    }

    this._persistedKeytipChecks(keytipProps);
  };

  /**
   * Helper function to do checks related to persisted/overflow keytips
   * Done on keytip added and keytip updated
   *
   * @param keytipProps - Keytip props
   */
  private _persistedKeytipChecks = (keytipProps: IKeytipProps) => {
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
          this._getKtpTarget(this._keytipTree.currentKeytip),
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
    if (
      currKtp &&
      (currKtp.overflowSetSequence || currKtp.persisted) &&
      arraysEqual(keytipProps.keySequences, currKtp.keySequences)
    ) {
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
    this.setState({ inKeytipMode });
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
   * Returns duplicates among keytip IDs.
   * If the returned array is empty, no duplicates were found.
   *
   * @param keytipIds - Array of keytip IDs to find duplicates for
   * @returns - Array of duplicates that were found. Each duplicate will only be added once to this array.
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
