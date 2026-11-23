// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Textarea, renderTextarea, useTextarea } from '@fluentui/react-headless-components-preview/textarea';

console.log(Textarea, renderTextarea, useTextarea);

export default {
  name: '@fluentui/react-headless-components-preview/textarea',
};
