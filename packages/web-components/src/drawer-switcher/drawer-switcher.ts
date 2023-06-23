import { FASTElement, html, observable } from '@microsoft/fast-element';
import { Drawer } from '../drawer/drawer.js';

export class DrawerSwitcher extends FASTElement {
  @observable public icons: SVGElement[] = [];
  @observable public drawerElements: Drawer[] = [];
  private lastOpenedDrawer: Drawer | null = null;

  constructor() {
    super();
  }

  public connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'presentation');
    this.setupDrawerElements();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
  }

  public toggleDrawer(drawer: Drawer) {
    if (this.lastOpenedDrawer && this.lastOpenedDrawer !== drawer) {
      this.lastOpenedDrawer.hide();
    }

    if (drawer.open) {
      drawer.hide();
    } else {
      drawer.show();
      this.lastOpenedDrawer = drawer;
    }
  }

  private setupDrawerElements() {
    const slottedDrawers = this.querySelectorAll<Drawer>('fluent-drawer');
    this.drawerElements = Array.from(slottedDrawers);

    this.icons = this.drawerElements.map(drawer => {
      const iconSlot = drawer.querySelector('[slot="icon"]');
      return (iconSlot?.innerHTML as unknown) as SVGElement;
    });

    for (let i = 0; i < this.drawerElements.length; i++) {
      if (this.icons[i]) {
        this.drawerElements[i].icon = this.icons[i];
        console.log(this.drawerElements[i].icon);
      } else {
        console.warn(`No icon found for drawer element at index ${i}`);
      }
    }
  }
}

export class SvgIcon extends FASTElement {
  @observable public icon: SVGElement | null = null;

  public template = html<SvgIcon>` <template> ${x => x.icon} </template> `;
}
