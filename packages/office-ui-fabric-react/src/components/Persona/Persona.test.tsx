/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { setRTL } from '../../Utilities';
import { Persona } from './Persona';
import { PersonaInitialsColor } from './Persona.Props';
import { shallow } from 'enzyme';
import * as chai from 'chai';
import stylesImport from './Persona.scss';
const styles: any = stylesImport;

const testImage1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQImWP4DwQACfsD/eNV8pwAAAAASUVORK5CYII=';

const { expect } = chai;

describe('Persona', () => {
  beforeEach(() => {
    setRTL(false);
  });

  describe('initials and colors', () => {
    it('renders with expected initialsColor if none was provided', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find('.' + styles.initialsIsRed);
      expect(result).to.have.length(1);

      const wrapper2 = shallow(<Persona primaryText='Annie Lindqvist' />);
      result = wrapper2.find('.' + styles.initialsIsDarkRed);
      expect(result).to.have.length(1);
    });

    it('uses provided initialsColor if one was specified', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' initialsColor={ PersonaInitialsColor.lightBlue } />);
      let result = wrapper.find('.' + styles.initialsIsLightBlue);
      expect(result).to.have.length(1);
    });

    it('calculates an expected initials in LTR if one was not specified', () => {
      let wrapper = shallow(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find('.' + styles.initials);
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('KL');

      wrapper = shallow(<Persona primaryText='David Zearing-Goff' />);
      result = wrapper.find('.' + styles.initials);
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('DZ');

      wrapper = shallow(<Persona primaryText='4lex 4loo' />);
      result = wrapper.find('.' + styles.initials);
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('44');

      wrapper = shallow(<Persona primaryText='David (The man) Goff' />);
      result = wrapper.find('.' + styles.initials);
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('DG');
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      const wrapper = shallow(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find('.' + styles.initials);
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('LK');

      setRTL(false);
    });

    it('uses provided initial', () => {
      setRTL(true);
      const wrapper = shallow(<Persona primaryText='Kat Larrson' imageInitials='AT' />);
      let result = wrapper.find('.' + styles.initials);
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('AT');

      setRTL(false);
    });
  });

  describe('image', () => {
    it('renders empty alt text by default', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' imageUrl={ testImage1x1 } />);
      expect(wrapper.find('Image').props().alt).to.equal('');
    });

    it('renders its given alt text', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' imageUrl={ testImage1x1 } imageAlt='ALT TEXT' />);
      expect(wrapper.find('Image').props().alt).to.equal('ALT TEXT');
    });
  });
});
