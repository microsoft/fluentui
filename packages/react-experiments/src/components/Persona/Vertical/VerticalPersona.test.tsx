import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as TextHelpers from '../../../utilities/textHelpers';
import { VerticalPersona } from './VerticalPersona';
import type { IVerticalPersonaComponent } from './VerticalPersona.types';

const testVerticalPersonaStyles: IVerticalPersonaComponent['styles'] = {
  root: 'test-cn-root',
  primaryText: 'test-cn-text',
  secondaryText: 'test-cn-secondaryText',
  coin: 'test-cn-coin',
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
// with snapshot tests exercising permutations of the props.
describe('VerticalPersona', () => {
  beforeAll(() => {
    // Prevent canvas usage from failing test
    jest.spyOn(TextHelpers, 'isSingleLineText').mockImplementation((() => {
      /** no impl **/
    }) as any);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders correctly with only a text', () => {
    const tree = renderer
      .create(<VerticalPersona vertical text="James Bond" styles={testVerticalPersonaStyles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a text and secondary text', () => {
    const tree = renderer
      .create(
        <VerticalPersona
          vertical
          text="James Bond"
          secondaryText="Super secret agent"
          styles={testVerticalPersonaStyles}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the coin with the passed coinProps', () => {
    const tree = renderer
      .create(
        <VerticalPersona
          vertical
          text="James Bond"
          secondaryText="Super secret agent"
          styles={testVerticalPersonaStyles}
          coin={{ initials: 'MI6', coinColor: 'red' }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
