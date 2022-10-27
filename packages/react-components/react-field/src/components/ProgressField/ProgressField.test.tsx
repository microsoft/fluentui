import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { ProgressField } from './ProgressField';

describe('ProgressField', () => {
  isConformant({
    Component: ProgressField,
    displayName: 'ProgressField',
  });

  // Most functionality is tested by Field.test.tsx and Progress.test.tsx

  it('uses aria-labelledby for the label', () => {
    const result = render(<ProgressField label="Test label" />);

    const progress = result.getByRole('progressbar');
    const label = result.getByText('Test label') as HTMLLabelElement;

    expect(label.id).toBeTruthy();
    expect(progress.getAttribute('aria-labelledby')).toBe(label.id);
    expect(label.htmlFor).toBeFalsy();
  });

  it('uses aria-describedby on error, instead of aria-errormessage ', () => {
    const result = render(<ProgressField label="Test label" validationState="error" validationMessage="Test error" />);

    const progress = result.getByRole('progressbar');
    const message = result.getByText('Test error') as HTMLLabelElement;

    expect(message.id).toBeTruthy();
    expect(progress.getAttribute('aria-describedby')).toBe(message.id);
    expect(progress.getAttribute('aria-invalid')).toBeNull();
  });
});
