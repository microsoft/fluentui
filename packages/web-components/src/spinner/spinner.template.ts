import { html } from '@microsoft/fast-element';
import { Spinner } from './spinner.js';

export const template = html<Spinner>`
  <slot name="indicator"
    ><svg class="progress" part="progress" viewBox="0 0 16 16">
      <circle class="background" cx="8px" cy="8px" r="7px"></circle>
      <circle class="indicator" cx="8px" cy="8px" r="7px"></circle></svg
  ></slot>
`;
