import * as React from 'react';
import { Persona, PersonaInitialsColor, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const sharedPersonaProps: IPersonaProps = {
  size: PersonaSize.size100,
  styles: {
    root: {
      width: 300,
      margin: 5
    }
  }
};

export const PersonaColorsExample: React.FunctionComponent = () => {
  return (
    <Stack horizontal wrap>
      <Persona initialsColor={PersonaInitialsColor.green} {...sharedPersonaProps} text="green10" />
      <Persona initialsColor={PersonaInitialsColor.darkGreen} {...sharedPersonaProps} text="darkGreen20" />
      <Persona initialsColor={PersonaInitialsColor.teal} {...sharedPersonaProps} text="teal10" />
      <Persona initialsColor={PersonaInitialsColor.cyan} {...sharedPersonaProps} text="cyan30" />
      <Persona initialsColor={PersonaInitialsColor.lightBlue} {...sharedPersonaProps} text="lightBlue30" />
      <Persona initialsColor={PersonaInitialsColor.blue} {...sharedPersonaProps} text="blue20" />
      <Persona initialsColor={PersonaInitialsColor.darkBlue} {...sharedPersonaProps} text="darkBlue10" />
      <Persona initialsColor={PersonaInitialsColor.violet} {...sharedPersonaProps} text="violet10" />
      <Persona initialsColor={PersonaInitialsColor.purple} {...sharedPersonaProps} text="purple10" />
      <Persona initialsColor={PersonaInitialsColor.magenta} {...sharedPersonaProps} text="magenta10" />
      <Persona initialsColor={PersonaInitialsColor.lightPink} {...sharedPersonaProps} text="lightPink10" />
      <Persona initialsColor={PersonaInitialsColor.pink} {...sharedPersonaProps} text="pink10" />
      <Persona initialsColor={PersonaInitialsColor.burgundy} {...sharedPersonaProps} text="pinkRed10" />
      <Persona initialsColor={PersonaInitialsColor.lightRed} {...sharedPersonaProps} text="red10" />
      <Persona initialsColor={PersonaInitialsColor.darkRed} {...sharedPersonaProps} text="darkRed20" />
      <Persona initialsColor={PersonaInitialsColor.orange} {...sharedPersonaProps} text="orange10" />
      <Persona initialsColor={PersonaInitialsColor.rust} {...sharedPersonaProps} text="orange30" />
      <Persona initialsColor={PersonaInitialsColor.gold} {...sharedPersonaProps} text="orangeYellow20" />
      <Persona initialsColor={PersonaInitialsColor.warmGray} {...sharedPersonaProps} text="gray30" />
      <Persona initialsColor={PersonaInitialsColor.coolGray} {...sharedPersonaProps} text="gray20" />
    </Stack>
  );
};
