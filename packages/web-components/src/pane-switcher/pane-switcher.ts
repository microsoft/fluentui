import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { isHTMLElement, keyArrowDown, keyArrowUp, keyEnter, keySpace, keyTab } from '@microsoft/fast-web-utilities';
import { Pane } from '../pane/pane.js';

interface PanePair {
  toggleButtonId: string;
  paneId: string;
}

export class PaneSwitcher extends FASTElement {
  private activePaneIndex: number | null = null;
  private toggleButtons: HTMLElement[] = [];
  private panes: Pane[] = [];
  private panePairs: PanePair[] = [];

  /**
   * The slotted toggle button elements.
   * @public
   * @remarks
   */
  @observable
  public slottedToggleButtons?: HTMLElement[];

  /**
   * The slotted pane elements.
   * @public
   * @remarks
   */
  @observable
  public slottedPanes?: Pane[];

  /**
   * Indicates whether the settings pane is present
   * @public
   * @remarks
   * HTML Attribute: settings
   */
  @attr({ mode: 'boolean' })
  public settings: boolean = false;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('toggle-panes', this.togglePaneSwitcherPaneVisibility as EventListener);
    this.toggleButtons = Array.from(this.querySelectorAll('[slot="toggle-buttons"]'));
    this.setupPanes();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('toggle-panes', this.togglePaneSwitcherPaneVisibility as EventListener);
  }

  constructor() {
    super();
    this.activePaneIndex = null;
  }

  public slottedToggleButtonsChanged(oldValue: any, newValue: any): void {
    if (this.$fastController.isConnected) {
      this.setToggleButtons();
    }
  }

  protected setToggleButtons(): void {
    this.toggleButtons.forEach((button, index) => {
      const bindID = button.getAttribute('bind-id');
      if (bindID) {
        button.addEventListener('click', () => {
          this.handleToggle(bindID, this.panes);
        });
      }
    });
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

  public handleToggle(bindID: string, panes: Pane[]): void {
    // Get the clicked pane
    const clickedPane = panes.find(pane => pane.getAttribute('bind-id') === bindID);

    if (!clickedPane) {
      return;
    }

    // Check if the clicked pane is already open
    const isPaneOpen = clickedPane.open;

    // Close the clicked pane if it's already open, or open it if it's closed
    if (isPaneOpen) {
      clickedPane.closePane();
      this.activePaneIndex = null; // Reset the activePaneIndex since the pane is closed
    } else {
      // Close the previously opened pane, if any
      if (this.activePaneIndex !== null) {
        const previouslyOpenedPane = panes[this.activePaneIndex];

        if (previouslyOpenedPane) {
          previouslyOpenedPane.closePane();
        }
      }

      // Open the clicked pane
      clickedPane.openPane();
      this.activePaneIndex = panes.indexOf(clickedPane); // Update the activePaneIndex to the newly opened pane
    }
  }

  private togglePaneSwitcherPaneVisibility(event: CustomEvent<{ bindID: string; switchState: boolean }>): void {
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
      return paneSwitcher.querySelector(`#${bindID}`);
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
    const nextButton = this.toggleButtons[(currentFocusedIndex + 1) % this.toggleButtons.length];
    const prevButton = this.toggleButtons[
      (currentFocusedIndex - 1 + this.toggleButtons.length) % this.toggleButtons.length
    ];

    switch (event.key) {
      case keyArrowDown:
        event.preventDefault();
        nextButton.focus();
        break;
      case keyArrowUp:
        event.preventDefault();
        prevButton.focus();
        break;
      case keyTab:
        event.preventDefault();
        break;
      case keyEnter:
      case keySpace: {
        event.preventDefault();
        const clickedButton = this.toggleButtons[currentFocusedIndex];
        const index = this.toggleButtons.indexOf(clickedButton);
        const clickedPane = this.panes[index];
        if (clickedPane) {
          this.handleToggle(clickedButton.getAttribute('bind-id')!, this.panes);
          clickedPane.focus();
        }
        break;
      }
      default:
        break;
    }
  };
}
