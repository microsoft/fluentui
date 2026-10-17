// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import { appearances, pickerSizes } from './ComboboxVrTypes';
import type { TagPickerFamily } from './ComboboxVrTypes';

type Size = (typeof pickerSizes)[number];

const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'flex-start' };

/** Band C and band G pin their container, and the pin is load-bearing in both. */
const BOX = 300;

/**
 * Long enough to overflow the input inside a 300px control at every size. The stretch is binary: it
 * does not fire at 35 characters in a 334px input and does at 93, so a short value renders three
 * unstretched cells that diff to zero and prove nothing. The scene's own probe pass asserts the flip
 * actually happened before any zero here is trusted.
 */
const OVERFLOWING = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore';

/**
 * The 84 closed cells. No surface is open and no cell is focused, so the control's focus underline
 * sits at scaleX(0) throughout; the :focus-within half of its rules is proved by the parity passes,
 * not by pixels.
 *
 * The total is 84 and not 81: band A's outline column and band C's one-tag column are NOT the same
 * cell. Band C pins a 300px container and no other band pins any width, so a band-A control is
 * intrinsically sized against the scene grid while a band-C control is clamped — a different
 * rendered width, and therefore a different tag layout and input stretch.
 *
 * Three bands must actually render, and the scene's probe pass checks each before a zero is
 * trusted: band C's six- and nine-tag cells must be more than one row tall (that is the growing
 * anchor the whole positioning design rests on), band F's cells must contain an Avatar at the
 * derived size, and band G's inputs must have flipped to width 100%.
 *
 * Band B is the guard for the cascade accident this family shares with Combobox and Dropdown:
 * `.disabled` must precede the invalid blocks, because Griffel's invalid buckets carry a
 * `:not(:focus-within)` clause that makes them (0,2,0) against the disabled bucket's (0,1,0), so a
 * disabled invalid control paints red on both sides.
 *
 * The rows carry data-band (and the flagged bands data-cell-size / data-tags) so the probe pass can
 * address a cell without counting siblings. They sit on plain layout divs that no rule selects, and
 * both implementations render the same scene, so they move no pixel on either side.
 *
 * Every tag in every populated cell is dismissible — both implementations force it — so each also
 * exercises the windmod Tag's own dismiss-glyph restoration. A diff that sits inside a tag is
 * triaged against the `tag` scene first.
 */
export const TagPickerVrScene = ({
  Avatar,
  Field,
  Tag,
  TagPicker,
  TagPickerButton,
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
    </>
  );

  const values = (count: number) =>
    ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].slice(0, count);

  // Slot types reject `false`, so the media shim is an element and never ReactNode.
  const tags = (count: number, media?: React.ReactElement) =>
    values(count).map(value => (
      <Tag key={value} media={media} value={value}>
        {value}
      </Tag>
    ));

  /** Every cell is the same composition; only the control's contents and the picker props move. */
  const cell = (
    key: string,
    size: Size,
    picker: Record<string, unknown>,
    control: Record<string, unknown>,
    children: React.ReactNode,
  ) => (
    <TagPicker key={key} size={size} inline={inline} {...picker}>
      <TagPickerControl {...control}>{children}</TagPickerControl>
      <TagPickerList popover={list?.popover}>{options}</TagPickerList>
    </TagPicker>
  );

  const inputCell = (key: string, size: Size, picker: Record<string, unknown> = {}, count = 1) =>
    cell(key, size, { selectedOptions: values(count), ...picker }, {}, [
      count > 0 ? (
        <TagPickerGroup key="group" aria-label="Selected">
          {tags(count)}
        </TagPickerGroup>
      ) : undefined,
      <TagPickerInput key="input" aria-label="Pick" />,
    ]);

  /** A, B — appearance x size, at four states. The invalid half needs a Field ancestor: the
   *  control reads its invalid state from the field context and has no prop of its own. */
  const stateBand = (band: string, key: string, picker: Record<string, unknown>, invalid = false) =>
    pickerSizes.map(size => (
      <div key={`${key}-${size}`} data-band={band} style={row}>
        {appearances.map(appearance => {
          const content = inputCell(`${key}-${size}-${appearance}`, size, { appearance, ...picker });

          return invalid ? (
            <Field key={`${appearance}-field`} validationState="error">
              {content}
            </Field>
          ) : (
            content
          );
        })}
      </div>
    ));

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      {/* A — 12 */}
      {stateBand('A', 'rest', {})}
      {/* B — 36 */}
      {stateBand('B', 'invalid', {}, true)}
      {stateBand('B', 'disabled', { disabled: true })}
      {stateBand('B', 'invalid-disabled', { disabled: true }, true)}

      {/* C — 15. The growth axis, pinned to 300px so six and nine tags wrap to two and three rows. */}
      {pickerSizes.map(size => (
        <div key={`growth-${size}`} data-band="C" data-cell-size={size} style={row}>
          {[0, 1, 3, 6, 9].map(count => (
            <div key={count} data-tags={count} style={{ width: BOX }}>
              {cell(
                `growth-${size}-${count}`,
                size,
                { selectedOptions: values(count) },
                { style: { minWidth: 0, width: BOX } },
                [
                  count > 0 ? (
                    <TagPickerGroup key="group" aria-label="Selected">
                      {tags(count)}
                    </TagPickerGroup>
                  ) : undefined,
                  <TagPickerInput key="input" aria-label="Pick" />,
                ],
              )}
            </div>
          ))}
        </div>
      ))}

      {/* D — 6. The button trigger, and its visually-hidden collapse once an option is selected. */}
      <div data-band="D" style={row}>
        {pickerSizes.map(size =>
          cell(`button-empty-${size}`, size, {}, {}, <TagPickerButton key="button">Pick a pet</TagPickerButton>),
        )}
      </div>
      <div data-band="D" style={row}>
        {pickerSizes.map(size =>
          cell(`button-selected-${size}`, size, { selectedOptions: values(1) }, {}, [
            <TagPickerGroup key="group" aria-label="Selected">
              {tags(1)}
            </TagPickerGroup>,
            <TagPickerButton key="button">Pick a pet</TagPickerButton>,
          ]),
        )}
      </div>

      {/* E — 9. The aside: chevron alone, chevron with a secondary action, and neither. */}
      <div data-band="E" style={row}>
        {pickerSizes.map(size => inputCell(`aside-plain-${size}`, size))}
      </div>
      <div data-band="E" style={row}>
        {pickerSizes.map(size =>
          cell(
            `aside-secondary-${size}`,
            size,
            { selectedOptions: values(1) },
            { secondaryAction: { children: 'All' } },
            [
              <TagPickerGroup key="group" aria-label="Selected">
                {tags(1)}
              </TagPickerGroup>,
              <TagPickerInput key="input" aria-label="Pick" />,
            ],
          ),
        )}
      </div>
      <div data-band="E" style={row}>
        {pickerSizes.map(size =>
          cell(`aside-none-${size}`, size, { selectedOptions: values(1) }, { expandIcon: null }, [
            <TagPickerGroup key="group" aria-label="Selected">
              {tags(1)}
            </TagPickerGroup>,
            <TagPickerInput key="input" aria-label="Pick" />,
          ]),
        )}
      </div>

      {/* F — 3. The avatar chain: picker size -> tag size -> avatar size, the only cell that can
          adjudicate it, because nothing else in the family reads the derived value at all. */}
      <div data-band="F" style={row}>
        {pickerSizes.map(size =>
          cell(`avatar-${size}`, size, { selectedOptions: values(1) }, {}, [
            <TagPickerGroup key="group" aria-label="Selected">
              {tags(1, <Avatar name="Ada Lovelace" />)}
            </TagPickerGroup>,
            <TagPickerInput key="input" aria-label="Pick" />,
          ]),
        )}
      </div>

      {/* G — 3. The input stretch, pinned to the same 300px box: the required value length scales
          with the cell width, so the width has to be fixed for the character count to mean anything. */}
      <div data-band="G" style={row}>
        {pickerSizes.map(size => (
          <div key={`stretch-${size}`} data-cell-size={size} style={{ width: BOX }}>
            {cell(`stretch-${size}`, size, { selectedOptions: values(1) }, { style: { minWidth: 0, width: BOX } }, [
              <TagPickerGroup key="group" aria-label="Selected">
                {tags(1)}
              </TagPickerGroup>,
              <TagPickerInput key="input" aria-label="Pick" value={OVERFLOWING} />,
            ])}
          </div>
        ))}
      </div>
    </div>
  );
};
