import * as React from 'react';
import { Stack, Text } from '@uifabric/experiments';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { VerticalPersona } from '../index';
import { mergeStyles } from '@uifabric/styling';

const sectionGap = 32;
const headingGap = 16;
const personaCoinGap = 12;

const verticalPersonaStackClassName = mergeStyles({ display: 'flex', flexDirection: 'row' });

const VerticalPersonaStack = (props: { children: JSX.Element[] }) => <div className={verticalPersonaStackClassName}>{props.children}</div>;

export class VerticalPersonaExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack gap={sectionGap}>
        <Stack gap={headingGap} padding={8}>
          <Stack gap={personaCoinGap}>
            <Text>Basic Usage</Text>
            <VerticalPersonaStack>
              <VerticalPersona text="Sukhnam Chander" secondaryText="Principal Program manager" />
              <VerticalPersona text="Kevin Jameson" secondaryText="Professional traveller" />
              <VerticalPersona text="王力" secondaryText="Principal Program manager" />
            </VerticalPersonaStack>
          </Stack>
          <Stack gap={personaCoinGap}>
            <Text>When passing coinProps</Text>
            <VerticalPersonaStack>
              <VerticalPersona text="Eline Page" secondaryText="eSports commentator" coinProps={{ presence: 4 }} />
              <VerticalPersona text="赵丽颖" coinProps={{ imageUrl: PersonaTestImages.personFemale }} />
              <VerticalPersona text="Kevin Jameson" coinProps={{ imageUrl: PersonaTestImages.personMale }} />
            </VerticalPersonaStack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
