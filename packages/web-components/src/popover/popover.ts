import { autoUpdate, computePosition, flip, Placement, shift } from '@floating-ui/dom';
import { attr, FASTElement, observable } from '@microsoft/fast-element';

interface HTMLPopoverElement extends HTMLElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
}

export class Popover extends FASTElement {
  @attr({ mode: 'boolean' })
  open: boolean = false;

  openChanged() {
    if (this.open) {
      this.popoverReference?.showPopover();
    } else {
      this.popoverReference?.hidePopover();
      this.cleanup?.();
    }
  }

  @attr
  placement: Placement = 'bottom';

  @observable
  anchorReferences: HTMLElement[] | undefined;
  anchorReferencesChanged() {
    this.initializeTargetId();
    this.addAnchorAttributes();
    this.addAnchorEventListeners();
  }

  @observable
  popoverReference: HTMLPopoverElement | undefined;

  @attr({ attribute: 'target-id' })
  targetId: string | undefined;

  @attr({ attribute: 'anchor-id' })
  anchorId: string | undefined;

  /**
   * anchorContainerSelector
   *
   * @remarks defines the container that the anchor element in the case of a scrollable container
   */
  @attr({ attribute: 'anchor-container-selector' })
  anchorContainerSelector: string | undefined;

  applyPopoverPolyfill() {
    if (!HTMLElement.prototype.hasOwnProperty('popover')) {
      console.log('setting popover polyfill');
      import('@oddbird/popover-polyfill');
    }
  }

  initializeTargetId() {
    if (!this.targetId) {
      this.targetId = 'popover-target';
    }
  }

  addAnchorAttributes() {
    if (this.anchorReferences && this.anchorReferences.length > 0 && this.targetId) {
      this.anchorReferences[0].setAttribute('popovertarget', this.targetId);
    }
  }

  addAnchorEventListeners() {
    if (this.anchorReferences && this.anchorReferences.length) {
      this.anchorReferences[0].addEventListener('click', this.togglePopover);
    }
  }

  // addAnchorContainerEventListeners() {
  //   if (this.anchorContainerSelector) {
  //     const anchorContainer = document.querySelector(this.anchorContainerSelector);
  //     anchorContainer?.addEventListener('scroll', this.updatePosition);
  //   }
  // }

  togglePopover = () => {
    this.popoverReference?.togglePopover();
    this.open = !this.open;
    this.autoUpdatePosition();
  };

  cleanup: (() => void) | undefined;
  autoUpdatePosition = () => {
    if (this.anchorReferences && this.anchorReferences.length > 0 && this.popoverReference) {
      this.cleanup = autoUpdate(this.anchorReferences[0], this.popoverReference, this.updatePosition);
    }
  };

  updatePosition = () => {
    if (this.anchorReferences && this.anchorReferences.length > 0) {
      if (this.anchorReferences[0] && this.popoverReference) {
        computePosition(this.anchorReferences[0], this.popoverReference, {
          placement: this.placement,
          middleware: [flip(), shift()],
        }).then(({ x, y }) => {
          if (this.popoverReference) {
            Object.assign(this.popoverReference.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          }
        });
      }
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.applyPopoverPolyfill();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
