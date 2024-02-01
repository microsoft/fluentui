import { attr, FASTElement, observable } from '@microsoft/fast-element';

export const PositioningShorthand = {
  aboveStart: 'above-start',
  aboveCenter: 'above-center',
  aboveEnd: 'above-end',
  endTop: 'end-top',
  endMiddle: 'end-middle',
  endBottom: 'end-bottom',
  belowStart: 'below-start',
  belowCenter: 'below-center',
  belowEnd: 'below-end',
  startTop: 'start-top',
  startMiddle: 'start-middle',
  startBottom: 'start-bottom',
} as const;

type PositioningShorthand = typeof PositioningShorthand[keyof typeof PositioningShorthand];

interface HTMLPopoverElement extends HTMLElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
}

export class Popover extends FASTElement {
  /**
   * open
   */
  @attr({ mode: 'boolean' })
  open: boolean = false;

  /**
   * openChanged
   */
  openChanged() {
    if (this.open) {
      this.popoverReference?.showPopover();
    } else {
      this.popoverReference?.hidePopover();
    }
  }

  @attr
  mode: 'manual' | 'auto' = 'auto';

  /**
   * position
   */
  @attr
  position: PositioningShorthand = PositioningShorthand.belowCenter;

  /**
   * anchorReferences
   */
  @observable
  anchorReferences: HTMLElement[] | undefined;
  anchorReferencesChanged() {
    this.initializeTargetId();
    this.addAnchorAttributes();
    this.addAnchorEventListeners();

    // anchor loads last
    if (this.open) {
      console.log('showing popover');
      this.popoverReference?.showPopover();
    } else {
      this.popoverReference?.hidePopover();
    }
  }

  /**
   * popoverReference
   */
  @observable
  popoverReference: HTMLPopoverElement | undefined;
  popoverReferenceChanged() {
    if (this.popoverReference) {
      this.addPopoverEventListeners();
    }
  }

  /**
   * targetId
   */
  @attr({ attribute: 'target-id' })
  targetId: string | undefined;

  /**
   * anchorId
   */
  @attr({ attribute: 'anchor-id' })
  anchorId: string | undefined;

  @observable
  overflowBoundary: Element | null | undefined;
  overflowBoundaryChanged() {
    this.addOverflowBoundaryEventListeners();
  }

  /**
   * overflowBoundarySelector
   *
   * @remarks the selector defines the boundary container of the popover for use in repositioning the floating popover
   */
  @attr({ attribute: 'overflow-boundary-selector' })
  overflowBoundarySelector: string | undefined;

  /**
   * registerOverflowBoundary
   */
  registerOverflowBoundary() {
    if (this.overflowBoundarySelector) {
      this.overflowBoundary = document.querySelector(this.overflowBoundarySelector);
    }
  }

  /**
   * applyPopoverPolyfill
   */
  applyPopoverPolyfill() {
    if (!HTMLElement.prototype.hasOwnProperty('popover')) {
      console.log('setting popover polyfill');
      import('@oddbird/popover-polyfill');
    }
  }

  /**
   * initializeTargetId
   */
  initializeTargetId() {
    if (!this.targetId) {
      this.targetId = 'popover-target';
    }
  }

  /**
   * addAnchorAttributes
   */
  addAnchorAttributes() {
    if (this.anchorReferences && this.anchorReferences.length > 0 && this.targetId) {
      this.anchorReferences[0].setAttribute('popovertarget', this.targetId);
    }
  }

  /**
   * addAnchorEventListeners
   */
  addAnchorEventListeners() {
    if (this.anchorReferences && this.anchorReferences.length) {
      this.anchorReferences[0].addEventListener('click', this.togglePopover);
    }
  }

  addOverflowBoundaryEventListeners() {
    if (this.overflowBoundary) {
      this.overflowBoundary.addEventListener('scroll', this.updatePopoverPosition);
    }
  }

  /**
   * togglePopover
   */
  togglePopover = () => {
    this.popoverReference?.togglePopover();
  };

  addPopoverEventListeners() {
    if (this.popoverReference) {
      this.popoverReference.addEventListener('toggle', () => {
        this.registerOverflowBoundary();
        this.updatePopoverPosition();
        // this.open = !this.open;
      });
    }
  }

  /**
   * intersectionObserver
   *
   * used for tracking the overflow of the popover on ui changes
   */
  intersectionObserver: IntersectionObserver | undefined;

  /**
   * createOverflowHandler
   *
   * handles the overflow of the popover based on the overflowBoundarySelector
   */
  createOverflowHandler = () => {
    const options: IntersectionObserverInit = {};
    if (this.overflowBoundary) {
      options.root = this.overflowBoundary;
    }
    this.intersectionObserver = new IntersectionObserver(this.updatePopoverPosition, options);
  };

  /**
   * handleOverflow
   */
  handleOverflow(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.updatePopoverPosition();
      }
    });
  }

  /**
   * updatePosition
   *
   * updates the position of the popover based on popover collisions
   */
  updatePopoverPosition = () => {
    this.applyPopoverCssPositioning();
  };

  calculateModifiedPopoverPosition() {
    if (this.anchorReferences && this.popoverReference) {
      const anchorRect = this.anchorReferences[0].getBoundingClientRect();
      let modifiedPositionX = anchorRect?.x;
      let modifiedPositionY = anchorRect?.y;

      // console.log('anchorRect', anchorRect);

      switch (this.position) {
        case PositioningShorthand.aboveStart:
          modifiedPositionY = modifiedPositionY - anchorRect.height;
          break;
        case PositioningShorthand.aboveCenter:
          modifiedPositionY = modifiedPositionY - anchorRect.height;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width) / 2;
          break;
        case PositioningShorthand.aboveEnd:
          modifiedPositionY = modifiedPositionY - anchorRect.height;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width);
          break;
        case PositioningShorthand.endTop:
          modifiedPositionX = modifiedPositionX + anchorRect.width;
          modifiedPositionY = modifiedPositionY + this.popoverReference.scrollHeight - anchorRect.height;
          break;
        case PositioningShorthand.endMiddle:
          modifiedPositionX = modifiedPositionX + anchorRect.width;
          modifiedPositionY = modifiedPositionY + (this.popoverReference.scrollHeight - anchorRect.height) / 2;
          break;
        case PositioningShorthand.endBottom:
          modifiedPositionX = modifiedPositionX + anchorRect.width;
          break;
        case PositioningShorthand.belowStart:
          modifiedPositionY = modifiedPositionY + this.popoverReference.scrollHeight;
          break;
        case PositioningShorthand.belowCenter:
          modifiedPositionY = modifiedPositionY + this.popoverReference.scrollHeight;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width) / 2;
          break;
        case PositioningShorthand.belowEnd:
          modifiedPositionY = modifiedPositionY + this.popoverReference.scrollHeight;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width);
          break;
        case PositioningShorthand.startTop:
          modifiedPositionX = modifiedPositionX - this.popoverReference.scrollWidth;
          modifiedPositionY = modifiedPositionY + this.popoverReference.scrollHeight - anchorRect.height;
          break;
        case PositioningShorthand.startMiddle:
          modifiedPositionX = modifiedPositionX - this.popoverReference.scrollWidth;
          modifiedPositionY = modifiedPositionY + (this.popoverReference.scrollHeight - anchorRect.height) / 2;
          break;
        case PositioningShorthand.startBottom:
          modifiedPositionX = modifiedPositionX - this.popoverReference.scrollWidth;
          modifiedPositionX = modifiedPositionX + anchorRect.width;
          break;
        default:
          break;
      }
      return { x: modifiedPositionX, y: modifiedPositionY };
    }

    return { x: 0, y: 0 };
  }

  applyPopoverCssPositioning() {
    if (this.popoverReference) {
      const anchorRect = this.anchorReferences?.[0].getBoundingClientRect();

      if (anchorRect) {
        const { x, y } = this.calculateModifiedPopoverPosition();
        this.popoverReference.style.left = `${x}px`;
        this.popoverReference.style.top = `${y}px`;
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.applyPopoverPolyfill();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
