// Import a type from Button.tsx, making it a genuinely transitive member of the
// TypeScript program. The collection loop must still ignore Button.tsx and its
// duplicate ButtonState export — only this .ts file is in filteredSourceFileSet.
import type { ButtonRef } from './Button';

/**
 * State declaration file — included in the inspection set (.ts).
 */
export type ButtonState = {
  root: {
    /** Whether the button is disabled. */
    'data-disabled'?: 'true' | 'false';
  };
  /** @internal */
  ref?: ButtonRef;
};
