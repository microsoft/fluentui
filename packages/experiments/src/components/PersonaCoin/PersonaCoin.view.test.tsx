import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Text } from '../../Text';

import { IPersonaCoinStyles } from './PersonaCoin.types';
import { PersonaCoinView } from './PersonaCoin.view';
import { IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { Icon, Image } from 'office-ui-fabric-react';
import { setRTL } from '../../Utilities';

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

  it('renders presence correctly when a very large coin is rendered', () => {
    const tree = renderer.create(<PersonaCoinView text="五号" presence={4} classNames={testPersonaCoinClassNames} size={100} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the coin with the provided image', () => {
    const tree = renderer
      .create(<PersonaCoinView text="Ellen Grace" imageUrl={PersonaTestImages.personMale} classNames={testPersonaCoinClassNames} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calculates an expected initials in LTR if one was not specified', () => {
    let wrapper = mount(<PersonaCoinView text="Kat Larrson" classNames={testPersonaCoinClassNames} />);
    let result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('KL');
    wrapper.unmount();

    wrapper = mount(<PersonaCoinView text="David Zearing-Goff" classNames={testPersonaCoinClassNames} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('DZ');
    wrapper.unmount();

    wrapper = mount(<PersonaCoinView text="4lex 5loo" classNames={testPersonaCoinClassNames} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('45');
    wrapper.unmount();

    wrapper = mount(<PersonaCoinView text="Swapnil Vaibhav" classNames={testPersonaCoinClassNames} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('SV');
    wrapper.unmount();

    wrapper = mount(<PersonaCoinView text="+1 (555) 6789" classNames={testPersonaCoinClassNames} />);
    result = wrapper.find(Icon);
    expect(result).toHaveLength(1);
    expect(result.props().iconName).toEqual('Contact');
    wrapper.unmount();

    wrapper = mount(<PersonaCoinView text="+1 (555) 6789" allowPhoneInitials={true} classNames={testPersonaCoinClassNames} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('16');
    wrapper.unmount();

    wrapper = mount(<PersonaCoinView text="David (The man) Goff" classNames={testPersonaCoinClassNames} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('DG');
  });

  it('calculates an expected initials in RTL if one was not specified', () => {
    setRTL(true);

    const wrapper = mount(<PersonaCoinView text="Kat Larrson" classNames={testPersonaCoinClassNames} />);
    const result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('LK');

    setRTL(false);
  });

  it('uses provided initial', () => {
    setRTL(true);
    const wrapper = mount(<PersonaCoinView text="Kat Larrson" initials="AT" classNames={testPersonaCoinClassNames} />);
    const result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('AT');

    setRTL(false);
  });

  describe('image', () => {
    const testImage1x1 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

    it('renders empty alt text by default', () => {
      const wrapper = mount(<PersonaCoinView text="Kat Larrson" imageUrl={testImage1x1} classNames={testPersonaCoinClassNames} />);
      const image = wrapper.find(Image);

      expect(image.props().alt).toEqual('');
    });

    it('renders its given alt text', () => {
      const wrapper = mount(
        <PersonaCoinView text="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" classNames={testPersonaCoinClassNames} />
      );
      const image = wrapper.find(Image);

      expect(image.props().alt).toEqual('ALT TEXT');
    });
  });
});
