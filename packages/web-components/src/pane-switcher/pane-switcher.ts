import { FASTElement, attr } from '@microsoft/fast-element';
import { isHTMLElement, keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import { Pane } from '../pane/pane.js';
import { PaneSettingsItem } from '../pane-settings-item/pane-settings-items.js';

export class PaneSwitcher extends FASTElement {
  private activePaneIndex: number | null = null;
  private toggleButtons: HTMLElement[] = [];
  private panes: Pane[] = [];

  /**
   * Indicates whether the settings pane is present
   * @public
   * @remarks
   * HTML Attribute: setting
   */
  @attr({ mode: 'boolean' })
  public settings: boolean = false;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('toggle-panes', this.handleTogglePanes as EventListener);
    this.toggleButtons = Array.from(this.querySelectorAll('[slot="toggle-buttons"]'));
    this.setupToggleButtons();
    this.setupPanes();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('toggle-panes', this.handleTogglePanes as EventListener);
  }

  constructor() {
    super();
    this.activePaneIndex = null;
  }

  protected setupToggleButtons(): void {
    const setup = (slot: HTMLSlotElement) => {
      if (slot.name === 'toggle-buttons') {
        const buttons = slot.assignedElements();

        const panes = this.querySelectorAll('fluent-pane') as NodeListOf<Pane>; // Add type assertion here

        buttons.forEach((button, index) => {
          button.addEventListener('click', () => {
            this.handleToggle(index, panes);
          });
        });
      }
    };

    // Add the slotchange listener
    this.addEventListener('slotchange', e => {
      setup(e.target as HTMLSlotElement);
    });

    // Run the setup immediately for the existing slots
    const slots = this.shadowRoot?.querySelectorAll('slot');
    slots?.forEach(setup);
  }

  /**
   * check if the item is a pane
   */
  private dialogRoles = ['dialog', 'complementary'];
  private isPaneElement = (el: HTMLElement | Pane): boolean => {
    return el instanceof Pane || (isHTMLElement(el) && this.dialogRoles.includes(el.getAttribute('role') as string));
  };

  protected setupPanes(): void {
    const slottedPanes = this.querySelectorAll<Pane>('fluent-pane');
    this.panes = Array.from(slottedPanes);

    /**
     * Set the context of the Pane
     * When the pane is a child component of the PaneSwitcher
     * we want to signal this through an attribute to update styles.
     */
    const filteredPaneItems = this.panes?.filter(this.isPaneElement);

    filteredPaneItems?.forEach((item: HTMLElement, index: number) => {
      if (item instanceof Pane) {
        item.setAttribute('data-context', `pane-switcher`);
      }
    });
  }

  public handleToggle(index: number, panes: NodeListOf<Pane>): void {
    // Close the previously opened pane, if any
    if (this.activePaneIndex !== null) {
      const previouslyOpenedPane = panes[this.activePaneIndex] as Pane | null;
      if (previouslyOpenedPane) {
        previouslyOpenedPane.closePane();
        if (index === this.activePaneIndex) {
          this.activePaneIndex = null; // Reset the activePaneIndex since the pane is closed
          return;
        }
      }
    }

    // Update the activePaneIndex to the newly opened pane
    this.activePaneIndex = index;

    // Open the clicked pane, if it exists
    const clickedPane = panes[index] as Pane | null;
    if (clickedPane) {
      clickedPane.openPane();
    }
  }

  private handleTogglePanes(event: CustomEvent<{ toggleTarget: string; switchState: boolean }>): void {
    const { toggleTarget, switchState } = event.detail;
    // Perform the necessary actions based on the switch state and toggle target
    // For example, hide the corresponding toggle button
    this.hideToggleButton(event, toggleTarget, switchState);
  }

  private hideToggleButton(event: Event, toggleTarget: string, switchState: boolean): void {
    const toggleButton = this.getToggleButtonByTarget(event, toggleTarget);
    console.log('3 ' + toggleButton);
    if (toggleButton) {
      toggleButton.hidden = switchState;
    }
  }

  private getToggleButtonByTarget(event: Event, toggleTarget: string): HTMLElement | null {
    const eventTarget = event.target as HTMLElement;
    const paneSwitcher = eventTarget.getRootNode() as ShadowRoot | null;
    if (paneSwitcher) {
      return paneSwitcher.querySelector(`#${toggleTarget}`);
    }
    return null;
  }

  public handleFocus = () => {
    if (this.toggleButtons.length > 0) {
      this.toggleButtons[0].focus();
    }
  };

  public handleKeyDown = (event: KeyboardEvent) => {
    const currentFocusedIndex = this.toggleButtons.findIndex(btn => btn === document.activeElement);

    if (event.key === keyArrowDown) {
      event.preventDefault();
      const nextButton = this.toggleButtons[(currentFocusedIndex + 1) % this.toggleButtons.length];
      nextButton.focus();
    } else if (event.key === keyArrowUp) {
      event.preventDefault();
      const prevButton = this.toggleButtons[
        (currentFocusedIndex - 1 + this.toggleButtons.length) % this.toggleButtons.length
      ];
      prevButton.focus();
    }
  };
}
