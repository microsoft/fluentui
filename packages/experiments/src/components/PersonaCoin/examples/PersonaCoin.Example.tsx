import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { PersonaCoin } from '../index';

const sectionGap = 32;
const headingGap = 16;
const personaCoinGap = 12;

const PersonaCoinStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink gap={personaCoinGap}>
    {props.children}
  </Stack>
);

export class PersonaCoinExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <Stack gap={personaCoinGap}>
            <Text>When passing text initials will be extracted from the text</Text>
            <PersonaCoinStack>
              <PersonaCoin text="Kevin Jameson" />
              <PersonaCoin text="王力" />
              <PersonaCoin text="Eline Page" presence={4} />
              <PersonaCoin text="Eline Page" imageUrl={PersonaTestImages.personFemale} />
              <PersonaCoin text="Kevin Jameson" imageUrl={PersonaTestImages.personMale} />
            </PersonaCoinStack>
          </Stack>
          <Stack gap={personaCoinGap}>
            <Text>When passing specific initials</Text>
            <PersonaCoinStack>
              <PersonaCoin initials="JB" />
              <PersonaCoin initials="王力" />
            </PersonaCoinStack>
          </Stack>
          <Stack gap={personaCoinGap}>
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
