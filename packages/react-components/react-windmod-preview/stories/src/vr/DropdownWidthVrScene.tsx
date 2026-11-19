// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import type { DropdownFamily } from './ComboboxVrTypes';

/**
 * The width match at three anchor widths. The narrow cell overrides min-width as well as width:
 * the root's own 250px floor would otherwise clamp it back and the band would silently become a
 * third 250px cell.
 *
 * The anchor is the component ROOT on both implementations — headless and Griffel both merge the
 * positioning target ref onto the root slot, not the trigger — so styling the root is what makes
 * this band measure anything at all.
 */
const ANCHORS = [
  { key: 'narrow', style: { minWidth: '160px', width: '160px' } },
  { key: 'natural', style: undefined },
  { key: 'wide', style: { width: '480px' } },
] as const;

export const DropdownWidthVrScene = ({ Dropdown, Option, listbox }: DropdownFamily): React.ReactNode => (
  <div style={{ padding: 16, background: '#fff', width: 1248 }}>
    {ANCHORS.map(anchor => (
      <div key={anchor.key} style={{ height: 230, boxSizing: 'border-box' }}>
        <Dropdown
          open
          listbox={listbox}
          defaultSelectedOptions={['b']}
          defaultValue="Two"
          root={{ style: anchor.style }}
        >
          <Option value="a">One</Option>
          <Option value="b">Two</Option>
          <Option value="c">Three</Option>
        </Dropdown>
      </div>
    ))}
  </div>
);
