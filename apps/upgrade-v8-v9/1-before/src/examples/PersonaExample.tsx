import React from 'react';
import { IPersonaSharedProps, Persona, PersonaPresence, PersonaSize } from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

const examplePersona: IPersonaSharedProps = {
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

const examplePersonaWithImage = {
  ...examplePersona,
  imageUrl: TestImages.personaFemale,
};

type Props = {};

export const PersonaExample: React.FC<Props> = () => {
  return (
    <div className="example">
      <div className="name">Persona / Avatar</div>
      <div className="description">v8: Persona --&gt; v9: Avatar</div>
      <div className="controls row">
        <Persona
          {...examplePersonaWithImage}
          text="Annie Lindqvist (Available)"
          size={PersonaSize.size56}
          presence={PersonaPresence.online}
          imageAlt="Annie Lindqvist, status is online"
        />
        <Persona {...examplePersona} text="Annie Lindqvist" size={PersonaSize.size56} />
      </div>
    </div>
  );
};
