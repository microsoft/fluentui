import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { IPersonaCoinStyles } from './PersonaCoin.types';
import { PersonaCoinView } from './PersonaCoin.view';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';

// These tests will ensure that your styles regions have classname representation in snapshot output.
// (Also, classNames is a required prop for views, so we have to supply it for tests.)
const testPersonaCoinClassNames: IProcessedStyleSet<IPersonaCoinStyles> = {
  root: 'test-cn-root',
  image: 'test-cn-image',
  initials: 'test-cn-initials',
  presence: 'test-cn-presence',
  subComponentStyles: {}
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('PersonaCoinView', () => {
  it('renders a correct persona', () => {
    const tree = renderer.create(<PersonaCoinView text="James Bond" classNames={testPersonaCoinClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with the initials JB', () => {
    const tree = renderer.create(<PersonaCoinView initials="JB" classNames={testPersonaCoinClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a red coin', () => {
    const tree = renderer.create(<PersonaCoinView initials="JB" classNames={testPersonaCoinClassNames} coinColor="red" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with a contact icon', () => {
    const tree = renderer.create(<PersonaCoinView classNames={testPersonaCoinClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with a contact icon for a Chinese name', () => {
    const tree = renderer.create(<PersonaCoinView text="五号" classNames={testPersonaCoinClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders presence when it is passed', () => {
    const tree = renderer.create(<PersonaCoinView text="五号" presence={4} classNames={testPersonaCoinClassNames} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
