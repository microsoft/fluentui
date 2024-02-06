import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

type CollisionEdge = 'top' | 'right' | 'bottom' | 'left';

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
   *
   * opens the popover. It's used to control the popover from the outside. However, it's not recommended to use this property to control the popover before load. To control the popover correctly, wait until the window has fully loaded before opening the popover.
   */
  openChanged() {
    if (this.open) {
      this.popoverReference?.showPopover();
    } else {
      this.popoverReference?.hidePopover();
    }
  }

  /**
   * mode
   * Sets the popover in auto mode which closes the popover when the user clicks outside of the popover. In manual mode, the popover will not close when the user clicks outside of the popover.
   */
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

  @attr
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * registerOverflowBoundary
   */
  registerOverflowBoundary = () => {
    if (this.overflowBoundarySelector) {
      this.overflowBoundary = document.querySelector(this.overflowBoundarySelector);
    }
  };

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
      const popoverId = uniqueId('popover-target-');
      this.targetId = popoverId;
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

  /**
   * addOverflowBoundaryEventListeners
   *
   * adds event listeners to the overflowBoundary if it exists. This is used to reposition the popover when the overflowBoundary is scrolled, like in the case of an overflowed scrollable container that has a popover as a child.
   */
  addOverflowBoundaryEventListeners() {
    if (this.overflowBoundary) {
      this.overflowBoundary.addEventListener('scroll', this.applyPopoverCssPositioning);
    }
  }

  /**
   * addWindowEventListeners
   */
  addWindowEventListeners() {
    window.addEventListener('resize', () => {
      this.observePopoverOverflow();
      this.applyPopoverCssPositioning();
    });
    window.addEventListener('scroll', this.applyPopoverCssPositioning);
  }

  /**
   * togglePopover
   */
  togglePopover = () => {
    this.popoverReference?.togglePopover();
  };

  addPopoverEventListeners() {
    if (this.popoverReference) {
      this.popoverReference.addEventListener('toggle', (event: any) => {
        this.registerOverflowBoundary();
        this.applyPopoverCssPositioning();

        this.createOverflowHandler();
        this.addWindowEventListeners();

        if (event.newState === 'open') {
          this.observePopoverOverflow();
          this.open = true;
        } else {
          this.open = false;
        }
      });
    }
  }

  /**
   * intersectionObserver
   *
   * used for tracking the overflow of the popover on ui changes
   */
  private intersectionObserver: IntersectionObserver | undefined;

  /**
   * createOverflowHandler
   *
   * handles the overflow of the popover based on the overflowBoundarySelector
   */
  createOverflowHandler = () => {
    // defaulting root to document. In the case where the overflowBoundary is not set, and the component is nested in an iframe the document will refer to the iframe document.
    const options: IntersectionObserverInit = { root: document };
    if (this.overflowBoundary) {
      options.root = this.overflowBoundary;
      options.rootMargin = '15px';
    }
    this.intersectionObserver = new IntersectionObserver(this.handleOverflow, options);
  };

  /**
   * handleOverflow
   */
  handleOverflow = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 1) {
        const collisionEdge = this.findIntersectingEdge(entry);
        if (collisionEdge) {
          this.repositionPopover(collisionEdge);
          this.applyPopoverCssPositioning();
        }
      }
    });
  };

  /**
   * findIntersectingEdge
   */
  findIntersectingEdge = (entry: IntersectionObserverEntry): undefined | CollisionEdge => {
    const targetRect = entry.boundingClientRect;
    const rootRect = entry.rootBounds;

    if (rootRect) {
      if (targetRect.bottom > rootRect.bottom) {
        return 'bottom';
      }
      if (targetRect.top < rootRect.top) {
        return 'top';
      }
      if (targetRect.left < rootRect.left) {
        return 'left';
      }
      if (targetRect.right > rootRect.right) {
        return 'right';
      }
    }
  };

  /**
   * observePopoverOverflow
   */
  observePopoverOverflow() {
    this.intersectionObserver?.disconnect();
    if (this.popoverReference) {
      this.intersectionObserver?.observe(this.popoverReference);
    }
  }

  /**
   * repositionPopover
   *
   * updates the position of the popover based on popover collisions
   */
  repositionPopover = (collisionEdge: CollisionEdge) => {
    switch (collisionEdge) {
      case 'top':
        this.position = PositioningShorthand.belowStart;
        break;
      case 'right':
        this.position = PositioningShorthand.startTop;
        break;
      case 'bottom':
        this.position = PositioningShorthand.aboveStart;
        break;
      case 'left':
        this.position = PositioningShorthand.endTop;
        break;
      default:
        break;
    }
  };

  /**
   * calculateModifiedPopoverPosition
   */
  calculateModifiedPopoverPosition() {
    console.log('running repositioning');
    if (this.anchorReferences && this.popoverReference) {
      const anchorRect = this.anchorReferences[0].getBoundingClientRect();
      let modifiedPositionX = anchorRect?.x + window.scrollX;
      let modifiedPositionY = anchorRect?.y + window.scrollY;

      const offsetAboveBelow = 4;
      const offsetStartEnd = 4;

      switch (this.position) {
        case PositioningShorthand.aboveStart:
          modifiedPositionY = modifiedPositionY - this.popoverReference.scrollHeight - offsetAboveBelow;
          break;
        case PositioningShorthand.aboveCenter:
          modifiedPositionY = modifiedPositionY - this.popoverReference.scrollHeight - offsetAboveBelow;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width) / 2;
          break;
        case PositioningShorthand.aboveEnd:
          modifiedPositionY = modifiedPositionY - this.popoverReference.scrollHeight - offsetAboveBelow;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width);
          break;
        case PositioningShorthand.belowStart:
          modifiedPositionY = modifiedPositionY + anchorRect.height;
          break;
        case PositioningShorthand.belowCenter:
          modifiedPositionY = modifiedPositionY + anchorRect.height;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width) / 2;
          break;
        case PositioningShorthand.belowEnd:
          modifiedPositionY = modifiedPositionY + anchorRect.height;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width);
          break;
        case PositioningShorthand.startTop:
          modifiedPositionX = modifiedPositionX - offsetStartEnd - this.popoverReference.scrollWidth;
          break;
        case PositioningShorthand.startMiddle:
          modifiedPositionY = modifiedPositionY - (this.popoverReference.scrollHeight - anchorRect.height) / 2;
          modifiedPositionX = modifiedPositionX - offsetStartEnd - this.popoverReference.scrollWidth;
          break;
        case PositioningShorthand.startBottom:
          modifiedPositionY =
            modifiedPositionY - offsetStartEnd - (this.popoverReference.scrollHeight - anchorRect.height);
          modifiedPositionX = modifiedPositionX - offsetStartEnd - this.popoverReference.scrollWidth;
          break;
        case PositioningShorthand.endTop:
          modifiedPositionX = modifiedPositionX + offsetStartEnd + anchorRect.width;
          break;
        case PositioningShorthand.endMiddle:
          modifiedPositionY =
            modifiedPositionY - offsetStartEnd - (this.popoverReference.scrollHeight - anchorRect.height) / 2;
          modifiedPositionX = modifiedPositionX + offsetStartEnd + anchorRect.width;
          break;
        case PositioningShorthand.endBottom:
          modifiedPositionY =
            modifiedPositionY - offsetStartEnd - (this.popoverReference.scrollHeight - anchorRect.height);
          modifiedPositionX = modifiedPositionX + offsetStartEnd + anchorRect.width;
          break;
        default:
          break;
      }
      return { x: modifiedPositionX, y: modifiedPositionY };
    }

    return { x: 0, y: 0 };
  }

  /**
   * applyPopoverCssPositioning
   */
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
