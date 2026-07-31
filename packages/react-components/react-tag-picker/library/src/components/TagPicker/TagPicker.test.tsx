import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPicker } from './TagPicker';
import { TagPickerControl } from '../TagPickerControl/TagPickerControl';
import { TagPickerInput } from '../TagPickerInput/TagPickerInput';
import { TagPickerList } from '../TagPickerList/TagPickerList';

describe('TagPicker', () => {
  isConformant({
    Component: TagPicker,
    displayName: 'TagPicker',
    requiredProps: { children: <></> },
    disabledTests: [
      // TagPicker does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `component-has-static-classnames-object` left the default set with DECISIONS.md D16.6
      // and this package no longer opts into it, so the entry is dropped rather than kept as a
      // no-op. Its replacement, `component-has-group-marker`, is disabled for the same reason
      // the three above are: TagPicker is a context provider with no styles hook and no root
      // element, so there is nothing to stamp a marker on.
      'component-has-group-marker',
      // TagPicker does not have own styles
    ],
  });

  it('renders a default state', () => {
    const result = render(
      <TagPicker>
        <>Default Picker</>
        <>Default Picker</>
      </TagPicker>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('does not change expand label if label exists', () => {
    const { getByRole } = render(
      <TagPicker>
        <TagPickerControl
          expandIcon={{ 'aria-label': 'Expand Icon aria-label', 'aria-labelledby': 'Expand Icon aria-labelledby' }}
        >
          <TagPickerInput aria-labelledby="Selected Employees" />
        </TagPickerControl>
        <TagPickerList />
      </TagPicker>,
    );

    const expandButton = getByRole('button');
    expect(expandButton.getAttribute('aria-labelledby')).toContain('Expand Icon aria-label');
    expect(expandButton.getAttribute('aria-labelledby')).toContain('Expand Icon aria-labelledby');
  });

  it('sets expand label if not labelled', () => {
    const { getByRole } = render(
      <TagPicker>
        <TagPickerControl>
          <TagPickerInput aria-labelledby="Selected Employees" />
        </TagPickerControl>
        <TagPickerList />
      </TagPicker>,
    );

    const expandButton = getByRole('button');
    expect(expandButton.getAttribute('aria-labelledby')).toContain('Selected Employees');
  });

  it('sets expand button to disabled when TagPicker is disabled', () => {
    const { getByRole } = render(
      <TagPicker disabled>
        <TagPickerControl>
          <TagPickerInput />
        </TagPickerControl>
        <TagPickerList />
      </TagPicker>,
    );

    const expandButton = getByRole('button');
    expect(expandButton.getAttribute('aria-disabled')).toEqual('true');
  });
});
