// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import { appearances, sizes } from './ComboboxVrTypes';
import type { ComboboxFamily } from './ComboboxVrTypes';

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center' };

/**
 * The 63 closed cells. No surface is open and no cell is focused, so the focus underline sits at
 * scaleX(0) throughout — the same limitation InputVrScene.tsx records. The :focus-within half of
 * the root's rules is proved by the parity pass, not by pixels.
 */
export const ComboboxVrScene = ({ Combobox, Option }: ComboboxFamily): React.ReactNode => {
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
          <Combobox key={appearance} appearance={appearance} size={size} {...props(size)}>
            {options}
          </Combobox>
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
      {band('disabled', () => ({ disabled: true, defaultValue: 'Text' }))}
      {band('invalid-disabled', () => ({ 'aria-invalid': true, disabled: true, defaultValue: 'Text' }))}
      {/* C — 3 cells. The expand/clear swap; the non-clearable twin of each is band A's value row. */}
      <div style={row}>
        {sizes.map(size => (
          <Combobox key={size} size={size} clearable defaultSelectedOptions={['a']} defaultValue="One">
            {options}
          </Combobox>
        ))}
      </div>
    </div>
  );
};
