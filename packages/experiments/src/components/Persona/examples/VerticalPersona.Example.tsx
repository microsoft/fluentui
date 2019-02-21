import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { mergeStyles } from '@uifabric/styling';
import { Persona } from '../Persona';

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
              <Persona vertical text="Sukhnam Chander" secondaryText="Principal Program manager" />
              <Persona vertical text="Kevin Jameson" secondaryText="Professional traveller" />
              <Persona vertical text="王力" secondaryText="Principal Program manager" />
              <Persona
                vertical
                text="Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr."
                coin={{ imageUrl: PersonaTestImages.personMale }}
              />
              <Persona
                vertical
                text="Christian Duncan Claude Sandra Alvin Matilde Eriksson"
                secondaryText="Director of global strategy management for the entire worldwide organization"
                coin={{ imageUrl: PersonaTestImages.personMale }}
              />
            </VerticalPersonaStack>
          </Stack>
          <Stack gap={personaCoinGap}>
            <Text>When passing coinProps</Text>
            <VerticalPersonaStack>
              <Persona vertical text="Eline Page" secondaryText="eSports commentator" coin={{ presence: 4 }} />
              <Persona vertical text="赵丽颖" coin={{ imageUrl: PersonaTestImages.personFemale }} />
              <Persona vertical text="Kevin Jameson" coin={{ imageUrl: PersonaTestImages.personMale }} />
            </VerticalPersonaStack>
          </Stack>
          <Stack gap={personaCoinGap}>
            <Text>Tokens!</Text>
            <VerticalPersonaStack>
              <Persona
                vertical
                text="Sukhnam Chander"
                secondaryText="Principal Program manager"
                tokens={{
                  verticalPersonaWidth: 200,
                  fontFamily: 'cursive',
                  horizontalTextPadding: 10,
                  primaryTextPaddingTop: '20px',
                  primaryTextFontSize: '22px',
                  primaryTextFontWeight: 800,
                  secondaryTextFontSize: '18px',
                  secondaryTextPaddingTop: '12px'
                }}
              />
              <Persona vertical text="Kevin Jameson" secondaryText="Professional traveller" tokens={{ fontFamily: 'monospace' }} />
              <Persona
                vertical
                text="王力"
                secondaryText="Principal Program manager"
                tokens={{ primaryTextFontWeight: 100, secondaryTextFontSize: '20px' }}
              />
            </VerticalPersonaStack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}
