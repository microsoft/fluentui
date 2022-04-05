import * as React from 'react';
import { PersonaCoin } from '@fluentui/react-experiments';
import { Stack, Text } from '@fluentui/react';
import { PersonaTestImages } from '@fluentui/react-experiments/lib/common/TestImages';

const tokens = {
  sectionStack: {
    childrenGap: 32,
  },
  headingStack: {
    childrenGap: 16,
  },
  personaCoinStack: {
    childrenGap: 12,
  },
};

export class PersonaCoinSizeAndColorExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack} padding={8}>
          <Stack tokens={tokens.personaCoinStack}>
            <Text>Sizes</Text>
            <Stack horizontal disableShrink tokens={tokens.personaCoinStack}>
              <PersonaCoin text="Kevin Jameson" size={10} />
              <PersonaCoin text="Kevin Jameson" size={24} />
              <PersonaCoin text="Kevin Jameson" size={28} />
              <PersonaCoin text="Kevin Jameson" size={40} />
              <PersonaCoin text="Kevin Jameson" size={48} />
              <PersonaCoin text="Kevin Jameson" size={56} />
              <PersonaCoin text="Kevin Jameson" size={72} />
              <PersonaCoin text="Kevin Jameson" size={100} />
            </Stack>
            <Stack horizontal disableShrink tokens={tokens.personaCoinStack}>
              <PersonaCoin text="Kevin Jameson" size={10} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={24} imageUrl={PersonaTestImages.personMale} presence={1} />
              <PersonaCoin text="Kevin Jameson" size={28} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={40} imageUrl={PersonaTestImages.personMale} presence={2} />
              <PersonaCoin text="Kevin Jameson" size={48} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={56} imageUrl={PersonaTestImages.personMale} presence={3} />
              <PersonaCoin text="Kevin Jameson" size={72} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={100} imageUrl={PersonaTestImages.personMale} presence={4} />
            </Stack>
          </Stack>
          <Stack tokens={tokens.personaCoinStack}>
            <Text>Custom colors</Text>
            <Stack horizontal disableShrink tokens={tokens.personaCoinStack}>
              <PersonaCoin text="Kevin Jameson" coinColor="red" initialsColor="black" />
              <PersonaCoin text="Kevin Jameson" coinColor="beige" initialsColor="black" />
              <PersonaCoin text="Kevin Jameson" coinColor="blue" />
              <PersonaCoin text="Kevin Jameson" coinColor="orange" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
