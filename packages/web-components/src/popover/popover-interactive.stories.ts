import { attr, customElement, FASTElement, html } from '@microsoft/fast-element';

@customElement({
  name: 'fuisb-popover-interactive',
  template: html`
    <div style="height: 11em; outline: 1px solid red; overflow: scroll;">
      <div style="height: 5em; display: flex; align-items: flex-end; background: #eee">Content above</div>
      <div style="width: 2000px; background: #99f">
        Content to the left
        <fluent-popover ?open="${x => x.open}" @dismiss="${x => x.close()}">
          <button slot="anchor" @click="${x => x.toggle()}">${x => (x.open ? 'Close' : 'Open')}</button>
          <div>I am the popover content!</div>
        </fluent-popover>
        Content to the right
      </div>
      <div style="height: 300px; background: #eee">Content below</div>
    </div>
  `,
  shadowOptions: null /* disable shadow DOM for the story */,
})
export class InteractiveStory extends FASTElement {
  @attr({ mode: 'boolean' })
  public open: boolean = true;

  public toggle() {
    this.open = !this.open;
  }

  public close() {
    this.open = false;
  }
}
