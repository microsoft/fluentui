import { ElementViewTemplate } from '@microsoft/fast-element';
import { flipperTemplate } from '@microsoft/fast-foundation';
import { Flipper } from './flipper.js';

export const template: ElementViewTemplate<Flipper> = flipperTemplate({
  next: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.57107 11.8403C6.90803 12.2987 6 11.8271 6 11.0244V4.97557C6 4.17283 6.90803 3.70129 7.57106 4.1597L11.3555 6.77618C12.2133 7.3693 12.2134 8.63066 11.3555 9.22378L7.57107 11.8403Z"/>
</svg>
`,
  previous: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M9.42782 11.8403C10.0909 12.2987 10.9989 11.8271 10.9989 11.0244V4.97557C10.9989 4.17283 10.0909 3.70129 9.42782 4.1597L5.6434 6.77618C4.78553 7.3693 4.78553 8.63066 5.6434 9.22378L9.42782 11.8403Z"/>
</svg>
`,
});
