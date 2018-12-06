import * as React from 'react';
import { PersonaCoin } from '../index';
import { HorizontalStack, Text, VerticalStack } from '@uifabric/experiments';

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
            <PersonaCoinStack>
              <PersonaCoin text="Kevin Jameson" />
              <PersonaCoin text="王力" />
            </PersonaCoinStack>
          </VerticalStack>
        </VerticalStack>
      </VerticalStack>
    );
  }
}
