// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import type { ComboboxFamily } from './ComboboxVrTypes';

/**
 * The width match at three anchor widths. The narrow cell overrides min-width as well as width:
 * the root's own 250px floor would otherwise clamp it back and the band would silently become a
 * third 250px cell.
 */
const ANCHORS = [
  { key: 'narrow', style: { minWidth: '160px', width: '160px' } },
  { key: 'natural', style: undefined },
  { key: 'wide', style: { width: '480px' } },
] as const;

export const ComboboxWidthVrScene = ({ Combobox, Option, listbox }: ComboboxFamily): React.ReactNode => (
  <div style={{ padding: 16, background: '#fff', width: 1248 }}>
    {ANCHORS.map(anchor => (
      <div key={anchor.key} style={{ height: 230, boxSizing: 'border-box' }}>
        <Combobox
          open
          listbox={listbox}
          defaultSelectedOptions={['b']}
          defaultValue="Two"
          root={{ style: anchor.style }}
        >
          <Option value="a">One</Option>
          <Option value="b">Two</Option>
          <Option value="c">Three</Option>
        </Combobox>
      </div>
    ))}
  </div>
);
