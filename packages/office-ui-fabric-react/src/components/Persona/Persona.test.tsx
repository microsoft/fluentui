/* tslint:disable-next-line:no-unused-variable */
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { setRTL } from '../../Utilities';
import { Persona } from './Persona';
import { PersonaInitialsColor } from './Persona.Props';
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

});
