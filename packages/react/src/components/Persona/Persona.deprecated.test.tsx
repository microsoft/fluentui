import * as React from 'react';
import { create } from '@fluentui/test-utilities';
import { setRTL, setWarningCallback } from '@fluentui/utilities';
import { Persona } from './Persona';
import { mount } from 'enzyme';
import { getIcon } from '../../Styling';

const testImage1x1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const STYLES = {
  green: '.ms-Persona-initials--green',
  initials: '.ms-Persona-initials',
  black: '.ms-Persona-initials--black',
  red: '.ms-Persona-initials--red',
};

describe('Persona', () => {
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

  it('renders Persona correctly with no props', () => {
    const component = create(<Persona />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with initials', () => {
    const component = create(<Persona primaryText="Kat Larrson" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with image', () => {
    const component = create(<Persona primaryText="Kat Larrson" imageUrl={testImage1x1} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('initials and colors', () => {
    it('calculates an expected initials in LTR if one was not specified', () => {
      let wrapper = mount(<Persona primaryText="Kat Larrson" />);
      let result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('KL');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText="David Zearing-Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DZ');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText="4lex 5loo" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('45');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText="+1 (555) 6789" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual(getIcon('contact')!.code);
      wrapper.unmount();

      wrapper = mount(<Persona primaryText="+1 (555) 6789" allowPhoneInitials={true} />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('16');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText="David (The man) Goff" />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      const wrapper = mount(<Persona primaryText="Kat Larrson" />);
      const result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('LK');

      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      const wrapper = mount(<Persona primaryText="Kat Larrson" imageInitials="AT" />);
      const result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('AT');

      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const wrapper = mount(<Persona primaryText="Kat Larrson" imageUrl={testImage1x1} />);
      const image = wrapper.find('ImageBase');

      expect(image.props().alt).toEqual('');
    });

    it('renders its given alt text', () => {
      const wrapper = mount(<Persona primaryText="Kat Larrson" imageUrl={testImage1x1} imageAlt="ALT TEXT" />);
      const image = wrapper.find('ImageBase');

      expect(image.props().alt).toEqual('ALT TEXT');
    });
  });
});
