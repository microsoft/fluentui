import { initialsColorPropToColorCode } from './PersonaInitialsColor';
import { PersonaInitialsColor } from './Persona.types';

describe('PersonaInitialsColor tests', () => {
  it('renders gets the correct colors if none was provided', () => {
    const colorCode = initialsColorPropToColorCode({ text: 'Kat Larrson' });
    expect(colorCode).toEqual('#1D1D1D');

    const colorCode2 = initialsColorPropToColorCode({ text: 'Annie Lindqvist' });
    expect(colorCode2).toEqual('#498205');
  });

  it('uses provided enum initialsColor if one was specified', () => {
    const colorCode = initialsColorPropToColorCode({ text: 'Kat Larrson', initialsColor: PersonaInitialsColor.red });
    expect(colorCode).toEqual('#EE1111');
  });

  it('uses provided string initialsColor if one was specified', () => {
    const colorCode = initialsColorPropToColorCode({ text: 'Christian Gonzalez', initialsColor: 'blue' });
    expect(colorCode).toEqual('blue');
  });
});