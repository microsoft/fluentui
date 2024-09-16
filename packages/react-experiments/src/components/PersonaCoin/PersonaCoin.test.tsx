import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { PersonaCoin } from './index';
import { Icon, Image, Text } from '@fluentui/react';
import { setRTL } from '../../Utilities';
import { PersonaTestImages } from '../../common/TestImages';
import type { IPersonaCoinComponent } from './PersonaCoin.types';

const testPersonaCoinStyles: IPersonaCoinComponent['styles'] = {
  root: 'test-cn-root',
  image: 'test-cn-image',
  initials: 'test-cn-initials',
  presence: 'test-cn-presence',
};

// Views are just pure functions with no statefulness, which means they can get full code coverage
//    with snapshot tests exercising permutations of the props.
describe('PersonaCoin', () => {
  it('renders a correct persona', () => {
    const tree = renderer.create(<PersonaCoin text="James Bond" styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with the initials JB', () => {
    const tree = renderer.create(<PersonaCoin initials="JB" styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a red coin', () => {
    const tree = renderer.create(<PersonaCoin initials="JB" styles={testPersonaCoinStyles} coinColor="red" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with a contact icon', () => {
    const tree = renderer.create(<PersonaCoin styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a coin with a contact icon for a Chinese name', () => {
    const tree = renderer.create(<PersonaCoin text="五号" styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders presence when it is passed', () => {
    const tree = renderer.create(<PersonaCoin text="五号" presence={4} styles={testPersonaCoinStyles} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders presence correctly when a very large coin is rendered', () => {
    const tree = renderer
      .create(<PersonaCoin text="五号" presence={4} styles={testPersonaCoinStyles} size={100} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the coin with the provided image', () => {
    const tree = renderer
      .create(<PersonaCoin text="Ellen Grace" imageUrl={PersonaTestImages.personMale} styles={testPersonaCoinStyles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calculates an expected initials in LTR if one was not specified', () => {
    let wrapper = mount(<PersonaCoin text="Kat Larrson" styles={testPersonaCoinStyles} />);
    let result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('KL');
    wrapper.unmount();

    wrapper = mount(<PersonaCoin text="David Zearing-Goff" styles={testPersonaCoinStyles} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('DZ');
    wrapper.unmount();

    wrapper = mount(<PersonaCoin text="4lex 5loo" styles={testPersonaCoinStyles} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('45');
    wrapper.unmount();

    wrapper = mount(<PersonaCoin text="Swapnil Vaibhav" styles={testPersonaCoinStyles} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('SV');
    wrapper.unmount();

    wrapper = mount(<PersonaCoin text="+1 (555) 6789" styles={testPersonaCoinStyles} />);
    const iconResult = wrapper.find(Icon);
    expect(iconResult).toHaveLength(1);
    expect((iconResult.props() as any).iconName).toEqual('Contact');
    wrapper.unmount();

    wrapper = mount(<PersonaCoin text="+1 (555) 6789" allowPhoneInitials={true} styles={testPersonaCoinStyles} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('16');
    wrapper.unmount();

    wrapper = mount(<PersonaCoin text="David (The man) Goff" styles={testPersonaCoinStyles} />);
    result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('DG');
  });

  it('calculates an expected initials in RTL if one was not specified', () => {
    setRTL(true);

    const wrapper = mount(<PersonaCoin text="Kat Larrson" styles={testPersonaCoinStyles} />);
    const result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('LK');

    setRTL(false);
  });

  it('uses provided initial', () => {
    setRTL(true);
    const wrapper = mount(<PersonaCoin text="Kat Larrson" initials="AT" styles={testPersonaCoinStyles} />);
    const result = wrapper.find(Text);
    expect(result).toHaveLength(1);
    expect(result.props().children).toEqual('AT');

    setRTL(false);
  });

  describe('image', () => {
    const testImage1x1 =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

    it('renders empty alt text by default', () => {
      const wrapper = mount(<PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} styles={testPersonaCoinStyles} />);
      const image = wrapper.find(Image);

      expect(image.props().alt).toEqual('');
    });

    it('renders its given alt text', () => {
      const wrapper = mount(
        <PersonaCoin text="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" styles={testPersonaCoinStyles} />,
      );
      const image = wrapper.find(Image);

      expect(image.props().alt).toEqual('ALT TEXT');
    });
  });
});
