import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { IVerticalPersonaStyles } from './VerticalPersona.types';
import { VerticalPersonaView } from './VerticalPersona.view';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

// These tests will ensure that your styles regions have classname representation in snapshot output.
// (Also, classNames is a required prop for views, so we have to supply it for tests.)
const testVerticalPersonaClassNames: IProcessedStyleSet<IVerticalPersonaStyles> = {
  root: 'test-cn-root',
  text: 'test-cn-text',
  secondaryText: 'test-cn-secondaryText',
  subComponentStyles: {}
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('VerticalPersonaView', () => {
  it('renders correctly with only a text', () => {
    const tree = renderer.create(<VerticalPersonaView text="James Bond" classNames={testVerticalPersonaClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a text and secondary text', () => {
    const tree = renderer
      .create(<VerticalPersonaView text="James Bond" secondaryText="Super secret agent" classNames={testVerticalPersonaClassNames} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the coin with the passed coinProps', () => {
    const tree = renderer
      .create(
        <VerticalPersonaView
          text="James Bond"
          secondaryText="Super secret agent"
          classNames={testVerticalPersonaClassNames}
          coinProps={{ initials: 'MI6', coinColor: 'red' }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
