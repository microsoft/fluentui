import { FASTElement, customElement, attr, html, css } from '@microsoft/fast-element';

const styles = css`
  .stress-component {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 300px;
    border: 1px solid var(--neutral-base-color);
    border-radius: 4px;
    padding: 10px;
  }
`;

const template = html<StressComponent>`
  <div class="stress-component" ${el => (el.id ? 'id="' + el.id + '"' : '')}>
    <fluent-button>A button</fluent-button>
    <fluent-divider></fluent-divider>
    <fluent-checkbox checked=${el => el.checked}>Check me out</fluent-checkbox>
    <fluent-divider></fluent-divider>
    <fluent-progress-ring></fluent-progress-ring>
    <fluent-divider></fluent-divider>
    <fluent-number-field value="0"></fluent-number-field>
    <fluent-divider></fluent-divider>
  </div>
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
