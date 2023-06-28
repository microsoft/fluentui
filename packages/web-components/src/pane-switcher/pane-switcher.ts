import { FASTElement } from '@microsoft/fast-element';
import { Pane } from '../pane/pane.js';

export class PaneSwitcher extends FASTElement {
  private activePaneIndex: number | null = null;

  public connectedCallback(): void {
    super.connectedCallback();
    this.setupToggleButtons();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  constructor() {
    super();
    this.activePaneIndex = null;
  }

  protected setupToggleButtons(): void {
    console.log('setupToggleButtons');

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
}
