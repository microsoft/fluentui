import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';

export const PersonaBasicExample: React.FunctionComponent = () => {
  const [renderDetails, updateRenderDetails] = React.useState(true);
  const onChange = (ev: any, checked: boolean | undefined) => {
    updateRenderDetails(!!checked);
  };

  const examplePersona: IPersonaSharedProps = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
    secondaryText: 'Software Engineer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <Checkbox label="Include persona details" checked={renderDetails} onChange={onChange} />

      <Label>Size 8 Persona, with no presence</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size8}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, no presence detected"
      />
      <Label>Size 8 Persona, with presence</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size8}
        presence={PersonaPresence.offline}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is offline"
      />
      <Label>Size 24 Persona</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size24}
        presence={PersonaPresence.online}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is online"
      />
      <Label>Size 32 Persona</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size32}
        presence={PersonaPresence.online}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is online"
      />

      <Label>Size 40 Persona</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size40}
        presence={PersonaPresence.away}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is away"
      />

      <Label>Size 48 Persona (default) </Label>
      <Persona
        {...examplePersona}
        hidePersonaDetails={!renderDetails}
        presence={PersonaPresence.busy}
        imageAlt="Annie Lindqvist, status is busy"
      />

      <Label>Size 56 Persona (default) </Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size56}
        hidePersonaDetails={!renderDetails}
        presence={PersonaPresence.online}
        imageAlt="Annie Lindqvist, status is online"
      />

      <Label>Size 72 Persona</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        presence={PersonaPresence.dnd}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is dnd"
      />

      <Label>Size 100 Persona</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size100}
        presence={PersonaPresence.blocked}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is blocked"
      />

      <Label>Size 120 Persona</Label>
      <Persona
        {...examplePersona}
        size={PersonaSize.size120}
        presence={PersonaPresence.away}
        hidePersonaDetails={!renderDetails}
        imageAlt="Annie Lindqvist, status is away"
      />
    </Stack>
  );
};
