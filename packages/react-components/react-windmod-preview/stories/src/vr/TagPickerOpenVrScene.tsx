// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import { pickerSizes } from './ComboboxVrTypes';
import type { TagPickerFamily } from './ComboboxVrTypes';

/**
 * Six open surfaces in one direction. A top-layer surface is position: fixed and clamps to the
 * VIEWPORT, so a document taller than 720px cannot hold its surfaces apart — LTR and RTL are two
 * scenes rather than two blocks of one, and each row reserves 240px so no two surfaces intersect.
 *
 * The 40px outer padding and 40px column gap are load-bearing for the pixel gate. Each row is
 * quoted with the harness that produced it — `--disable-lcd-text` changes both sides of every
 * scene, so numbers measured without it are not comparable to numbers measured with it.
 *   run.mjs d79008632e (pre-LCD-flag): 24/16 → 13px, 24/40 → 15px, 32/40 → 5px, 40/40 → 0, 48/40 → 0
 *   run.mjs 5762cebdf938f2e7b18fc8d0d1afbd73 (current): 24/16 → 8px, 24/40 → 0, 32/40 → 0,
 *   40/40 → 0, 48/40 → 0
 * Anything that moves this scene must re-verify the gate rather than assume it — including
 * assuming these numbers.
 *
 * The second row carries two selections, so it also holds the family's only cells where an open
 * surface sits under a populated tag rail.
 */
export const TagPickerOpenVrScene = ({
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  inline,
  list,
}: TagPickerFamily): React.ReactNode => {
  const options = (
    <>
      <TagPickerOption value="cat">Cat</TagPickerOption>
      <TagPickerOption value="dog">Dog</TagPickerOption>
      <TagPickerOption disabled value="ferret">
        Ferret
      </TagPickerOption>
      <TagPickerOption secondaryContent="purrs" value="lynx">
        Lynx
      </TagPickerOption>
    </>
  );

  const cell = (size: (typeof pickerSizes)[number], selected: string[]) => (
    <TagPicker key={`${size}-${selected.length}`} size={size} open inline={inline} selectedOptions={selected}>
      <TagPickerControl>
        {selected.length > 0 ? (
          <TagPickerGroup aria-label="Selected">
            {selected.map(value => (
              <Tag key={value} value={value}>
                {value}
              </Tag>
            ))}
          </TagPickerGroup>
        ) : undefined}
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList popover={list?.popover}>{options}</TagPickerList>
    </TagPicker>
  );

  return (
    <div style={{ padding: 40, background: '#fff', width: 1200 }}>
      {[[] as string[], ['cat', 'dog']].map(selected => (
        <div
          key={selected.length}
          style={{ display: 'flex', gap: 40, alignItems: 'flex-start', height: 240, boxSizing: 'border-box' }}
        >
          {pickerSizes.map(size => cell(size, selected))}
        </div>
      ))}
    </div>
  );
};
