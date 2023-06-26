import { attr, FASTElement } from '@microsoft/fast-element';

export class DrawerToggleButton extends FASTElement {
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  @attr({ attribute: 'drawer-id' })
  public drawerId: string = '';

  public emitToggle(): void {
    // Toggle logic here
    this.open = !this.open;

    // Emit the custom toggle event
    this.$emit('toggle', {
      drawerId: this.drawerId,
      open: this.open, // Indicate whether the drawer is open or closed
    });
  }

  // @attr({ mode: "boolean" })
  // public open: boolean = false;

  // @attr
  // public drawer: Drawer | null = null;

  // public handleToggle(): void {
  //   console.log("toggle");
  //   console.log(this.open);
  //   this.open = !this.open;
  //   this.$emit("toggle", { open: this.open, drawer: this.drawer });
  // }

  // connectedCallback() {
  //   super.connectedCallback();
  //   this.addEventListener("click", this.handleToggle);
  // }

  // disconnectedCallback() {
  //   super.disconnectedCallback();
  //   this.removeEventListener("click", this.handleToggle);
  // }
}
