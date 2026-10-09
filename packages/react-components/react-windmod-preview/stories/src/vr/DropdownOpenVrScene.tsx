// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import { sizes } from './ComboboxVrTypes';
import type { DropdownFamily } from './ComboboxVrTypes';

/**
 * Six open surfaces in one direction. A top-layer surface is position: fixed and clamps to the
 * VIEWPORT, so a document taller than 720px cannot hold its surfaces apart — LTR and RTL are two
 * scenes rather than two blocks of one, and each row reserves 240px so no two surfaces intersect.
 *
 * The 40px outer padding and 40px column gap are load-bearing for the pixel gate, not taste, and
 * are inherited from the Combobox cycle's measurement rather than chosen. Each row is quoted with
 * the harness that produced it — run.mjs states outright that `--disable-lcd-text` changes both
 * sides of every scene and that numbers measured without it are not comparable to numbers measured
 * with it.
 *   run.mjs d79008632e (pre-LCD-flag): 24/16 → 13px, 24/40 → 15px, 32/40 → 5px, 40/40 → 0, 48/40 → 0
 *   run.mjs 5762cebd39 (current):      24/16 →  8px, 24/40 →  0px, 32/40 →  0px, 40/40 → 0, 48/40 → 0
 * Anything that moves this scene must re-verify the gate rather than assume it — including
 * assuming these numbers.
 *
 * Multiselect cells carry no clear button: useDropdown nulls that slot entirely under multiselect,
 * so the clearable cells live in the closed scene's band C instead.
 */
export const DropdownOpenVrScene = ({ Dropdown, Option, listbox }: DropdownFamily): React.ReactNode => {
  const options = (
    <>
      <Option value="a">One</Option>
      <Option value="b">Two</Option>
      <Option value="c">Three</Option>
      <Option value="d">Four</Option>
    </>
  );

  const cell = (size: (typeof sizes)[number], multiselect: boolean) => (
    <Dropdown
      key={`${size}-${multiselect}`}
      size={size}
      open
      listbox={listbox}
      multiselect={multiselect}
      defaultSelectedOptions={multiselect ? ['a', 'c'] : ['b']}
      defaultValue={multiselect ? 'One, Three' : 'Two'}
    >
      {options}
    </Dropdown>
  );

  return (
    <div style={{ padding: 40, background: '#fff', width: 1200 }}>
      {[false, true].map(multiselect => (
        <div
          key={String(multiselect)}
          style={{ display: 'flex', gap: 40, alignItems: 'flex-start', height: 240, boxSizing: 'border-box' }}
        >
          {sizes.map(size => cell(size, multiselect))}
        </div>
      ))}
    </div>
  );
};
