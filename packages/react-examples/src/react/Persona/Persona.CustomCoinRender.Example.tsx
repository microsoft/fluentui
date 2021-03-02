import * as React from 'react';
import { IPersonaProps, IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { Stack } from '@fluentui/react/lib/Stack';
import { TestImages } from '@fluentui/example-data';
import { mergeStyles } from '@fluentui/react/lib/Styling';

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
