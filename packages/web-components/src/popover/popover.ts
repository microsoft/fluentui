import { attr, FASTElement, Updates } from '@microsoft/fast-element';
import { arrow, computePosition, offset } from '@floating-ui/dom';

export class Popover extends FASTElement {
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  @attr({ mode: 'boolean' })
  public arrow: boolean = false;

  @attr
  public position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  public popoverContentRef: FASTElement; // @FIXME: what type?
  public arrowRef: FASTElement;
  public anchorRef: HTMLElement[];

  public connectedCallback() {
    super.connectedCallback();
    this.openChanged(); // hack
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this.hidePopover();
  }

  protected openChanged() {
    // this is from FAST tooltip: if ((this as FASTElement).$fastController.isConnected) {
    if ((this as FASTElement).$fastController.isConnected) {
      if (this.open) {
        this.showPopover();
      } else {
        this.hidePopover();
      }

      Updates.enqueue(() => {
        if (this.open) {
          this.updatePosition();
        }
      });
    }
  }

  private isOpen: boolean = false;

  private showPopover = (): void => {
    if (this.isOpen) {
      return;
    }

    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('click', this.handleOutsideClick, true);

    this.isOpen = true;
  };

  private hidePopover = (): void => {
    if (!this.isOpen) {
      return;
    }

    document.removeEventListener('click', this.handleOutsideClick, true);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);

    this.isOpen = false;
  };

  private handleDocumentKeyDown = (e: KeyboardEvent) => {
    // @FIXME: should this be imported from @microsoft/fast-web-utilities?
    if (e.key === 'Escape') {
      this.$emit('dismiss');
    }
  };

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      // if (!this.anchorRef[0].contains(e.target as Node) && !this.popoverContentRef.contains(e.target as Node)) {
      this.$emit('dismiss');
    }
  };

  private updatePosition() {
    if (!this.anchorRef[0] || !this.popoverContentRef) {
      return;
    }

    /*

      Arrow hardcoded values
        Box dimensions: 12px
        Diagonal: 16.97 (sqrt(12^2 + 12^2))
        Half diagonal: 8.485

        Border: 4px
        Half border: 2px

        Offset: 8.485 - 2px

     */

    // TODO: and offset(xxx) for the arrow
    // TODO: add flip({boundary: xxx }) and shift()
    computePosition(this.anchorRef[0], this.popoverContentRef, {
      placement: this.position,
      middleware: [...(this.arrow ? [offset(8.485 - 2), arrow({ element: this.arrowRef })] : [])],
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign(this.popoverContentRef.style, { left: `${x}px`, top: `${y}px` });

      if (this.arrow) {
        const staticSide: string = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]] as string;

        const { x: arrowX, y: arrowY } = middlewareData.arrow!;
        Object.assign(this.arrowRef.style, {
          left: `${arrowX}px`,
          top: `${arrowY}px`,
          right: '',
          bottom: '',
          [staticSide]: '-8.485px',
        });
      }
    });
  }
}
