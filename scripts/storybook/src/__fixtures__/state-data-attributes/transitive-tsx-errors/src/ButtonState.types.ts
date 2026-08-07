/**
 * Pure state declaration — the inspection-eligible file.
 * It deliberately does NOT import from renderButton.tsx; both files simply
 * coexist inside the same sourceRoot.  The extractor must succeed even though
 * renderButton.tsx has JSX / type errors that would surface if that file were
 * included in the checked set.
 */
export type ButtonState = {
  root: {
    /** Whether the button is disabled. */
    'data-disabled'?: 'true' | 'false';
    /** Visual appearance. */
    'data-appearance': 'primary' | 'secondary';
  };
};
