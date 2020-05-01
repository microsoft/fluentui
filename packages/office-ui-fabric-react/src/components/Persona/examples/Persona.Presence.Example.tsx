import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const examplePersona: IPersonaSharedProps = {
  imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

const rootClass = mergeStyles({
  selectors: {
    '.ms-Persona': {
      margin: '0 20px 20px 0',
    },
  },
});

export const PersonaPresenceExample = () => (
  <div className={rootClass}>
    <Stack horizontal>
      <Stack>
        <Label>Online</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online."
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.online}
            imageAlt="Annie Lindqvist, status is online."
          />
        </Stack>
      </Stack>

      <Stack>
        <Label>Online + Out of Office</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.online}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is online and out of office."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.online}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is online and out of office."
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.online}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is online and out of office."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.online}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is online and out of office."
          />
        </Stack>
      </Stack>
    </Stack>

    <Stack horizontal>
      <Stack>
        <Label>Away</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.away}
            imageAlt="Annie Lindqvist, status is away."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.away}
            imageAlt="Annie Lindqvist, status is away."
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.away}
            imageAlt="Annie Lindqvist, status is away."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.away}
            imageAlt="Annie Lindqvist, status is away."
          />
        </Stack>
      </Stack>

      <Stack>
        <Label>Away + Out of Office</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.away}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is away and out of office."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.away}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is away and out of office."
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.away}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is away and out of office."
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.away}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is away and out of office."
          />
        </Stack>
      </Stack>
    </Stack>

    <Stack horizontal>
      <Stack>
        <Label>Busy</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            imageAlt="Annie Lindqvist, status is busy"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            imageAlt="Annie Lindqvist, status is busy"
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            imageAlt="Annie Lindqvist, status is busy"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            imageAlt="Annie Lindqvist, status is busy"
          />
        </Stack>
      </Stack>

      <Stack>
        <Label>Busy + Out of Office</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is busy and out of office"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is busy and out of office"
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is busy and out of office"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.busy}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is busy and out of office"
          />
        </Stack>
      </Stack>
    </Stack>

    <Stack horizontal>
      <Stack>
        <Label>Do not Disturb</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            imageAlt="Annie Lindqvist, status is do not disturb"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            imageAlt="Annie Lindqvist, status is do not disturb"
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            imageAlt="Annie Lindqvist, status is do not disturb"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            imageAlt="Annie Lindqvist, status is do not disturb"
          />
        </Stack>
      </Stack>

      <Stack>
        <Label>Do not Disturb + Out of Office</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is do not disturb and out of office"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is do not disturb and out of office"
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is do not disturb and out of office"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.dnd}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is do not disturb and out of office"
          />
        </Stack>
      </Stack>
    </Stack>

    <Label>Blocked</Label>
    <Stack horizontal>
      <Persona
        text=""
        size={PersonaSize.size8}
        hidePersonaDetails
        presence={PersonaPresence.blocked}
        imageAlt="Annie Lindqvist, status is blocked"
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.size24}
        hidePersonaDetails
        presence={PersonaPresence.blocked}
        imageAlt="Annie Lindqvist, status is blocked"
      />
      <Persona
        {...examplePersona}
        hidePersonaDetails
        presence={PersonaPresence.blocked}
        imageAlt="Annie Lindqvist, status is blocked"
      />
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        hidePersonaDetails
        presence={PersonaPresence.blocked}
        imageAlt="Annie Lindqvist, status is blocked"
      />
    </Stack>

    <Stack horizontal>
      <Stack>
        <Label>Offline</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            imageAlt="Annie Lindqvist, status is offline"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            imageAlt="Annie Lindqvist, status is offline"
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            imageAlt="Annie Lindqvist, status is offline"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            imageAlt="Annie Lindqvist, status is offline"
          />
        </Stack>
      </Stack>

      <Stack>
        <Label>Offline + Out of Office</Label>
        <Stack horizontal>
          <Persona
            text=""
            size={PersonaSize.size8}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is offline and out of office"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size24}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is offline and out of office"
          />
          <Persona
            {...examplePersona}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is offline and out of office"
          />
          <Persona
            {...examplePersona}
            size={PersonaSize.size72}
            hidePersonaDetails
            presence={PersonaPresence.offline}
            isOutOfOffice
            imageAlt="Annie Lindqvist, status is offline and out of office"
          />
        </Stack>
      </Stack>
    </Stack>
  </div>
);
