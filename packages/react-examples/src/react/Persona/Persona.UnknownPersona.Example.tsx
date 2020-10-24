import * as React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack } from '@fluentui/react/lib/Stack';
import { TestImages } from '@fluentui/example-data';

export const UnknownPersonaExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Persona
        showUnknownPersonaCoin={true}
        text="Maor Sharett"
        secondaryText="Designer"
        size={PersonaSize.size40}
        imageAlt="Maor Sharett, status unknown"
      />

      <Persona
        showUnknownPersonaCoin={true}
        text="Kat Larrson"
        secondaryText="Designer"
        tertiaryText="Unverified sender"
        size={PersonaSize.size72}
        imageUrl={TestImages.personaFemale}
        imageAlt="Kat Larrson, status unknown"
      />
    </Stack>
  );
};
