import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { keyArrowDown, keyArrowUp, keyEnd, keyEscape, keyHome, limit, uniqueId } from '@microsoft/fast-web-utilities';
import { Drawer } from '../drawer/drawer.js';
import { DrawerToggle } from '../drawer-toggle/drawer-toggle.js';

/**
 * A Tabs Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#tablist | ARIA tablist }.
 *
 * @slot start - Content which can be provided before the tablist element
 * @slot end - Content which can be provided after the tablist element
 * @slot toggleButton - The slot for tabs
 * @slot drawer - The slot for drawers
 * @csspart tablist - The element wrapping for the tabs
 * @fires change - Fires a custom 'change' event when a toggleButton is clicked or during keyboard navigation
 *
 * @public
 */
export class DrawerSwitcher extends FASTElement {
  /**
   * A reference to the active toggleButton
   * @public
   */
  public activeToggleButton?: HTMLElement;

  /**
   * The id of the active drawer
   *
   * @public
   * @remarks
   * HTML Attribute: activeid
   */
  @attr
  public activeid: string = '';

  /**
   * @internal
   */
  public activeidChanged(oldValue: string, newValue: string): void {
    if (this.$fastController.isConnected && this.togglebuttons.length <= this.drawers.length) {
      this.prevActiveToggleButtonIndex = this.togglebuttons.findIndex((item: HTMLElement) => item.id === oldValue);
      this.setToggleButtons();
      this.setDrawers();
    }
  }

  /**
   * @internal
   */
  @observable
  public togglebuttons: HTMLElement[] = [];
  /**
   * @internal
   */
  public togglebuttonsChanged(): void {
    if (this.$fastController.isConnected && this.togglebuttons.length <= this.drawers.length) {
      this.toggleButtonIds = this.getToggleButtonIds();
      this.drawersIds = this.getDrawerIds();
      this.setToggleButtons();
      this.setDrawers();
    }
  }

  /**
   * @internal
   */
  @observable
  public drawers: HTMLElement[] = [];

  /**
   * @internal
   */
  public drawersChanged(): void {
    if (this.$fastController.isConnected && this.drawers.length <= this.togglebuttons.length) {
      this.toggleButtonIds = this.getToggleButtonIds();
      this.drawersIds = this.getDrawerIds();

      this.setToggleButtons();
      this.setDrawers();
    }
  }

  public openDrawer = (): void => {
    const drawerToOpen = this.drawers[this.activeToggleButtonIndex] as Drawer;
    if (!drawerToOpen.expanded) {
      if (typeof drawerToOpen.open === 'function') {
        this.closeAllDrawers();
        drawerToOpen.open();
        drawerToOpen.focus();
      }
    }
  };

  public closeDrawer = (): void => {
    const drawerToClose = this.drawers[this.activeToggleButtonIndex] as Drawer;
    console.log(drawerToClose.expanded);
    if (drawerToClose.expanded) {
      if (typeof drawerToClose.close === 'function') {
        drawerToClose.close();
        // After closing the drawer, check if the associated toggle button exists and has a `focus` method
        if (this.activeToggleButton && typeof this.activeToggleButton.focus === 'function') {
          // Move the focus to the associated toggle button
          this.activeToggleButton.focus();
        }
      }
    }
  };

  public toggleDrawer = (): void => {
    const drawerToToggle = this.drawers[this.activeToggleButtonIndex] as Drawer;
    if (!drawerToToggle.expanded) {
      if (typeof drawerToToggle.open === 'function') {
        this.closeAllDrawers();
        drawerToToggle.open();
      }
      if (typeof drawerToToggle.focus === 'function') {
        // Check if the focus method is available
        drawerToToggle.focus(); // Move focus to the drawer
      }
    } else if (drawerToToggle.expanded) {
      if (typeof drawerToToggle.close === 'function') {
        drawerToToggle.close();
        // After closing the drawer, check if the associated toggle button exists and has a `focus` method
        if (this.activeToggleButton && typeof this.activeToggleButton.focus === 'function') {
          // Move the focus to the associated toggle button
          this.activeToggleButton.focus();
        }
      }
    }
  };

  private closeAllDrawers = (): void => {
    this.drawers.forEach(drawer => {
      if (drawer instanceof Drawer && drawer.expanded) {
        if (typeof drawer.close === 'function') {
          drawer.close();
        }
      }
    });
  };

  private prevActiveToggleButtonIndex: number = 0;
  private activeToggleButtonIndex: number = 0;
  private toggleButtonIds: Array<string> = [];
  private drawersIds: Array<string> = [];

  private change = (): void => {
    this.$emit('change', this.activeToggleButton);
  };

  private isDisabledElement = (el: Element): el is HTMLElement => {
    return el.getAttribute('aria-disabled') === 'true';
  };

  private isFocusableElement = (el: Element): el is HTMLElement => {
    return !this.isDisabledElement(el);
  };

  private getActiveIndex(): number {
    const id: string = this.activeid;
    if (id !== undefined) {
      return this.toggleButtonIds.indexOf(this.activeid) === -1 ? 0 : this.toggleButtonIds.indexOf(this.activeid);
    } else {
      return 0;
    }
  }

  protected setToggleButtons = (): void => {
    this.activeToggleButtonIndex = this.getActiveIndex();
    this.togglebuttons.forEach((toggleButton: HTMLElement, index: number) => {
      if (toggleButton instanceof DrawerToggle && toggleButton.slot === 'togglebuttons') {
        const isActiveToggleButton = this.activeToggleButtonIndex === index && this.isFocusableElement(toggleButton);

        const toggleButtonId: string = this.toggleButtonIds[index];
        const drawerId: string = this.drawersIds[index];
        toggleButton.setAttribute('id', toggleButtonId);
        toggleButton.setAttribute('aria-selected', isActiveToggleButton ? 'true' : 'false');
        toggleButton.setAttribute('aria-controls', drawerId);
        toggleButton.addEventListener('click', this.handleToggleButtonClick);
        toggleButton.addEventListener('keydown', this.handleToggleButtonKeyDown);
        toggleButton.setAttribute('tabindex', isActiveToggleButton ? '0' : '-1');
        if (isActiveToggleButton) {
          this.activeToggleButton = toggleButton;
          this.activeid = toggleButtonId;
        }
      }
    });
  };

  private setDrawers = (): void => {
    this.drawers.forEach((drawer: HTMLElement, index: number) => {
      if (drawer instanceof Drawer) {
        const toggleButtonId: string = this.toggleButtonIds[index];
        const drawerId: string = this.drawersIds[index];
        drawer.setAttribute('id', drawerId);
        drawer.setAttribute('aria-labelledby', toggleButtonId);
        drawer.setAttribute('data-context', 'drawer-switcher');
      }
    });
  };

  private getToggleButtonIds(): Array<string> {
    return this.togglebuttons.map((toggleButton: HTMLElement) => {
      return toggleButton.getAttribute('id') ?? `togglebutton-${uniqueId()}`;
    });
  }

  private getDrawerIds(): Array<string> {
    return this.drawers.map((tabDrawerl: HTMLElement) => {
      return tabDrawerl.getAttribute('id') ?? `panel-${uniqueId()}`;
    });
  }

  private setComponent(): void {
    if (this.activeToggleButtonIndex !== this.prevActiveToggleButtonIndex) {
      this.activeid = this.toggleButtonIds[this.activeToggleButtonIndex] as string;
      this.focusToggleButton();
      this.change();
    }
  }

  private handleToggleButtonClick = (event: MouseEvent): void => {
    const selectedToggleButton = event.currentTarget as HTMLElement;
    if (selectedToggleButton.nodeType === 1 && this.isFocusableElement(selectedToggleButton)) {
      this.prevActiveToggleButtonIndex = this.activeToggleButtonIndex;
      this.activeToggleButtonIndex = this.togglebuttons.indexOf(selectedToggleButton);
      this.setComponent();
      this.toggleDrawer();
    }
  };

  private handleToggleButtonKeyDown = (event: KeyboardEvent): void => {
    const keyEnter = 'Enter';
    const keySpace = ' ';
    switch (event.key) {
      case keyArrowUp:
        event.preventDefault();
        this.adjustBackward(event);
        break;
      case keyArrowDown:
        event.preventDefault();
        this.adjustForward(event);
        break;
      case keyEnter:
      case keySpace:
        event.preventDefault();
        // Code to open the drawer associated with the currently active toggle button
        this.openDrawer();
        break;
      case keyEscape:
        event.preventDefault();
        // Code to close the drawer associated with the currently active toggle button
        this.closeDrawer();
        break;
      case keyHome:
        event.preventDefault();
        this.adjust(-this.activeToggleButtonIndex);
        break;
      case keyEnd:
        event.preventDefault();
        this.adjust(this.togglebuttons.length - this.activeToggleButtonIndex - 1);
        break;
    }
  };

  /**
   * The adjust method for FASTTabs
   * @public
   * @remarks
   * This method allows the active index to be adjusted by numerical increments
   */
  public adjust(adjustment: number): void {
    const focusableToggleButtons = this.togglebuttons.filter(t => !this.isDisabledElement(t));
    if (this.activeToggleButton) {
      const currentActiveToggleButtonIndex = focusableToggleButtons.indexOf(this.activeToggleButton);

      const nextToggleButtonIndex = limit(
        0,
        focusableToggleButtons.length - 1,
        currentActiveToggleButtonIndex + adjustment,
      );

      // the index of the next focusable toggleButton within the context of all available tabs
      const nextIndex = this.togglebuttons.indexOf(focusableToggleButtons[nextToggleButtonIndex]);

      if (nextIndex > -1) {
        this.moveToToggleButtonByIndex(this.togglebuttons, nextIndex);
      }
    }
  }

  private adjustForward = (e: KeyboardEvent): void => {
    const group: HTMLElement[] = this.togglebuttons;
    let index: number = 0;

    index = this.activeToggleButton ? group.indexOf(this.activeToggleButton) + 1 : 1;
    if (index === group.length) {
      index = 0;
    }

    while (index < group.length && group.length > 1) {
      if (this.isFocusableElement(group[index])) {
        this.moveToToggleButtonByIndex(group, index);
        break;
      } else if (this.activeToggleButton && index === group.indexOf(this.activeToggleButton)) {
        break;
      } else if (index + 1 >= group.length) {
        index = 0;
      } else {
        index += 1;
      }
    }
  };

  private adjustBackward = (e: KeyboardEvent): void => {
    const group: HTMLElement[] = this.togglebuttons;
    let index: number = 0;

    index = this.activeToggleButton ? group.indexOf(this.activeToggleButton) - 1 : 0;
    index = index < 0 ? group.length - 1 : index;

    while (index >= 0 && group.length > 1) {
      if (this.isFocusableElement(group[index])) {
        this.moveToToggleButtonByIndex(group, index);
        break;
      } else if (index - 1 < 0) {
        index = group.length - 1;
      } else {
        index -= 1;
      }
    }
  };

  private moveToToggleButtonByIndex = (group: HTMLElement[], index: number) => {
    const toggleButton: HTMLElement = group[index] as HTMLElement;
    this.activeToggleButton = toggleButton;
    this.prevActiveToggleButtonIndex = this.activeToggleButtonIndex;
    this.activeToggleButtonIndex = index;
    toggleButton.focus();
    this.setComponent();
  };

  private focusToggleButton(): void {
    this.togglebuttons[this.activeToggleButtonIndex].focus();
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    this.toggleButtonIds = this.getToggleButtonIds();
    this.drawersIds = this.getDrawerIds();
    this.activeToggleButtonIndex = this.getActiveIndex();
  }
}
