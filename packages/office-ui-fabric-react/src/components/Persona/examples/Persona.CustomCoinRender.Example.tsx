import * as React from 'react';
import {
  IPersonaProps,
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence,
} from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const customCoinClass = mergeStyles({
  borderRadius: 20,
  display: 'block',
});

const examplePersona: IPersonaSharedProps = {
  imageInitials: 'TR',
  text: 'Ted Randall',
  secondaryText: 'Project Manager',
  optionalText: 'Available at 4:00pm',
};

export const PersonaCustomCoinRenderExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={{ childrenGap: 10 }}>
      <div>Custom render function in place of persona coin's image</div>
      <Persona
        {...examplePersona}
        size={PersonaSize.size72}
        presence={PersonaPresence.online}
        onRenderCoin={_onRenderCoin}
        imageAlt="Ted Randall, status is available at 4 PM"
        imageUrl={TestImages.personaMale}
        coinSize={72}
      />
    </Stack>
  );
};

function _onRenderCoin(props: IPersonaProps): JSX.Element {
  const { coinSize, imageAlt, imageUrl } = props;
  return <img src={imageUrl} alt={imageAlt} width={coinSize} height={coinSize} className={customCoinClass} />;
}
