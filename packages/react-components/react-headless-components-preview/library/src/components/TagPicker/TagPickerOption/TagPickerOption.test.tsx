import * as React from 'react';
import { TagPickerOption } from './TagPickerOption';

// ---------------------------------------------------------------------------
// Compile-time contract tests
// These assertions are checked by TypeScript during `tsc -p tsconfig.spec.json`.
// No runtime behaviour is exercised here; see TagPicker.test.tsx for integration
// tests that verify data-disabled, role="option", etc.
// ---------------------------------------------------------------------------

describe('TagPickerOption type contract', () => {
  it('accepts disabled as a valid prop (was missing before the fix)', () => {
    // This must NOT be annotated @ts-expect-error: disabled is a valid public prop.
    const el = (
      <TagPickerOption value="cat" disabled>
        Cat
      </TagPickerOption>
    );
    expect(el).toBeDefined();
  });

  it('accepts string children with optional text', () => {
    const el = <TagPickerOption value="cat">Cat</TagPickerOption>;
    expect(el).toBeDefined();
  });

  it('accepts non-string children when text is provided', () => {
    const el = (
      <TagPickerOption value="cat" text="Cat">
        <span>Cat</span>
      </TagPickerOption>
    );
    expect(el).toBeDefined();
  });

  it('compile-time: value is required', () => {
    // @ts-expect-error value is required
    const el = <TagPickerOption>Cat</TagPickerOption>;
    expect(el).toBeDefined();
  });

  it('compile-time: text is required when children is not a plain string', () => {
    const el = (
      // @ts-expect-error text is required when children is non-string
      <TagPickerOption value="cat">
        <span>Cat</span>
      </TagPickerOption>
    );
    expect(el).toBeDefined();
  });
});
