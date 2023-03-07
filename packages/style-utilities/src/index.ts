export * from './classNames/index';
export * from './styles/index';
export * from './utilities/index';
export * from './interfaces/index';
export * from './MergeStyles';
export * from './cdn';

import './version';

// Ensure theme is initialized when this package is referenced.
import { initializeThemeInCustomizations } from './styles/theme';
initializeThemeInCustomizations();
