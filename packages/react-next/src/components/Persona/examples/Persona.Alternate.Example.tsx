import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from '@fluentui/react-next';
import { Stack } from '@fluentui/react-next/lib/Stack';
import { TestImages } from '@uifabric/example-data';

export const PersonaAlternateExample: React.FunctionComponent = () => {
  const examplePersona: IPersonaSharedProps = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'AR',
    text: 'Annie Reid',
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
    showSecondaryText: true,
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Persona
        {...examplePersona}
        size={PersonaSize.size24}
        presence={PersonaPresence.none}
        imageAlt="Annie Ried, status is unknown"
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.size32}
        presence={PersonaPresence.none}
        imageAlt="Annie Ried, status is unknown"
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.size32}
        presence={PersonaPresence.online}
        imageAlt="Annie Ried, status is available at 4 PM"
      />
    </Stack>
  );
};
