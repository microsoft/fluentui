import styles from './WhatsNewBoxes.module.css';

/** Story-scaffolding classes (see the colocated .module.css). Kept hook-shaped so consuming
 * components are untouched by the Griffel -> CSS Modules conversion. */
export const useWhatsNewStyles = (): typeof styles => styles;
