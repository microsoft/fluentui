import { FluentDesignSystem } from '../fluent-design-system.js';
import { definition as buttonDefinition } from '../button/button.definition.js';
import { definition } from './message-bar.definition.js';

definition.define(FluentDesignSystem.registry);
buttonDefinition.define(FluentDesignSystem.registry);

const dismissed20Regular = `
  <svg
    fill="currentColor"
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
      fill="currentColor"
    ></path>
  </svg>
`;

const infoIcon = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10ZM9.50806 8.91012C9.55039 8.67687 9.75454 8.49999 10 8.49999C10.2455 8.49999 10.4496 8.67687 10.4919 8.91012L10.5 8.99999V13.5021L10.4919 13.592C10.4496 13.8253 10.2455 14.0021 10 14.0021C9.75454 14.0021 9.55039 13.8253 9.50806 13.592L9.5 13.5021V8.99999L9.50806 8.91012ZM9.25 6.74999C9.25 6.33578 9.58579 5.99999 10 5.99999C10.4142 5.99999 10.75 6.33578 10.75 6.74999C10.75 7.16421 10.4142 7.49999 10 7.49999C9.58579 7.49999 9.25 7.16421 9.25 6.74999Z"
      fill="#616161"
    />
  </svg>
`;

const itemRenderer = () => {
  const messageBar = document.createElement('fluent-message-bar');
  messageBar.appendChild(document.createTextNode('message-bar'));

  // Create and append icon slot
  const icon = document.createElement('span');
  icon.setAttribute('slot', 'icon');
  icon.innerHTML = infoIcon;
  messageBar.appendChild(icon);

  // Create and append content slot
  const content = document.createElement('span');
  content.setAttribute('slot', 'content');
  content.appendChild(document.createTextNode('Accordion item'));
  messageBar.appendChild(content);

  // Create and append dismiss slot
  const dismiss = document.createElement('span');
  dismiss.setAttribute('slot', 'dismiss');
  dismiss.innerHTML = dismissed20Regular; // replace with your SVG content
  messageBar.appendChild(dismiss);

  // Create and append actions slot
  const actions = document.createElement('fluent-button');
  actions.setAttribute('slot', 'actions');
  actions.appendChild(document.createTextNode('Button'));
  messageBar.appendChild(actions);

  return messageBar;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
