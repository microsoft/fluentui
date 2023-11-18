import * as React from 'react';
import { create } from '@fluentui/test-utilities';
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
    const component = create(<PersonaCoin />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const component = create(<PersonaCoin primaryText="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with provided initials', () => {
    const component = create(<PersonaCoin imageInitials="JG" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with image', () => {
    const component = create(<PersonaCoin primaryText="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
