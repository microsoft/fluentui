import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { ProgressField } from './ProgressField';

describe('ProgressField', () => {
  isConformant({
    Component: ProgressField,
    displayName: 'ProgressField',
  });

  // Most functionality is tested by Field.test.tsx, and RadioGroup's tests

  it('uses aria-labelledby for the label', () => {
    const result = render(<ProgressField label="Test label" />);

    const progress = result.getByRole('progressbar');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(progress.getAttribute('aria-labelledby')).toBe(label.id);
    expect(label.htmlFor).toBeFalsy();
  });
});
