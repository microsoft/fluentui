export * from '@uifabric/styling';

import './version';

// Ensure theme is initialized when this package is referenced.
import { initializeThemeInCustomizations } from '@uifabric/styling/lib/styles/theme';
initializeThemeInCustomizations();
