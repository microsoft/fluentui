import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { Persona } from '../Persona';

const sectionGap = 32;
const headingGap = 16;
const personaCoinGap = 12;

export class PersonaExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <Stack gap={personaCoinGap}>
            <Text>Basic Usage</Text>
            <Stack gap={personaCoinGap}>
              <Persona text="Sukhnam Chander" secondaryText="Principal Program manager" />
              <Persona text="Kevin Jameson" secondaryText="Professional traveller" />
              <Persona text="王力" secondaryText="Principal Program manager" />
            </Stack>
          </Stack>
          <Stack gap={personaCoinGap}>
            <Text>When passing coinProps</Text>
            <Stack gap={personaCoinGap}>
              <Persona text="Eline Page" secondaryText="eSports commentator" coin={{ presence: 4 }} />
              <Persona text="赵丽颖" coin={{ imageUrl: PersonaTestImages.personFemale }} />
              <Persona text="Kevin Jameson" coin={{ imageUrl: PersonaTestImages.personMale }} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
