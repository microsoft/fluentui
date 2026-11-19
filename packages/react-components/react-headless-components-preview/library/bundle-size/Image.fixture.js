// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import { Image, renderImage, useImage } from '@fluentui/react-headless-components-preview/image';

console.log(Image, renderImage, useImage);

export default {
  name: '@fluentui/react-headless-components-preview/image',
};
