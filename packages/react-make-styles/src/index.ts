export { shorthands, mergeClasses, createDOMRenderer } from '@griffel/core';
export type { GriffelStyle as MakeStylesStyle } from '@griffel/core';

export { makeStyles } from './makeStyles';
export { makeStaticStyles } from './makeStaticStyles';

export * from './RendererContext';
export { renderToStyleElements } from './renderToStyleElements';

// Private exports, are used by build time transforms
export { __styles } from './__styles';
