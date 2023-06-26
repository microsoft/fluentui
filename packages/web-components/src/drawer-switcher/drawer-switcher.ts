import { FASTElement } from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { Drawer } from '../drawer/drawer.js';

export class DrawerSwitcher extends FASTElement {
  private activeDrawerId: string | null = null;
  private drawers: Drawer[] = [];

  constructor() {
    super();
  }

  public connectedCallback(): void {
    super.connectedCallback();

    // Listen for the toggle event
    this.addEventListener('toggle', this.handleToggle as EventListener);
    this.setPosition();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    // Clean up the event listener
    this.removeEventListener('toggle', this.handleToggle as EventListener);
  }

  /**
   * check if the item is a drawer
   */
  private dialogRoles = ['dialog', 'complementary'];
  private isDrawerElement = (el: HTMLElement | Drawer): boolean => {
    return el instanceof Drawer || (isHTMLElement(el) && this.dialogRoles.includes(el.getAttribute('role') as string));
  };

  protected setPosition(): void {
    const slottedDrawers = this.querySelectorAll<Drawer>('fluent-drawer');
    this.drawers = Array.from(slottedDrawers);

    /**
     * Set the context of the Drawer
     * When the drawer is a child component of the DrawerSwitcher
     * we want to signal this through an attribute to update styles.
     */
    const filteredDrawerItems = this.drawers?.filter(this.isDrawerElement);

    filteredDrawerItems?.forEach((item: HTMLElement, index: number) => {
      console.log(item);
      if (item instanceof Drawer) {
        item.setAttribute('data-context', `drawer-switcher`);
      }
    });
  }

  private handleToggle(event: CustomEvent<{ open: boolean; drawerId: string }>): void {
    const { drawerId } = event.detail;

    // Close the previously opened drawer, if any
    if (this.activeDrawerId !== null) {
      const previouslyOpenedDrawer = document.getElementById(this.activeDrawerId) as Drawer | null;
      if (previouslyOpenedDrawer) {
        previouslyOpenedDrawer.closeDrawer();
        if (drawerId === this.activeDrawerId) {
          this.activeDrawerId = null; // Reset the activeDrawerId since the drawer is closed
          return;
        }
      }
    }

    // Update the activeDrawerId to the newly opened drawer
    this.activeDrawerId = drawerId;

    // Open the clicked drawer, if it exists
    const clickedDrawer = document.getElementById(drawerId) as Drawer | null;
    if (clickedDrawer) {
      clickedDrawer.openDrawer();
    }
  }

  public closeAllDrawers(): void {
    const drawers = this.querySelectorAll<Drawer>('fluent-drawer');
    drawers.forEach(drawer => {
      if (drawer.open) {
        drawer.closeDrawer();
      }
    });
  }

  public handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown') {
    }
  }
}
