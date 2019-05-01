import { initialsColorPropToColorCode } from './PersonaInitialsColor';
import { PersonaInitialsColor } from './Persona.types';

describe('PersonaInitialsColor tests', () => {
  it('renders gets the correct colors if none was provided', () => {
    const colorCode = initialsColorPropToColorCode({ text: 'Kat Larrson' });
    expect(colorCode).toEqual('#881798');

    const colorCode2 = initialsColorPropToColorCode({ text: 'Annie Lindqvist' });
    expect(colorCode2).toEqual('#CA5010');
  });

  it('uses provided enum initialsColor if one was specified', () => {
    const colorCode = initialsColorPropToColorCode({ text: 'Kat Larrson', initialsColor: PersonaInitialsColor.lightRed });
    expect(colorCode).toEqual('#D13438');
  });

  it('uses provided string initialsColor if one was specified', () => {
    const colorCode = initialsColorPropToColorCode({ text: 'Christian Gonzalez', initialsColor: 'violet' });
    expect(colorCode).toEqual('violet');
  });
});
