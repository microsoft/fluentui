import { computePosition, Placement } from '@floating-ui/dom';
import { attr, FASTElement, observable } from '@microsoft/fast-element';

interface HTMLPopoverElement extends HTMLElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
}

export class Popover extends FASTElement {
  @attr({ mode: 'boolean' })
  open: boolean = false;

  @attr
  placement: Placement = 'bottom';

  @observable
  anchorReferences: HTMLElement[] | undefined;
  anchorReferencesChanged(oldValue: HTMLElement | undefined, newValue: HTMLElement | undefined) {
    this.initializeTargetId();
    console.log('anchorReferencesChanged', oldValue, newValue);
    this.addAnchorAttributes();
    this.addAnchorEventListeners();
  }

  @observable
  popoverReference: HTMLPopoverElement | undefined;

  @attr({ attribute: 'target-id' })
  targetId: string | undefined;

  @attr({ attribute: 'anchor-id' })
  anchorId: string | undefined;

  applyPopoverPolyfill() {
    if (!HTMLElement.prototype.hasOwnProperty('popover')) {
      console.log('setting popover polyfill');
      import('@oddbird/popover-polyfill');
    }
  }

  addAnchorAttributes() {
    if (this.anchorReferences && this.anchorReferences.length > 0 && this.targetId) {
      this.anchorReferences[0].setAttribute('popovertarget', this.targetId);
    }
  }

  togglePopover = () => {
    this.popoverReference?.togglePopover();
  };

  addAnchorEventListeners() {
    if (this.anchorReferences && this.anchorReferences.length) {
      this.anchorReferences[0].addEventListener('click', this.togglePopover);
    }
  }

  initializeTargetId() {
    if (!this.targetId) {
      this.targetId = 'popover-target';
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  updatePosition = () => {
    if (this.anchorReferences && this.anchorReferences.length > 0) {
      if (this.anchorReferences[0] && this.popoverReference) {
        computePosition(this.anchorReferences[0], this.popoverReference, {
          placement: this.placement,
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
}
