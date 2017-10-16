/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { setRTL } from '../../Utilities';
import { Persona } from './Persona';
import { PersonaInitialsColor } from './Persona.Props';
import { mount, ReactWrapper } from 'enzyme';

const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';
const STYLES = {
  darkRed: '.ms-Persona-initials--darkRed',
  initials: '.ms-Persona-initials',
  lightBlue: '.ms-Persona-initials--lightBlue',
  red: '.ms-Persona-initials--red',

};

describe('Persona', () => {
  beforeEach(() => {
    setRTL(false);
  });

  describe('initials and colors', () => {
    it('renders with expected initialsColor if none was provided', () => {
      const wrapper = mount(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find(STYLES.red);
      expect(result).toHaveLength(1);

      const wrapper2 = mount(<Persona primaryText='Annie Lindqvist' />);
      result = wrapper2.find(STYLES.darkRed);
      expect(result).toHaveLength(1);
    });

    it('uses provided initialsColor if one was specified', () => {
      const wrapper = mount(<Persona primaryText='Kat Larrson' initialsColor={ PersonaInitialsColor.lightBlue } />);
      let result = wrapper.find(STYLES.lightBlue);
      expect(result).toHaveLength(1);
    });

    it.only('calculates an expected initials in LTR if one was not specified', () => {
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
