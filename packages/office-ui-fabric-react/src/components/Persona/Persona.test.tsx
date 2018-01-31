/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setRTL } from '../../Utilities';
import { Persona } from './Persona';
import { PersonaInitialsColor } from './Persona.types';
import { mount, ReactWrapper } from 'enzyme';

const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
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

  it('renders Persona correctly with initials', () => {
    const component = renderer.create(<Persona primaryText='Kat Larrson' />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Persona correctly with image', () => {
    const component = renderer.create(<Persona primaryText='Kat Larrson' imageUrl={ testImage1x1 } />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('initials and colors', () => {
    it('calculates an expected initials in LTR if one was not specified', () => {
      let wrapper = mount(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('KL');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText='David Zearing-Goff' />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DZ');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText='4lex 4loo' />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('44');
      wrapper.unmount();

      wrapper = mount(<Persona primaryText='David (The man) Goff' />);
      result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('DG');
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      const wrapper = mount(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('LK');

      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      const wrapper = mount(<Persona primaryText='Kat Larrson' imageInitials='AT' />);
      let result = wrapper.find(STYLES.initials);
      expect(result).toHaveLength(1);
      expect(result.text()).toEqual('AT');

      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const wrapper = mount(<Persona primaryText='Kat Larrson' imageUrl={ testImage1x1 } />);
      const image: ReactWrapper<React.ImgHTMLAttributes<any>, any> = wrapper.find('Image');

      expect(image.props().alt).toEqual('');
    });

    it('renders its given alt text', () => {
      const wrapper = mount(<Persona primaryText='Kat Larrson' imageUrl={ testImage1x1 } imageAlt='ALT TEXT' />);
      const image: ReactWrapper<React.ImgHTMLAttributes<any>, any> = wrapper.find('Image');

      expect(image.props().alt).toEqual('ALT TEXT');
    });
  });
});
