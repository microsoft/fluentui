import * as React from 'react';
import { PersonaCoin } from '../index';
import { HorizontalStack, VerticalStack, Text } from '@uifabric/experiments';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';

const sectionGap = 32;
const headingGap = 16;
const personaCoinGap = 12;

const PersonaCoinStack = (props: { children: JSX.Element[] }) => <HorizontalStack gap={personaCoinGap}>{props.children}</HorizontalStack>;

export class PersonaCoinExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <VerticalStack gap={sectionGap}>
        <VerticalStack gap={headingGap} padding={8}>
          <VerticalStack gap={personaCoinGap}>
            <Text>When passing text initials will be extracted from the text</Text>
            <PersonaCoinStack>
              <PersonaCoin text="Kevin Jameson" />
              <PersonaCoin text="王力" />
              <PersonaCoin text="Eline Page" presence={4} />
              <PersonaCoin text="Eline Page" imageUrl={PersonaTestImages.personFemale} />
              <PersonaCoin text="Kevin Jameson" imageUrl={PersonaTestImages.personMale} />
            </PersonaCoinStack>
          </VerticalStack>
          <VerticalStack gap={personaCoinGap}>
            <Text>When passing specific initials</Text>
            <PersonaCoinStack>
              <PersonaCoin initials="JB" />
              <PersonaCoin initials="王力" />
            </PersonaCoinStack>
          </VerticalStack>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
