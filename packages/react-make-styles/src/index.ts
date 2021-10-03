export { mergeClasses, createDOMRenderer } from '@fluentui/make-styles';

export { makeStyles } from './makeStyles';
export { makeStaticStyles } from './makeStaticStyles';

export * from './RendererContext';
export { renderToStyleElements } from './renderToStyleElements';

// Private exports, are used by build time transforms
export { __styles } from './__styles';

// TODO: we should re-export some of types from "@fluentui/make-styles" once we will get update to TS4
