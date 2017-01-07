/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import { setRTL } from '../../utilities/rtl';
import { Persona, PersonaInitialsColor } from './index';
import { shallow } from 'enzyme';
import * as chai from 'chai';

const { expect } = chai;

describe.only('Persona', () => {
  describe('initials and colors', () => {
    beforeEach(() => {
      setRTL(false);
    });

    it('renders with expected initialsColor if none was provided', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find('.ms-Persona-initials--red');
      expect(result).to.have.length(1);

      const wrapper2 = shallow(<Persona primaryText='Annie Lindqvist' />);
      result = wrapper2.find('.ms-Persona-initials--darkRed');
      expect(result).to.have.length(1);
    });

    it('uses provided initialsColor if one was specified', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' initialsColor={ PersonaInitialsColor.lightBlue } />);
      let result = wrapper.find('.ms-Persona-initials--lightBlue');
      expect(result).to.have.length(1);
    });

    it('calculates an expected initials in LTR if one was not specified', () => {
      const wrapper = shallow(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find('.ms-Persona-initials');
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('KL');
    });

    it('calculates an expected initials in RTL if one was not specified', () => {
      setRTL(true);
      const wrapper = shallow(<Persona primaryText='Kat Larrson' />);
      let result = wrapper.find('.ms-Persona-initials');
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('LK');
    });

    it('uses provided initial', () => {
      setRTL(true);
      const wrapper = shallow(<Persona primaryText='Kat Larrson' imageInitials='AT' />);
      let result = wrapper.find('.ms-Persona-initials');
      expect(result).to.have.length(1);
      expect(result.text()).to.equal('AT');
    });
  });

});
