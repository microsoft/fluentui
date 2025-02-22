import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { IPersonaProps, Persona, PersonaPresence, PersonaSize } from '@fluentui/react';
import { TestImages } from '@fluentui/example-data';

const examplePersona: IPersonaProps = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

export default {
  title: 'Persona',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Size10Tiny = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size10} presence={PersonaPresence.offline} />
    <Persona {...examplePersona} size={PersonaSize.tiny} presence={PersonaPresence.offline} />
  </div>
);

Size10Tiny.storyName = 'size10 (tiny)';

export const Size24ExtraExtraSmall = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size24} presence={PersonaPresence.none} />
    <Persona
      {...examplePersona}
      size={PersonaSize.extraExtraSmall}
      presence={PersonaPresence.none}
    />
  </div>
);

Size24ExtraExtraSmall.storyName = 'size24 (extraExtraSmall)';

export const Size28ExtraSmall = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size28} presence={PersonaPresence.none} />
    <Persona {...examplePersona} size={PersonaSize.extraSmall} presence={PersonaPresence.none} />
  </div>
);

Size28ExtraSmall.storyName = 'size28 (extraSmall)';

export const Size32 = () => (
  <Persona {...examplePersona} size={PersonaSize.size32} presence={PersonaPresence.online} />
);

Size32.storyName = 'size32';

export const Size40Small = () => (
  <div>
    <Persona
      {...examplePersona}
      size={PersonaSize.size40}
      presence={PersonaPresence.none}
      showSecondaryText
    />
    <Persona
      {...examplePersona}
      size={PersonaSize.small}
      presence={PersonaPresence.none}
      showSecondaryText
    />
  </div>
);

Size40Small.storyName = 'size40 (small)';

export const Size48Regular = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size48} presence={PersonaPresence.away} />
    <Persona {...examplePersona} size={PersonaSize.regular} presence={PersonaPresence.away} />
  </div>
);

Size48Regular.storyName = 'size48 (regular)';

export const DefaultSizePresences = () => (
  <div>
    <Persona {...examplePersona} text="PersonaPresence.away" presence={PersonaPresence.away} />
    <Persona
      {...examplePersona}
      text="PersonaPresence.blocked"
      presence={PersonaPresence.blocked}
    />
    <Persona {...examplePersona} text="PersonaPresence.busy" presence={PersonaPresence.busy} />
    <Persona {...examplePersona} text="PersonaPresence.dnd" presence={PersonaPresence.dnd} />
    <Persona {...examplePersona} text="PersonaPresence.none" presence={PersonaPresence.none} />
    <Persona
      {...examplePersona}
      text="PersonaPresence.offline"
      presence={PersonaPresence.offline}
    />
    <Persona {...examplePersona} text="PersonaPresence.online" presence={PersonaPresence.online} />
  </div>
);

DefaultSizePresences.storyName = 'default size, presences';

export const DefaultSizeDetailsHidden = () => (
  <Persona {...examplePersona} presence={PersonaPresence.busy} hidePersonaDetails />
);

DefaultSizeDetailsHidden.storyName = 'default size, details hidden';

export const Size72Large = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size72} presence={PersonaPresence.dnd} />
    <Persona {...examplePersona} size={PersonaSize.large} presence={PersonaPresence.dnd} />
  </div>
);

Size72Large.storyName = 'size72 (large)';

export const Size100ExtraLarge = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size100} presence={PersonaPresence.blocked} />
    <Persona {...examplePersona} size={PersonaSize.extraLarge} presence={PersonaPresence.blocked} />
  </div>
);

Size100ExtraLarge.storyName = 'size100 (extraLarge)';

export const Size100ExtraLargeRTL = getStoryVariant(Size100ExtraLarge, RTL);

export const Size120 = () => (
  <div>
    <Persona {...examplePersona} size={PersonaSize.size120} presence={PersonaPresence.blocked} />
  </div>
);

Size120.storyName = 'size120';

export const Size120RTL = getStoryVariant(Size120, RTL);

export const Initials = () => <Persona {...examplePersona} imageUrl={undefined} />;

export const InitialsRTL = getStoryVariant(Initials, RTL);

export const PersonaWithChildren = () => (
  <Persona {...examplePersona}>
    <span>Persona Children</span>
  </Persona>
);

PersonaWithChildren.storyName = 'Persona with children';
