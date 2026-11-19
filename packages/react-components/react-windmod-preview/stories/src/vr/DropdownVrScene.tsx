// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import { appearances, sizes } from './ComboboxVrTypes';
import type { DropdownFamily } from './ComboboxVrTypes';

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

/**
 * The 63 closed cells. No surface is open and no cell is focused, so the focus underline sits at
 * scaleX(0) throughout — the same limitation InputVrScene.tsx records. The :focus-within half of
 * the root's rules, the clear button's keyborg ring and the :has() carve-out are proved by the
 * parity passes, not by pixels.
 *
 * Every value string here is deliberately SHORT and single-word. Neither implementation truncates
 * the trigger text — the value is a bare text node in a `[content] 1fr` track — so a long
 * unbreakable value widens the field past its parent and a long multi-word value wraps and grows
 * the field from 32px to 92px tall. Both are faithful to Griffel and neither belongs in a matrix
 * whose point is the field box.
 *
 * Band B is the guard for two cascade accidents: `.disabled` must precede the invalid blocks
 * (Griffel's invalid buckets carry a :not(:focus-within) clause that makes them (0,2,0)), and
 * inside `.button` the placeholder block must precede the disabled block (Griffel merges
 * disabledText after placeholder), which the disabled x placeholder cells render.
 *
 * Band C is the guard for the clear button's margin-inline-start, which the icon size blocks own
 * and the clear-button block must not flatten: 2px at small and medium, 6px at large.
 */
export const DropdownVrScene = ({ Dropdown, Option }: DropdownFamily): React.ReactNode => {
  const options = (
    <>
      <Option value="a">One</Option>
      <Option value="b">Two</Option>
    </>
  );

  const band = (key: string, props: (size: (typeof sizes)[number]) => Record<string, unknown>) =>
    sizes.map(size => (
      <div key={`${key}-${size}`} style={row}>
        {appearances.map(appearance => (
          <Dropdown key={appearance} appearance={appearance} size={size} {...props(size)}>
            {options}
          </Dropdown>
        ))}
      </div>
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* A — 24 cells */}
      {band('value', () => ({ defaultValue: 'Text' }))}
      {band('placeholder', size => ({ placeholder: `Placeholder ${size}` }))}
      {/* B — 36 cells */}
      {band('invalid', () => ({ 'aria-invalid': true, defaultValue: 'Text' }))}
      {band('disabled', size => ({ disabled: true, placeholder: `Placeholder ${size}` }))}
      {band('invalid-disabled', () => ({ 'aria-invalid': true, disabled: true, defaultValue: 'Text' }))}
      {/* C — 3 cells. The expand/clear swap; the non-clearable twin of each is band A's value row. */}
      <div style={row}>
        {sizes.map(size => (
          <Dropdown key={size} size={size} clearable defaultSelectedOptions={['a']} defaultValue="One">
            {options}
          </Dropdown>
        ))}
      </div>
    </div>
  );
};
