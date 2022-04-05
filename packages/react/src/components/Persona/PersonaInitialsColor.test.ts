import { getPersonaInitialsColor } from './PersonaInitialsColor';
import { PersonaInitialsColor } from './Persona.types';

describe('PersonaInitialsColor tests', () => {
  it('renders gets the correct colors if none was provided', () => {
    const colorCode = getPersonaInitialsColor({ text: 'Kat Larrson' });
    expect(colorCode).toEqual('#498205');

    const colorCode2 = getPersonaInitialsColor({ text: 'Annie Lindqvist' });
    expect(colorCode2).toEqual('#038387');
  });

  it('uses provided enum initialsColor if one was specified', () => {
    const colorCode = getPersonaInitialsColor({ text: 'Kat Larrson', initialsColor: PersonaInitialsColor.lightRed });
    expect(colorCode).toEqual('#D13438');
  });

  it('uses provided string initialsColor if one was specified', () => {
    const colorCode = getPersonaInitialsColor({ text: 'Christian Gonzalez', initialsColor: 'violet' });
    expect(colorCode).toEqual('violet');
  });
});
