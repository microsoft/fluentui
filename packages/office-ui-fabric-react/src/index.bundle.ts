export * from './index';

// Using the default import, include all icon definitions. Products that care
// about bundle size should not be using the main entry, until tree shaking
// is perfected. (Use the top level imports instead.)
import { initializeIcons } from './Icons';

initializeIcons();
