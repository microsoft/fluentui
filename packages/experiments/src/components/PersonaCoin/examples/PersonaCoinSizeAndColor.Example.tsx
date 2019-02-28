import * as React from 'react';
import { PersonaCoin } from '../index';
import { Stack, Text } from 'office-ui-fabric-react';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';

const sectionGap = 32;
const headingGap = 16;
const personaCoinGap = 12;

export class PersonaCoinSizeAndColorExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <Stack gap={personaCoinGap}>
            <Text>Sizes</Text>
            <Stack horizontal disableShrink gap={personaCoinGap}>
              <PersonaCoin text="Kevin Jameson" size={10} />
              <PersonaCoin text="Kevin Jameson" size={24} />
              <PersonaCoin text="Kevin Jameson" size={28} />
              <PersonaCoin text="Kevin Jameson" size={40} />
              <PersonaCoin text="Kevin Jameson" size={48} />
              <PersonaCoin text="Kevin Jameson" size={56} />
              <PersonaCoin text="Kevin Jameson" size={72} />
              <PersonaCoin text="Kevin Jameson" size={100} />
            </Stack>
            <Stack horizontal disableShrink gap={personaCoinGap}>
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
          <Stack gap={personaCoinGap}>
            <Text>Custom colors</Text>
            <Stack horizontal disableShrink gap={personaCoinGap}>
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
