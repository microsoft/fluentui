import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition } from '@floating-ui/dom';
import { PopoverPosition } from './popover.options.js';

let nextEmoji = 0;
const getNextEmoji = () => {
  // prettier-ignore
  const emojis = ['🍇', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🫐', '🥝', '🍅', '🫒', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶', '🫑', '🧄', '🥨', '🚌'];

  return emojis[nextEmoji++ % emojis.length];
};

export class Popover extends FASTElement {
  private objId = getNextEmoji();

  public constructor() {
    super();
    console.log(this.objId, 'constructor', { open: this.open });
  }

  @attr({ mode: 'boolean' })
  public open: boolean = false;

  protected openChanged() {
    console.group(this.objId, 'openChanged');

    // `open` has been set to true, anchor and popover element might already be in DOM (perhaps subsequent open)
    this.handlePositioningStartStop();
    console.groupEnd();
  }

  @observable
  public popoverContentRef?: FASTElement; // @FIXME: what type?

  protected popoverContentRefChanged() {
    console.group(this.objId, 'popoverContentRefChanged');

    // ref might have changed -> force restart
    this.handlePositioningStartStop(true);

    console.groupEnd();
  }

  @observable
  public anchorRef?: HTMLElement[];

  protected anchorRefChanged() {
    console.group(this.objId, 'anchorRefChanged');

    // ref might have changed -> force restart
    this.handlePositioningStartStop(true);

    console.groupEnd();
  }

  public connectedCallback() {
    super.connectedCallback();
    console.group(this.objId, 'connectedCallback');

    // the component might have been mounted with `open` set to true
    this.handlePositioningStartStop();

    console.groupEnd();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    console.group(this.objId, 'disconnectedCallback');

    this.handlePositioningStartStop();

    console.groupEnd();
  }

  private isPositioningStarted = false;
  private autoUpdateCleanup: (() => void) | undefined;
  private handlePositioningStartStop(forceRestart: boolean = false) {
    const shouldStart =
      (this as FASTElement).$fastController.isConnected && this.open && this.popoverContentRef && !!this.anchorRef?.[0];

    console.log(this.objId, 'handlePositioningStartStop', {
      open: this.open,
      connected: (this as FASTElement).$fastController.isConnected,
      anchorRef: this.anchorRef,
      popoverContentRef: this.popoverContentRef,
      shouldStart,
      positioningStarted: this.isPositioningStarted,
      forceRestart,
    });

    if (shouldStart) {
      if (this.isPositioningStarted) {
        if (!forceRestart) {
          console.log(this.objId, 'positioning already started, skipping');
          return;
        }
        this.stopPositioning();
      }
      this.startPositioning();
    } else {
      if (this.isPositioningStarted) {
        this.stopPositioning();
      }
    }
  }

  private startPositioning() {
    console.log(this.objId, 'startPositioning', {
      open: this.open,
      connected: (this as FASTElement).$fastController.isConnected,
      anchorRef: this.anchorRef,
      popoverContentRef: this.popoverContentRef,
    });

    this.stopAutoUpdate();

    // wait for the anchor and popover to be in the DOM
    Updates.enqueue(() => {
      this.startAutoUpdate();
      this.isPositioningStarted = true;
    });
  }

  private stopPositioning() {
    console.log(this.objId, 'stopPositioning', {
      open: this.open,
      connected: (this as FASTElement).$fastController.isConnected,
      anchorRef: this.anchorRef,
      popoverContentRef: this.popoverContentRef,
    });

    this.stopAutoUpdate();
    this.isPositioningStarted = false;
  }

  private startAutoUpdate() {
    this.autoUpdateCleanup = autoUpdate(this.anchorRef![0], this.popoverContentRef!, this.updatePosition);
  }

  private stopAutoUpdate() {
    this.autoUpdateCleanup?.();
    this.autoUpdateCleanup = undefined;
  }

  @attr
  public position: PopoverPosition = 'top';
  protected positionChanged() {
    console.group(this.objId, 'positionChanged');

    this.handlePositioningStartStop(true);

    console.groupEnd();
  }

  private updatePosition = () => {
    if (!this.anchorRef?.[0] || !this.popoverContentRef) {
      return;
    }
    computePosition(this.anchorRef[0], this.popoverContentRef, {
      placement: this.position,
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign(this.popoverContentRef!.style, { left: `${x}px`, top: `${y}px` });
    });
  };
}
