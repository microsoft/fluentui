import { attr, FASTElement, observable } from '@microsoft/fast-element';

export type PositioningShorthand =
  | 'above'
  | 'above-start'
  | 'above-end'
  | 'below'
  | 'below-start'
  | 'below-end'
  | 'before'
  | 'before-top'
  | 'before-bottom'
  | 'after'
  | 'after-top'
  | 'after-bottom';

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
      this.registerOverflowBoundary();
      this.updatePopoverPosition();
    } else {
      this.popoverReference?.hidePopover();
    }
  }

  /**
   * position
   */
  @attr
  position: PositioningShorthand = 'below';

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
    this.open = !this.open;
  };

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
    console.log('updating position');
    this.applyPopoverCssPositioning(this.getAnchorCoordinates());
  };

  getAnchorCoordinates() {
    if (this.anchorReferences && this.anchorReferences.length > 0) {
      const anchor = this.anchorReferences[0];
      console.log(anchor.getBoundingClientRect());
      const anchorRect = anchor.getBoundingClientRect();
      return { x: anchorRect.x, y: anchorRect.y };
    }
    return { x: 0, y: 0 };
  }

  applyPopoverCssPositioning(coordinates: { x: number; y: number }) {
    console.log('applying css positioning', coordinates);
    if (this.popoverReference) {
      // this.popoverReference.style.top = `${coordinates.y}px`;
      // this.popoverReference.style.left = `${coordinates.x}px`;
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
