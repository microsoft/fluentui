import { FASTElement, customElement, attr, html, css } from '@microsoft/fast-element';

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 300px;
    border: 1px solid var(--neutral-base-color);
    border-radius: 4px;
    padding: 10px;
  }
`;

// classes on the host are a bit of an anti-pattern
// most common use for <template> ARIA attributes
const template = html<StressComponent>`
  <fluent-button>A button</fluent-button>
  <fluent-divider></fluent-divider>
  <fluent-checkbox checked=${el => el.checked}>Check me out</fluent-checkbox>
  <fluent-divider></fluent-divider>
  <fluent-progress-ring></fluent-progress-ring>
  <fluent-divider></fluent-divider>
  <fluent-number-field value="0"></fluent-number-field>
  <fluent-divider></fluent-divider>
`;

@customElement({
  name: 'stress-component',
  template,
  styles,
})
export class StressComponent extends FASTElement {
  @attr public id: string = '';
  @attr({ mode: 'boolean' }) public checked: boolean = false;
}
