import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { autoUpdate, computePosition, flip, hide, size } from '@floating-ui/dom';
import { MenuList } from '../menu-list/menu-list.js';

/**
 * The base class used for constructing a fluent-menu custom element
 * @public
 */
export class Menu extends FASTElement {
  private _menu?: HTMLElement;
  private _trigger?: HTMLElement;

  public menuContainer?: HTMLElement;

  private cleanup?: () => void;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  public setPositioning(): void {
    if (this.$fastController.isConnected && this._trigger && this.menuContainer) {
      this.cleanup = autoUpdate(this, this.menuContainer, async () => {
        const { middlewareData, x, y } = await computePosition(this._trigger!, this.menuContainer!, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [
            flip(),
            size({
              apply: ({ availableHeight, rects }) => {
                this.menuContainer?.style &&
                  Object.assign(this.menuContainer.style, {
                    maxHeight: `${availableHeight}px`,
                    width: `${rects.reference.width}px`,
                  });
              },
            }),
            hide(),
          ],
        });
        if (middlewareData.hide?.referenceHidden) {
          this.expanded = false;
          return;
        }

        this.menuContainer?.style &&
          Object.assign(this.menuContainer.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            transform: `translate(${x}px, ${y}px)`,
          });
      });
    }
  }

  @observable
  public menu?: HTMLElement[];

  protected menuChanged(): void {
    if (this.$fastController.isConnected && this.menu && this.menu.length) {
      this._menu = this.menu[0] as MenuList;
    }
  }

  @observable
  public trigger?: HTMLElement[];

  protected triggerChanged(): void {
    if (this.$fastController.isConnected && this.trigger && this.trigger.length) {
      this._trigger = this.trigger[0];

      this._trigger.setAttribute('aria-haspopup', 'true');
      this._trigger.setAttribute('aria-expanded', `${this.expanded}`);
      // need to remove when ref changes
      this._trigger.addEventListener('click', this.toggleExpanded);
    }
  }

  @observable
  @attr({ mode: 'boolean' })
  public expanded: boolean = false;

  protected expandedChanged(): void {
    if (this.$fastController.isConnected && this._trigger) {
      this._trigger.setAttribute('aria-expanded', `${this.expanded}`);
    }
    Updates.enqueue(() => this.setPositioning());
    this.focus();
  }

  public focus(): void {
    if (this.expanded && this._menu) {
      this._menu.focus();
    }
  }

  protected toggleExpanded = (e: MouseEvent) => {
    this.expanded = !this.expanded;
  };

  private closeMenu() {
    this.expanded = false;
  }

  private handleDocumentClick = e => {
    if (e && !e.composedPath().includes(this._menu) && !e.composedPath().includes(this._trigger)) {
      this.closeMenu();
      this._trigger?.removeEventListener('click', this.toggleExpanded);
    }
  };
}
