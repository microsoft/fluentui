import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { PersonaTestImages } from '@fluentui/react-experiments/lib/common/TestImages';
import { PersonaCoin } from '@fluentui/react-experiments';

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

const PersonaCoinStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.personaCoinStack}>
    {props.children}
  </Stack>
);

export class PersonaCoinExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack} padding={8}>
          <Stack tokens={tokens.personaCoinStack}>
            <Text>When passing text initials will be extracted from the text</Text>
            <PersonaCoinStack>
              <PersonaCoin text="Kevin Jameson" />
              <PersonaCoin text="王力" />
              <PersonaCoin text="Eline Page" presence={4} />
              <PersonaCoin text="Eline Page" imageUrl={PersonaTestImages.personFemale} />
              <PersonaCoin text="Kevin Jameson" imageUrl={PersonaTestImages.personMale} />
            </PersonaCoinStack>
          </Stack>
          <Stack tokens={tokens.personaCoinStack}>
            <Text>When passing specific initials</Text>
            <PersonaCoinStack>
              <PersonaCoin initials="JB" />
              <PersonaCoin initials="王力" />
            </PersonaCoinStack>
          </Stack>
          <Stack tokens={tokens.personaCoinStack}>
            <Text>Initials not available</Text>
            <PersonaCoinStack>
              <PersonaCoin />
            </PersonaCoinStack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
