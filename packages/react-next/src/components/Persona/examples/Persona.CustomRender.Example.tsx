import * as React from 'react';
import {
  IPersonaProps,
  IPersonaSharedProps,
  IPersonaStyles,
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';

const personaStyles: Partial<IPersonaStyles> = { root: { margin: '0 0 10px 0' } };
const iconStyles: Partial<IIconStyles> = { root: { marginRight: 5 } };

export const PersonaCustomRenderExample: React.FunctionComponent = () => {
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
      <div>Custom icon in secondary text</div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        presence={PersonaPresence.offline}
        onRenderSecondaryText={_onRenderSecondaryText}
        styles={personaStyles}
        imageAlt="Annie Lindqvist, status is offline."
      />
    </Stack>
  );
};

function _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
  return (
    <div>
      <Icon iconName="Suitcase" styles={iconStyles} />
      {props.secondaryText}
    </div>
  );
}
