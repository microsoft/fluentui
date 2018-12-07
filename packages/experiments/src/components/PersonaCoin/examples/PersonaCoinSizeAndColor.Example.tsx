import * as React from 'react';
import { PersonaCoin } from '../index';
import { HorizontalStack, VerticalStack, Text } from '@uifabric/experiments';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';

const sectionGap = 32;
const headingGap = 16;
const personaCoinGap = 12;

export class PersonaCoinSizeAndColorExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack gap={sectionGap}>
        <VerticalStack gap={headingGap} padding={8}>
          <VerticalStack gap={personaCoinGap}>
            <Text>Sizes</Text>
            <HorizontalStack gap={personaCoinGap}>
              <PersonaCoin text="Kevin Jameson" size={10} />
              <PersonaCoin text="Kevin Jameson" size={24} />
              <PersonaCoin text="Kevin Jameson" size={28} />
              <PersonaCoin text="Kevin Jameson" size={40} />
              <PersonaCoin text="Kevin Jameson" size={48} />
              <PersonaCoin text="Kevin Jameson" size={56} />
              <PersonaCoin text="Kevin Jameson" size={72} />
              <PersonaCoin text="Kevin Jameson" size={100} />
            </HorizontalStack>
            <HorizontalStack gap={personaCoinGap}>
              <PersonaCoin text="Kevin Jameson" size={10} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={24} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={28} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={40} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={48} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={56} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={72} imageUrl={PersonaTestImages.personMale} />
              <PersonaCoin text="Kevin Jameson" size={100} imageUrl={PersonaTestImages.personMale} />
            </HorizontalStack>
          </VerticalStack>
          <VerticalStack gap={personaCoinGap}>
            <Text>Custom colors</Text>
            <HorizontalStack gap={personaCoinGap}>
              <PersonaCoin text="Kevin Jameson" coinColor="red" initialsColor="black" />
              <PersonaCoin text="Kevin Jameson" coinColor="beige" initialsColor="black" />
              <PersonaCoin text="Kevin Jameson" coinColor="blue" />
              <PersonaCoin text="Kevin Jameson" coinColor="orange" />
            </HorizontalStack>
          </VerticalStack>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
