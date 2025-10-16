import * as React from 'react';
import { Check } from './Check';
import { render } from '@testing-library/react';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';

describe('Check', () => {
  beforeEach(() => {
    resetIds();
  });

  // Conformance Tests:
  isConformant({
    Component: Check,
    displayName: 'Check',
  });

  // Snapshot Tests:
  it('renders Check (correctly)', () => {
    const { container } = render(<Check checked={true} className={'test-className'} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
