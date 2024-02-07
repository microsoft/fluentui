import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';
import { CollisionEdge, PositioningShorthand } from './popover.options.js';
import type { HTMLPopoverElement } from './popover.options.js';

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
   * size
   */
  @attr
  size: 'small' | 'medium' | 'large' = 'medium';

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

  /**
   * anchorReferencesChanged
   *
   * Adds anchor attributes and event listeners when the anchor is added to the DOM.
   */
  anchorReferencesChanged() {
    this.initializeTargetId();
    this.addAnchorPopoverAttributes();
    this.addAnchorEventListeners();
  }

  /**
   * popoverReference
   */
  @observable
  popoverReference: HTMLPopoverElement | undefined;

  /**
   * popoverReferenceChanged
   *
   * Adds event listeners to the popoverReference when it's added to the DOM
   */
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

  /**
   * overflowBoundary
   *
   * The boundary container of the popover for use in repositioning the floating popover in the event that the popover needs to respond to a positiioning boundary other than the window or document body
   */
  @observable
  overflowBoundaryRef: Element | null | undefined;

  /**
   * overflowBoundaryChanged
   */
  overflowBoundaryChanged() {
    this.addOverflowBoundaryEventListeners();
  }

  /**
   * overflowBoundarySelector
   *
   * This selector is used to define the boundary container of the popover - for use in repositioning the floating popover
   */
  @attr({ attribute: 'overflow-boundary-selector' })
  overflowBoundarySelector: string | undefined;

  /**
   * registerOverflowBoundary
   *
   * Saves a reference to the containing element of the popover if the overflowBoundarySelector is set
   */
  registerOverflowBoundary = () => {
    if (this.overflowBoundarySelector) {
      this.overflowBoundaryRef = document.querySelector(this.overflowBoundarySelector);
    }
  };

  /**
   * initializeTargetId
   *
   * initializes the targetId if it's not set
   */
  initializeTargetId() {
    if (!this.targetId) {
      const popoverId = uniqueId('popover-target-');
      this.targetId = popoverId;
    }
  }

  /**
   * addAnchorPopoverAttributes
   *
   * adds popovertarget attribute and targetId to the slotted anchor element
   */
  addAnchorPopoverAttributes() {
    if (this.anchorReferences && this.anchorReferences.length > 0 && this.targetId) {
      this.anchorReferences[0].setAttribute('popovertarget', this.targetId);
    }
  }

  /**
   * togglePopover
   */
  togglePopover = () => {
    this.popoverReference?.togglePopover();
  };

  /**
   * handleWindowChanges
   */
  updatePopoverPosition = () => {
    console.log('updatePopoverPosition');
    this.observePopoverOverflow();
    this.applyPopoverCssPositioning();
  };

  /**
   * timeoutId
   * used for debouncing the window change events event
   */
  private timeoutId: number | undefined;

  /**
   * handleWindowChanges
   */
  handleWindowChanges = () => {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.updatePopoverPosition();
    }, 100);
  };

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
    if (this.overflowBoundaryRef) {
      this.overflowBoundaryRef.addEventListener('scroll', this.handleWindowChanges);
    }
  }

  /**
   * addWindowEventListeners
   */
  addWindowEventListeners() {
    window.addEventListener('resize', this.handleWindowChanges);
    window.addEventListener('scroll', this.handleWindowChanges);
  }

  /**
   * addPopoverEventListeners
   */
  addPopoverEventListeners() {
    if (this.popoverReference) {
      this.popoverReference.addEventListener('toggle', (event: any) => {
        if (event.newState === 'open') {
          this.registerOverflowBoundary();
          this.applyPopoverCssPositioning();
          this.createOverflowHandler();

          this.addWindowEventListeners();

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
   * used for tracking the overflow / collision of the popover to adjacent edges on ui changes
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
    if (this.overflowBoundaryRef) {
      options.root = this.overflowBoundaryRef;
      options.rootMargin = '15px';
    }
    this.intersectionObserver = new IntersectionObserver(this.handleOverflow, options);
  };

  /**
   * handleOverflow
   *
   * Repositions the popover when it collides with its container or user defined overflowed boundary. Called by the intersectionObserver in createOverflowHandler.
   */
  handleOverflow = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio < 1) {
        const collisionEdge = this.findIntersectingEdge(entry);

        if (collisionEdge) {
          this.repositionPopover(collisionEdge);
          this.applyPopoverCssPositioning();
        } else if (this.originalPopoverPosition && this.position !== this.originalPopoverPosition) {
          this.position = this.originalPopoverPosition;
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
        return CollisionEdge.bottom;
      }
      if (targetRect.top < rootRect.top) {
        return CollisionEdge.top;
      }
      if (targetRect.left < rootRect.left) {
        return CollisionEdge.left;
      }
      if (targetRect.right > rootRect.right) {
        return CollisionEdge.right;
      }
    }
  };

  /**
   * observePopoverOverflow
   *
   * Disconnects and re-observes the popoverReference for overflow. This is used to reposition the popover in the event that it collides with its container or user defined overflowed boundary. Disconnecting is required to reset the baseline for the intersection observer. This method will be called repeatedly on ui changes like resizing the window or scrolling the overflowBoundary.
   */
  observePopoverOverflow() {
    this.intersectionObserver?.disconnect();
    if (this.popoverReference) {
      this.intersectionObserver?.observe(this.popoverReference);
    }
  }

  /**
   * originalPopoverPosition
   *
   * Tracks the original position of the popover before it was repositioned so that it can be reset when the popover is no longer overflowing
   */
  private originalPopoverPosition: PositioningShorthand | undefined;

  /**
   * repositionPopover
   *
   * Updates the position of the popover based on popover collisions
   */
  repositionPopover = (collisionEdge: CollisionEdge) => {
    if (!this.originalPopoverPosition) {
      this.originalPopoverPosition = this.position;
    }

    // TODO: Update this to cover all cases of repositioning the popover
    switch (collisionEdge) {
      case CollisionEdge.top:
        this.position = PositioningShorthand.belowStart;
        break;
      case CollisionEdge.right:
        this.position = PositioningShorthand.startTop;
        break;
      case CollisionEdge.bottom:
        this.position = PositioningShorthand.aboveStart;
        break;
      case CollisionEdge.left:
        this.position = PositioningShorthand.endTop;
        break;
      default:
        break;
    }
  };

  /**
   * calculateModifiedPopoverPosition
   *
   * Calculates the modified position of the popover based on the position property.
   */
  calculateModifiedPopoverPosition() {
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

  /**
   * applyPopoverPolyfill
   */
  applyPopoverPolyfill() {
    if (!HTMLElement.prototype.hasOwnProperty('popover')) {
      console.log('setting popover polyfill');
      import('@oddbird/popover-polyfill');
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
