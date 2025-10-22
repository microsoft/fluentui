import * as React from 'react';
import { render } from '@testing-library/react';
import { setWarningCallback, setRTL } from '../../../Utilities';
import { PersonaCoin } from './PersonaCoin';

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

describe('PersonaCoin', () => {
  beforeEach(() => {
    setRTL(false);
  });

  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  it('renders correctly', () => {
    const { container } = render(<PersonaCoin />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const { container } = render(<PersonaCoin primaryText="Kat Larrson" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with provided initials', () => {
    const { container } = render(<PersonaCoin imageInitials="JG" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders correctly with image', () => {
    const { container } = render(<PersonaCoin primaryText="Kat Larrson" imageUrl={testImage1x1} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
