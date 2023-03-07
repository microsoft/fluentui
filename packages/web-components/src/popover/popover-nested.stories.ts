import { attr, customElement, FASTElement, html } from '@microsoft/fast-element';

@customElement({
  name: 'fuisb-popover-nested-inner',
  template: html`
    <fluent-popover
      ?open="${x => x.open}"
      @dismiss="${(x, c) => {
        console.log('inner dismiss');
        x.close(c.event);
      }}"
      position="above"
    >
      <button slot="anchor" @click="${x => x.toggle()}">${x => (x.open ? 'Close' : 'Open') + ' 2nd level'}</button>
      <div>Nested popover</div>
    </fluent-popover>
  `,
  shadowOptions: null,
})
export class NestedInner extends FASTElement {
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  public toggle() {
    console.log('inner toggle', this.open);
    this.open = !this.open;
  }

  public close(e: MouseEvent) {
    console.log('inner close', this.open);
    this.open = false;
    e.stopPropagation();
  }
}

@customElement({
  name: 'fuisb-popover-nested',
  template: html`
    <fluent-popover
      ?open="${x => x.open}"
      @dismiss="${x => {
        console.log('outer dismiss');
        x.close();
      }}"
      position="after"
    >
      <button style="margin: 100px 0 0 100px" slot="anchor" @click="${x => x.toggle()}">
        ${x => (x.open ? 'Close' : 'Open') + ' 1st level'}
      </button>
      <fuisb-popover-nested-inner></fuisb-popover-nested-inner>
      First level popover
      <fuisb-popover-nested-inner></fuisb-popover-nested-inner>
    </fluent-popover>
  `,
  shadowOptions: null /* disable shadow DOM for the story */,
})
export class NestedStory extends FASTElement {
  @attr({ mode: 'boolean' })
  public open: boolean = false;

  public toggle() {
    console.log('outer toggle', this.open);
    this.open = !this.open;
  }

  public close() {
    console.log('outer close', this.open);
    this.open = false;
  }
}
