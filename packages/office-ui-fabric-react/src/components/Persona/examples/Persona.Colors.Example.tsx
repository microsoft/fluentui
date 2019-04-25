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

export class PersonaColorsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Stack horizontal wrap>
        <Persona initialsColor={PersonaInitialsColor.green10} {...sharedPersonaProps} text="green10" />
        <Persona initialsColor={PersonaInitialsColor.darkGreen20} {...sharedPersonaProps} text="darkGreen20" />
        <Persona initialsColor={PersonaInitialsColor.teal10} {...sharedPersonaProps} text="teal10" />
        <Persona initialsColor={PersonaInitialsColor.cyan30} {...sharedPersonaProps} text="cyan30" />
        <Persona initialsColor={PersonaInitialsColor.lightBlue30} {...sharedPersonaProps} text="lightBlue30" />
        <Persona initialsColor={PersonaInitialsColor.blue20} {...sharedPersonaProps} text="blue20" />
        <Persona initialsColor={PersonaInitialsColor.darkBlue10} {...sharedPersonaProps} text="darkBlue10" />
        <Persona initialsColor={PersonaInitialsColor.violet10} {...sharedPersonaProps} text="violet10" />
        <Persona initialsColor={PersonaInitialsColor.purple10} {...sharedPersonaProps} text="purple10" />
        <Persona initialsColor={PersonaInitialsColor.magenta10} {...sharedPersonaProps} text="magenta10" />
        <Persona initialsColor={PersonaInitialsColor.lightPink10} {...sharedPersonaProps} text="lightPink10" />
        <Persona initialsColor={PersonaInitialsColor.pink10} {...sharedPersonaProps} text="pink10" />
        <Persona initialsColor={PersonaInitialsColor.pinkRed10} {...sharedPersonaProps} text="pinkRed10" />
        <Persona initialsColor={PersonaInitialsColor.red10} {...sharedPersonaProps} text="red10" />
        <Persona initialsColor={PersonaInitialsColor.darkRed20} {...sharedPersonaProps} text="darkRed20" />
        <Persona initialsColor={PersonaInitialsColor.orange10} {...sharedPersonaProps} text="orange10" />
        <Persona initialsColor={PersonaInitialsColor.orange30} {...sharedPersonaProps} text="orange30" />
        <Persona initialsColor={PersonaInitialsColor.orangeYellow20} {...sharedPersonaProps} text="orangeYellow20" />
        <Persona initialsColor={PersonaInitialsColor.gray30} {...sharedPersonaProps} text="gray30" />
        <Persona initialsColor={PersonaInitialsColor.gray40} {...sharedPersonaProps} text="gray40" />
        <Persona initialsColor={PersonaInitialsColor.gray20} {...sharedPersonaProps} text="gray20" />
      </Stack>
    );
  }
}
