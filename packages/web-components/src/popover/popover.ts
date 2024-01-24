import { computePosition, Placement } from '@floating-ui/dom';
import { attr, FASTElement, observable } from '@microsoft/fast-element';

export class Popover extends FASTElement {
  @attr({ mode: 'boolean' })
  open: boolean = false;

  @attr
  placement: Placement = 'bottom';

  @attr
  anchor: string | undefined;

  @observable
  anchorReference: HTMLElement | undefined;

  updatePosition = () => {
    if (this.anchorReference) {
      const popoverContainer = this.shadowRoot?.querySelector('.popover-content-container') as HTMLElement;

      if (this.anchorReference && popoverContainer) {
        computePosition(this.anchorReference, popoverContainer, {
          placement: this.placement,
        }).then(({ x, y }) => {
          Object.assign(popoverContainer.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      }
    }
  };

  setAnchorReference() {
    const anchor = this.querySelector(`#${this.anchor}`) as HTMLElement;
    if (anchor) {
      this.anchorReference = anchor;
    }
  }

  handleMouseEnter = () => {
    this.open = true;
    this.updatePosition();
  };

  handleMouseLeave = () => {
    this.open = false;
    this.updatePosition();
  };

  setAnchorEventListeners = () => {
    if (this.anchorReference) {
      this.anchorReference.addEventListener('mouseenter', this.handleMouseEnter);
      this.anchorReference.addEventListener('mouseleave', this.handleMouseLeave);
    }
  };

  connectedCallback(): void {
    super.connectedCallback();

    this.setAnchorReference();
    this.setAnchorEventListeners();
  }
}
