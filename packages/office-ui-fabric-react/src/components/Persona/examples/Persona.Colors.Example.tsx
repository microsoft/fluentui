import * as React from 'react';
import { Persona, PersonaInitialsColor, PersonaSize, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const sharedPersonaProps: IPersonaProps = {
  size: PersonaSize.size100,
  styles: {
    root: {
      width: 300,
      margin: 5,
    },
  },
};

export const PersonaColorsExample: React.FunctionComponent = () => {
  return (
    <Stack horizontal wrap>
      <Persona
        initialsColor={PersonaInitialsColor.green}
        {...sharedPersonaProps}
        text="green10"
        imageAlt="Green circle with the letter G in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.darkGreen}
        {...sharedPersonaProps}
        text="darkGreen20"
        imageAlt="Dark green circle with the letter D in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.teal}
        {...sharedPersonaProps}
        text="teal10"
        imageAlt="Teal circle with the letter T in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.cyan}
        {...sharedPersonaProps}
        text="cyan30"
        imageAlt="Cyan circle with the letter C in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.lightBlue}
        {...sharedPersonaProps}
        text="lightBlue30"
        imageAlt="Light blue circle with the letter L in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.blue}
        {...sharedPersonaProps}
        text="blue20"
        imageAlt="Blue circle with the letter B in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.darkBlue}
        {...sharedPersonaProps}
        text="darkBlue10"
        imageAlt="Dark blue circle with the letter D in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.violet}
        {...sharedPersonaProps}
        text="violet10"
        imageAlt="Violet circle with the letter V in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.purple}
        {...sharedPersonaProps}
        text="purple10"
        imageAlt="Purple circle with the letter P in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.magenta}
        {...sharedPersonaProps}
        text="magenta10"
        imageAlt="Magenta circle with the letter M in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.lightPink}
        {...sharedPersonaProps}
        text="lightPink10"
        imageAlt="Light pink circle with the letter L in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.pink}
        {...sharedPersonaProps}
        text="pink10"
        imageAlt="Pink circle with the letter P in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.burgundy}
        {...sharedPersonaProps}
        text="pinkRed10"
        imageAlt="Pink red (burgundy) circle with the letter P in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.lightRed}
        {...sharedPersonaProps}
        text="red10"
        imageAlt="Red circle with the letter R in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.darkRed}
        {...sharedPersonaProps}
        text="darkRed20"
        imageAlt="Dark red circle with the letter D in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.orange}
        {...sharedPersonaProps}
        text="orange10"
        imageAlt="Orange circle with the letter O in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.rust}
        {...sharedPersonaProps}
        text="orange30"
        imageAlt="Rusty orange circle with the letter O in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.gold}
        {...sharedPersonaProps}
        text="orangeYellow20"
        imageAlt="Orange yellow circle with the letter O in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.warmGray}
        {...sharedPersonaProps}
        text="gray30"
        imageAlt="Warm gray circle with the letter G in white text at the center"
      />
      <Persona
        initialsColor={PersonaInitialsColor.coolGray}
        {...sharedPersonaProps}
        text="gray20"
        imageAlt="Cool gray circle with the letter G in white text at the center"
      />
    </Stack>
  );
};
