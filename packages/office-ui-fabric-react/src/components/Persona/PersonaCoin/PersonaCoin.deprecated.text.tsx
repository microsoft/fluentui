/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setRTL } from '../../../Utilities';
import { PersonaCoin } from './PersonaCoin';

const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

// Prevent warn deprecations from failing test
const Utilities = require('@uifabric/utilities/lib/warn');

describe('PersonaCoin', () => {
  beforeEach(() => {
    setRTL(false);
  });

  beforeAll(() => {
    Utilities.warnDeprecations = jest.fn().mockImplementation(() => { /** no impl **/ });
  });

  afterAll(() => {
    Utilities.warnDeprecations.mockClear();
  });

  it('renders correctly', () => {
    const component = renderer.create(<PersonaCoin />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with text', () => {
    const component = renderer.create(<PersonaCoin primaryText='Kat Larrson' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with provided initials', () => {
    const component = renderer.create(<PersonaCoin imageInitials='JG' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with image', () => {
    const component = renderer.create(<PersonaCoin primaryText='Kat Larrson' imageUrl={ testImage1x1 } />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
