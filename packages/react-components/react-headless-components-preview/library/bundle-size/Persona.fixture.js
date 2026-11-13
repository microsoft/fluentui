// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Persona, renderPersona, usePersona } from '@fluentui/react-headless-components-preview/persona';

console.log(Persona, renderPersona, usePersona);

export default {
  name: '@fluentui/react-headless-components-preview/persona',
};
