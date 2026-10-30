// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import type { TagPickerFamily } from './ComboboxVrTypes';

/**
 * The width match at three anchor widths. The narrow cell overrides min-width as well as width: the
 * control's own 250px floor would otherwise clamp it back and the band would silently become a
 * third 250px cell. The narrow cell also carries six tags, so its control is MULTI-ROW — a growing
 * anchor under an open surface, which no predecessor scene could contain.
 *
 * The anchor is the CONTROL div on both implementations — both merge the positioning target ref
 * onto the control root, not onto the trigger — so styling the control is what makes this band
 * measure anything at all.
 */
// The middle cell is pinned at the control's own 250px floor rather than left unstyled: an unstyled
// control is a block-level flex box and fills the scene container, and a surface as wide as the
// viewport is repositioned by Griffel's floating-ui (shifted inline and flipped block-start) where
// the native top layer leaves it in place. That measures viewport clamping, not width matching.
const ANCHORS = [
  { key: 'narrow', style: { minWidth: 0, width: '180px' }, tags: 6 },
  { key: 'at-min', style: { width: '250px' }, tags: 1 },
  { key: 'wide', style: { width: '480px' }, tags: 1 },
] as const;

export const TagPickerWidthVrScene = ({
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
  const values = ['one', 'two', 'three', 'four', 'five', 'six'];

  return (
    <div style={{ padding: 16, background: '#fff', width: 1248 }}>
      {ANCHORS.map(anchor => {
        const selected = values.slice(0, anchor.tags);

        return (
          <div key={anchor.key} style={{ height: 260, boxSizing: 'border-box' }}>
            <TagPicker open inline={inline} selectedOptions={selected}>
              <TagPickerControl style={anchor.style}>
                <TagPickerGroup aria-label="Selected">
                  {selected.map(value => (
                    <Tag key={value} value={value}>
                      {value}
                    </Tag>
                  ))}
                </TagPickerGroup>
                <TagPickerInput aria-label="Pick" />
              </TagPickerControl>
              <TagPickerList popover={list?.popover}>
                <TagPickerOption value="cat">Cat</TagPickerOption>
                <TagPickerOption value="dog">Dog</TagPickerOption>
                <TagPickerOption value="lynx">Lynx</TagPickerOption>
              </TagPickerList>
            </TagPicker>
          </div>
        );
      })}
    </div>
  );
};
