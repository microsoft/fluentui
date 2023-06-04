import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition } from '@floating-ui/dom';
import { PopoverAlignment, PopoverPosition } from './popover.options.js';
import { toFloatingUIPlacement } from './toFloatingUIPlacement.js';

/* Fixme: this is temporary debugging code. Will be removed before merging together with all console.* calls in the file.  */
let nextEmoji = 0;
const getNextEmoji = () => {
  // prettier-ignore
  const emojis = ['🍇', '🍉', '🍊', '🍋', '🍌', '🍍', '🥭', '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🫐', '🥝', '🍅', '🫒', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶', '🫑', '🧄', '🥨', '🚌'];

  return emojis[nextEmoji++ % emojis.length];
};

export class Popover extends FASTElement {
  public objId = getNextEmoji();

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

    this.setNewAnchor();

    console.groupEnd();
  }

  @attr
  public anchor?: string;

  protected anchorChanged() {
    console.group(this.objId, 'anchorChanged');

    this.setNewAnchor();

    console.groupEnd();
  }

  private setNewAnchor() {
    console.group(this.objId, 'setNewAnchor');

    // Anchor by id takes precedence
    if (this.anchor) {
      const anchorById = this.getRootNode().getElementById?.(this.anchor);
      if (anchorById) {
        this.anchorElement = anchorById;
        console.groupEnd();
        return;
      }
    }

    // Use slotted anchor if available
    if (this.anchorRef?.[0]) {
      this.anchorElement = this.anchorRef[0];
      console.groupEnd();
      return;
    }

    this.anchorElement = null;

    console.groupEnd();
  }

  @observable
  private anchorElement: Element | null = null;

  protected anchorElementChanged() {
    console.group(this.objId, 'anchorElementChanged');
    console.log('ANCHOR ELEMENT', this.anchorElement);
    // ref might have changed -> force restart
    this.handlePositioningStartStop(true);

    console.groupEnd();
  }

  /**
   * @internal
   * List of child popovers nested inside this popover.
   * Used to avoid closing this popover on ESC key press when a child popover is open.
   */
  private childPopovers: Popover[] = [];

  /**
   * @internal
   * Called by child popovers in their connectedCallback to register themselves.
   */
  protected registerChildPopover(popover: Popover) {
    this.childPopovers.push(popover);
  }

  /**
   * @internal
   * Called by child popovers in their disconnectedCallback to unregister themselves.
   */
  protected unregisterChildPopover(popover: Popover) {
    this.childPopovers = this.childPopovers.filter(x => x !== popover);
  }

  /**
   * @internal
   * Traverses the DOM tree upwards, crossing shadow root boundaries, to find the first parent Popover.
   */
  private getParentPopover(): Popover | undefined {
    let parent = this.parentNode;
    while (parent) {
      console.log(parent);
      if (parent instanceof Popover) {
        return parent;
      }
      parent = parent.parentNode ?? (parent as ShadowRoot).host;
    }
  }

  public connectedCallback() {
    super.connectedCallback();

    const parentPopover = this.getParentPopover();
    if (parentPopover) {
      parentPopover.registerChildPopover(this);
    }
    console.group(this.objId, 'connectedCallback', { parentPopover });

    // the component might have been mounted with `open` set to true
    this.handlePositioningStartStop();

    console.groupEnd();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    console.group(this.objId, 'disconnectedCallback');

    this.handlePositioningStartStop();

    const parentPopover = this.getParentPopover();
    if (parentPopover) {
      parentPopover.unregisterChildPopover(this);
    }

    console.groupEnd();
  }

  private isPositioningStarted = false;
  private autoUpdateCleanup: (() => void) | undefined;
  private handlePositioningStartStop(forceRestart: boolean = false) {
    const shouldStart =
      (this as FASTElement).$fastController.isConnected && this.open && this.popoverContentRef && this.anchorElement;

    console.log(this.objId, 'handlePositioningStartStop', {
      open: this.open,
      connected: (this as FASTElement).$fastController.isConnected,
      anchorElement: this.anchorElement,
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
      anchorElement: this.anchorElement,
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
      anchorElement: this.anchorElement,
      popoverContentRef: this.popoverContentRef,
    });

    this.stopAutoUpdate();
    this.isPositioningStarted = false;
  }

  private startAutoUpdate() {
    this.autoUpdateCleanup = autoUpdate(this.anchorElement!, this.popoverContentRef!, this.updatePosition);
    document.addEventListener('click', this.handleOutsideClick, true);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    this.updatePosition();
  }

  // @FIXME: If there are nested popovers and the outer one closes, nothing stops the autoUpdate on the inner one.
  //        As a consequence, the Floating autoUpdate is still running and the listeners are still attached.
  //        This does not happen in a simple case (when the outer popover is closed by an outside click),
  //        as the inner popover is stopped by its outside click handler.
  private stopAutoUpdate() {
    if (this.autoUpdateCleanup) {
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      document.removeEventListener('click', this.handleOutsideClick, true);
      console.log(this.objId, 'stopAutoUpdate', { openedChildren: this.childPopovers.filter(x => x.open).length });
      this.autoUpdateCleanup();
    }
    this.autoUpdateCleanup = undefined;
  }

  private handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const path = e.composedPath();
    const isOutsideContent = !this.popoverContentRef || path.indexOf(this.popoverContentRef) < 0;
    const isOutsideAnchor = !this.anchorElement || path.indexOf(this.anchorElement) < 0;

    if (isOutsideContent && isOutsideAnchor) {
      console.log(this.objId, 'handleOutsideClick - should close', {
        target,
        popoverContentRef: this.popoverContentRef,
      });
      this.$emit('dismiss');
    } else {
      console.log(this.objId, 'handleOutsideClick - should NOT close');
    }
  };

  private handleDocumentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      const hasOpenChild = this.childPopovers.some(x => x.open);
      if (!hasOpenChild) {
        this.$emit('dismiss');
      }
    }
  };

  /**
   * Alignment for the component. Only has an effect if used with the @see position option
   *
   * @public
   * @default center
   * @remarks
   * HTML Attribute: popover-align
   */
  @attr({
    attribute: 'popover-align',
  }) /* the attribute cannot be named 'align' because that is an intrinsic DOM attribute */
  public popoverAlign?: PopoverAlignment;
  protected popoverAlignChanged() {
    console.group(this.objId, 'popoverAlignChanged');

    this.handlePositioningStartStop(true);

    console.groupEnd();
  }

  /**
   * Position for the component. Position has higher priority than popoverAlign. If position is vertical ('above' | 'below')
   * and popoverAlign is also vertical ('top' | 'bottom') or if both position and popoverAlign are horizontal ('before' | 'after'
   * and 'start' | 'end' respectively),
   * then provided value for 'popoverAlign' will be ignored and 'center' will be used instead.
   *
   * @public
   * @default above
   * @remarks
   * HTML Attribute: position
   */
  @attr
  public position?: PopoverPosition;
  protected positionChanged() {
    console.group(this.objId, 'positionChanged');

    this.handlePositioningStartStop(true);

    console.groupEnd();
  }

  private updatePosition = () => {
    if (!this.anchorElement || !this.popoverContentRef) {
      return;
    }

    const placement = toFloatingUIPlacement(
      this.popoverAlign,
      this.position,
      window.getComputedStyle((this as unknown) as HTMLElement).direction === 'rtl',
    );
    console.log(this.objId, 'updatePosition', {
      placement,
    });
    computePosition(this.anchorElement, this.popoverContentRef, {
      placement,
      // strategy: 'fixed',
    }).then(({ x, y, middlewareData, placement }) => {
      // This originally used left/top but that caused the nested popovers to be positioned incorrectly on the first open.
      Object.assign(this.popoverContentRef!.style, { transform: `translate3d(${x}px, ${y}px, 0)` });
    });
  };
}
