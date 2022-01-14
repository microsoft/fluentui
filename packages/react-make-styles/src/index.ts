export { shorthands, mergeClasses, createDOMRenderer } from '@fluentui/make-styles';
export type { MakeStylesStyle } from '@fluentui/make-styles';

export { makeStyles } from './makeStyles';
export { makeStaticStyles } from './makeStaticStyles';

export * from './RendererContext';
export { renderToStyleElements } from './renderToStyleElements';

// Private exports, are used by build time transforms
export { __styles } from './__styles';
