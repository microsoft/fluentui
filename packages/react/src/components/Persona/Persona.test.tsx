import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { TestImages } from '@fluentui/example-data';
import { Icon } from '../../Icon';
import { setRTL } from '../../Utilities';
import { Persona } from './Persona';
import { mount, ReactWrapper } from 'enzyme';
import { getIcon } from '../../Styling';
import { PersonaPresence, PersonaSize } from './index';
import { isConformant } from '../../common/isConformant';
import type { IPersonaSharedProps, IPersonaCoinProps } from './index';
import { wrapPersona } from './test-utils';

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const STYLES = {
  green: '.ms-Persona-initials--green',
  initials: '.ms-Persona-initials',
  primaryText: '.ms-Persona-primaryText',
  black: '.ms-Persona-initials--black',
  red: '.ms-Persona-initials--red',
};

const customOnRenderPersonaFunction = (props: IPersonaCoinProps): JSX.Element | null => {
  return <Icon iconName="Dictionary" />;
};

const examplePersona: IPersonaSharedProps = {
  imageUrl: TestImages.personaMale,
  imageInitials: 'SV',
  text: 'Swapnil Vaibhav',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
  size: PersonaSize.size100,
  presence: PersonaPresence.blocked,
};

describe('Persona', () => {
  beforeEach(() => {
    setRTL(false);
  });

  it('renders Persona correctly with no props', () => {
    const component = create(<Persona />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with initials', () => {
    const component = create(<Persona text="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with image', () => {
    const component = create(<Persona text="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with UnknownPersona coin', () => {
    const component = create(<Persona text="Kat Larrson" showUnknownPersonaCoin={true} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona which calls onRenderCoin callback without imageUrl', () => {
    // removing imageUrl prop from example
    const { imageUrl, ...exampleWithoutImage } = examplePersona;
    const component = create(
      <Persona {...exampleWithoutImage} onRenderCoin={wrapPersona(exampleWithoutImage, true)} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona which calls onRenderPersonaCoin callback with custom render', () => {
    const component = create(<Persona {...examplePersona} onRenderPersonaCoin={customOnRenderPersonaFunction} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with onRender callback', () => {
    const component = create(
      <Persona
        {...examplePersona}
        onRenderPrimaryText={wrapPersona(examplePersona)}
        onRenderSecondaryText={wrapPersona(examplePersona)}
        onRenderTertiaryText={wrapPersona(examplePersona)}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona children correctly', () => {
    const component = create(
      <Persona text="Kat Larrson">
        <span>Persona Children</span>
      </Persona>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Persona,
    displayName: 'Persona',
  });

  describe('initials and colors', () => {
    it('calculates an expected initials in LTR if one was not specified', () => {
      let wrapper = mount(<Persona text="Kat Larrson" />);
      let result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('KL');
      wrapper.unmount();

      wrapper = mount(<Persona text="David Zearing-Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DZ');
      wrapper.unmount();

      wrapper = mount(<Persona text="4lex 5loo" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('45');
      wrapper.unmount();

      wrapper = mount(<Persona text="Swapnil Vaibhav" />);
      result = wrapper.find(STYLES.primaryText);
      expect(result).toHaveLength(1);
      expect(result.text()).toContain('Swapnil Vaibhav');
      wrapper.unmount();

      wrapper = mount(<Persona text="+1 (555) 6789" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual(getIcon('contact')!.code);
      wrapper.unmount();

      wrapper = mount(<Persona text="+1 (555) 6789" allowPhoneInitials={true} />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('16');
      wrapper.unmount();

      wrapper = mount(<Persona text="David (The man) Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');

      wrapper = mount(<Persona text="David [The man] Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');

      wrapper = mount(<Persona text="David Goff {The man}" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');

      wrapper = mount(<Persona text="David Goff <The man>" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');

      wrapper = mount(<Persona text="David Goff (The man) <David.Goff@example.com>" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      const wrapper = mount(<Persona text="Kat Larrson" />);
      const result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('LK');

      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      const wrapper = mount(<Persona text="Kat Larrson" imageInitials="AT" />);
      const result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('AT');

      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const wrapper = mount(<Persona text="Kat Larrson" imageUrl={testImage1x1} />);
      const image: ReactWrapper<React.ImgHTMLAttributes<unknown>, unknown> = wrapper.find('ImageBase');

      expect(image.props().alt).toEqual('');
    });

    it('renders its given alt text', () => {
      const wrapper = mount(<Persona text="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" />);
      const image: ReactWrapper<React.ImgHTMLAttributes<unknown>, unknown> = wrapper.find('ImageBase');

      expect(image.props().alt).toEqual('ALT TEXT');
    });
  });
});
