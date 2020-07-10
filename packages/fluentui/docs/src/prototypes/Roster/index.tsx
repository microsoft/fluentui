import * as React from 'react';
import participants from './participantData';
import presenters from './presentersData';

import themeOverrides from './styles';
import { List, Provider, Accordion, Flex, Button, Input, Header, teamsDarkTheme } from '@fluentui/react-northstar';
import { CloseIcon, LinkIcon } from '@fluentui/react-icons-northstar';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

const ParticipantsList = () => <List navigable items={participants} />;

const PresentersList = () => <List navigable items={presenters} />;

const treeItems = [
  {
    id: 'participants',
    title: 'Currently in this meeting',
    content: <ParticipantsList />,
  },
  {
    id: 'invite',
    title: 'Invite others from conversation (25)',
    content: <PresentersList />,
  },
];

const RosterPrototype: React.FC = () => {
  return (
    <PrototypeSection title="Roster">
      <ComponentPrototype>
        <Provider theme={teamsDarkTheme}>
          <Provider theme={themeOverrides}>
            <Flex column variables={{ isContainer: true }}>
              <Flex space="between" padding="padding.medium" variables={{ isCallingRosterSectionTitle: true }}>
                <Header as="h3" content="Participants"></Header>
                <Button variables={{ isCloseButton: true }} icon={<CloseIcon />} title="Close" iconOnly text />
              </Flex>
              <Flex padding="padding.medium" hAlign="center" variables={{ isRosterSearch: true }}>
                <Input fluid placeholder="Search..." />
                <Button variables={{ isSearchButton: true }} icon={<LinkIcon />} title="Search" iconOnly text />
              </Flex>
              <Accordion panels={treeItems} defaultActiveIndex={[0, 1]}></Accordion>
            </Flex>
          </Provider>
        </Provider>
      </ComponentPrototype>
    </PrototypeSection>
  );
};

export default RosterPrototype;
