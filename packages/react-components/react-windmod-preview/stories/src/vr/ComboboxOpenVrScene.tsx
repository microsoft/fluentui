// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import { sizes } from './ComboboxVrTypes';
import type { ComboboxFamily } from './ComboboxVrTypes';

/**
 * Six open surfaces in one direction. A top-layer surface is position: fixed and clamps to the
 * VIEWPORT, so a document taller than 720px cannot hold its surfaces apart — LTR and RTL are two
 * scenes rather than two blocks of one, and each row reserves 240px so no two surfaces intersect.
 *
 * The 40px outer padding and 40px column gap are load-bearing for the pixel gate, not taste. The
 * two implementations place these surfaces at identical rects and compare equal on every computed
 * property (combobox-impl/p7), and each side is self-identical across captures (p10), but windmod's
 * surface is painted from the top layer while Griffel's is a transform-positioned portal, and one
 * check glyph's diagonal antialiasing lands a single level apart at some scene offsets and not
 * others.
 *
 * The offset sensitivity is REAL, but its magnitude is HARNESS-DEPENDENT, so each row is quoted
 * with the harness that produced it — run.mjs states outright that `--disable-lcd-text` changes
 * both sides of every scene and that numbers measured without it are not comparable to numbers
 * measured with it.
 *   run.mjs d79008632e (pre-LCD-flag): 24/16 → 13px, 24/40 → 15px, 32/40 → 5px, 40/40 → 0, 48/40 → 0
 *   run.mjs 5762cebd39 (current):      24/16 →  8px, 24/40 →  0px, 32/40 →  0px, 40/40 → 0, 48/40 → 0
 * The current row is a capture-time re-offset with a forced reposition rather than a re-authored
 * rebuild (review-combobox/r3); it reproduces both known-zero points exactly, and its self-controls
 * are 0 on each side. Anything that moves this scene must re-verify the gate rather than assume
 * it — including assuming these numbers.
 */
export const ComboboxOpenVrScene = ({ Combobox, Option, listbox }: ComboboxFamily): React.ReactNode => {
  const options = (
    <>
      <Option value="a">One</Option>
      <Option value="b">Two</Option>
      <Option value="c">Three</Option>
      <Option value="d">Four</Option>
    </>
  );

  const cell = (size: (typeof sizes)[number], multiselect: boolean) => (
    <Combobox
      key={`${size}-${multiselect}`}
      size={size}
      open
      listbox={listbox}
      multiselect={multiselect}
      defaultSelectedOptions={multiselect ? ['a', 'c'] : ['b']}
      defaultValue={multiselect ? 'One, Three' : 'Two'}
    >
      {options}
    </Combobox>
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
