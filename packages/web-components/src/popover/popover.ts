import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

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

  addOverflowBoundaryEventListeners() {
    if (this.overflowBoundary) {
      this.overflowBoundary.addEventListener('scroll', this.updatePopoverPosition);
    }
  }

  addWindowEventListeners() {
    window.addEventListener('resize', this.updatePopoverPosition);
    window.addEventListener('scroll', this.updatePopoverPosition);
  }

  /**
   * togglePopover
   */
  togglePopover = () => {
    this.popoverReference?.togglePopover();
    // this.open = !this.open;
  };

  addPopoverEventListeners() {
    if (this.popoverReference) {
      this.popoverReference.addEventListener('toggle', (event: any) => {
        this.registerOverflowBoundary();
        this.updatePopoverPosition();
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
      let modifiedPositionX = anchorRect?.x + window.scrollX;
      let modifiedPositionY = anchorRect?.y + window.scrollY;

      const offsetAboveBelow = 8;
      const offsetStartEnd = 4;
      let padding = 12;
      if (this.size === 'large') {
        padding = 20;
      }

      switch (this.position) {
        case PositioningShorthand.aboveStart:
          modifiedPositionY = modifiedPositionY + padding - offsetAboveBelow - anchorRect.height * 2;
          break;
        case PositioningShorthand.aboveCenter:
          modifiedPositionY = modifiedPositionY + padding - offsetAboveBelow - anchorRect.height * 2;
          modifiedPositionX = modifiedPositionX - (this.popoverReference.scrollWidth - anchorRect.width) / 2;
          break;
        case PositioningShorthand.aboveEnd:
          modifiedPositionY = modifiedPositionY + padding - offsetAboveBelow - anchorRect.height * 2;
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
