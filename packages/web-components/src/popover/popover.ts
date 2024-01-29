import {
  autoUpdate,
  computePosition,
  detectOverflow,
  flip,
  Middleware,
  MiddlewareArguments,
  Placement,
  shift,
} from '@floating-ui/dom';
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
   * anchorBoundsSelector
   *
   * @remarks defines the container that the anchor element in the case of a scrollable container
   */
  @attr({ attribute: 'anchor-bounds-selector' })
  anchorBoundsSelector: string | undefined;

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

  createOverflowHandler = (): false | Middleware | null | undefined => {
    if (this.anchorBoundsSelector) {
      return {
        name: 'overflowHandler',
        fn: async (state: MiddlewareArguments): Promise<{ reset: boolean | { placement: Placement } } | any> => {
          const boundaryEl = document.querySelector(this.anchorBoundsSelector || '') || undefined;
          const overflow = await detectOverflow(state, { boundary: boundaryEl });

          // // if(overflow.left > 0|| overflow.right > 0 || overflow.top > 0 || overflow.bottom > 0) {
          // // }
          // // return { x: 0, y: 0 };
          // if (overflow.left > 0) {
          //   this.placement = 'bottom-start';
          // }
          // if (overflow.bottom > 0) {
          //   this.placement = 'right-start';
          // }
          // if (overflow.right > 0) {
          //   this.placement = 'top-start';
          // }

          // top overflows
          if (overflow.top > 0) {
            return {
              reset: {
                placement: 'left',
              },
            };
          }

          return {};
        },
      };
    }
  };

  updatePosition = () => {
    if (this.anchorReferences && this.anchorReferences.length > 0) {
      if (this.anchorReferences[0] && this.popoverReference) {
        computePosition(this.anchorReferences[0], this.popoverReference, {
          placement: this.placement,
          middleware: [flip(), shift(), this.createOverflowHandler()],
        }).then(state => {
          if (this.popoverReference) {
            Object.assign(this.popoverReference.style, {
              left: `${state.x}px`,
              top: `${state.y}px`,
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
