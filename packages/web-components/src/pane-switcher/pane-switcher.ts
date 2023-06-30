import { attr, FASTElement } from '@microsoft/fast-element';
import { isHTMLElement, keyArrowDown, keyArrowUp } from '@microsoft/fast-web-utilities';
import { Pane } from '../pane/pane.js';

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
    // Get the clicked pane
    const clickedPane = panes[index] as Pane | null;

    // Check if the clicked pane is already open
    const isPaneOpen = clickedPane?.open;

    // Close the clicked pane if it's already open, or open it if it's closed
    if (isPaneOpen) {
      clickedPane?.closePane();
      this.activePaneIndex = null; // Reset the activePaneIndex since the pane is closed
    } else {
      // Close the previously opened pane, if any
      if (this.activePaneIndex !== null) {
        const previouslyOpenedPane = panes[this.activePaneIndex] as Pane | null;
        if (previouslyOpenedPane) {
          previouslyOpenedPane.closePane();
        }
      }

      // Open the clicked pane
      clickedPane?.openPane();
      this.activePaneIndex = index; // Update the activePaneIndex to the newly opened pane
    }
  }

  private handleTogglePanes(event: CustomEvent<{ bindID: string; switchState: boolean }>): void {
    const { bindID, switchState } = event.detail;
    const paneElements = this.getElementsByBindId(event, bindID);

    if (paneElements) {
      paneElements.hidden = switchState;
    }
  }

  private getElementsByBindId(event: Event, bindID: string): HTMLElement | null {
    const eventTarget = event.target as HTMLElement;
    const paneSwitcher = eventTarget.getRootNode() as ShadowRoot | null;
    if (paneSwitcher) {
      return paneSwitcher.querySelector(`[bind-id="${bindID}"]`);
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
