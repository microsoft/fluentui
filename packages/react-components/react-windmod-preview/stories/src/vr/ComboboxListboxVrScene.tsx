// eslint-disable-next-line import/no-extraneous-dependencies -- story-only helper outside the *.stories.tsx devDependencies exemption
import * as React from 'react';

import type { ComboboxFamily } from './ComboboxVrTypes';

const row: React.CSSProperties = { display: 'flex', gap: 16, alignItems: 'flex-start' };

const LONG = 'An option label long enough to grow the surface past its floor';

/**
 * Option, OptionGroup and the Listbox box at high density, with no top layer involved: a standalone
 * Listbox is never promoted, so the whole scene captures at the storybook root.
 */
export const ComboboxListboxVrScene = ({ Listbox, Option, OptionGroup }: ComboboxFamily): React.ReactNode => {
  const states = (
    <>
      <Option value="a">Rest</Option>
      <Option value="b">Selected</Option>
      <Option value="c" disabled>
        Disabled
      </Option>
      <Option value="d" disabled>
        Selected + disabled
      </Option>
    </>
  );

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 16, padding: 24, background: '#fff' }}>
      <div style={row}>
        {/* D — single-select states */}
        <Listbox selectedOptions={['b', 'd']}>{states}</Listbox>
        {/* E — the same four under multiselect */}
        <Listbox multiselect selectedOptions={['b', 'd']}>
          {states}
        </Listbox>
        {/* F — the separator on a non-last group, its absence on the last, and on a lone group */}
        <Listbox selectedOptions={['g2']}>
          <OptionGroup label="First group">
            <Option value="g1">Alpha</Option>
            <Option value="g2">Beta</Option>
          </OptionGroup>
          <OptionGroup label="Last group">
            <Option value="g3">Gamma</Option>
          </OptionGroup>
        </Listbox>
        <Listbox>
          <OptionGroup label="Lone group">
            <Option value="h1">Delta</Option>
          </OptionGroup>
        </Listbox>
      </div>
      {/* G — the 160px floor beside a row that outgrows it */}
      <div style={row}>
        <Listbox>
          <Option value="i1">Ok</Option>
        </Listbox>
        <Listbox multiselect selectedOptions={['j1']}>
          <Option value="j1">{LONG}</Option>
        </Listbox>
      </div>
    </div>
  );
};
