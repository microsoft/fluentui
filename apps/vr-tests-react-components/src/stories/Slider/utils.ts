import styles from './utils.module.css';

/** Story-scaffolding classes (see utils.module.css, which hard-codes the literal
 * `sliderCSSVars` custom-property names). Kept as a hook-shaped function so the
 * consuming stories are untouched by the Griffel -> CSS Modules conversion. */
export const useStyles = (): typeof styles => styles;
