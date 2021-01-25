import * as React from 'react';
import participants from './participantData';
import presenters from './presentersData';
import themeOverrides from './styles';
import { Provider, Tree, Text, Flex, Button, Input, Header, teamsDarkTheme } from '@fluentui/react-northstar';
import { CloseIcon, LinkIcon, TriangleDownIcon, TriangleEndIcon } from '@fluentui/react-icons-northstar';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

const titleRenderer = (Component, { content, expanded, open, hasSubtree, ...restProps }) => (
  <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
    {expanded ? <TriangleDownIcon /> : hasSubtree ? <TriangleEndIcon /> : ''}
    <Text size="small" content={content} />
  </Component>
);

const treeItems = [
  {
    id: 'participants',
    title: 'Currently in this meeting',
    items: participants,
  },
  {
    id: 'invite',
    title: 'Invite others from conversation (10)',
    items: presenters,
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
                <Header as="h3" content="Participants" />
                <Button variables={{ isCloseButton: true }} icon={<CloseIcon />} title="Close" iconOnly text />
              </Flex>
              <Flex padding="padding.medium" variables={{ isRosterSearch: true }}>
                <Input fluid placeholder="Search..." />
                <Button variables={{ isSearchButton: true }} icon={<LinkIcon />} title="Search" iconOnly text />
              </Flex>
              <Tree
                items={treeItems}
                renderItemTitle={titleRenderer}
                defaultActiveItemIds={['participants', 'invite']}
              />
            </Flex>
          </Provider>
        </Provider>
      </ComponentPrototype>
    </PrototypeSection>
  );
};

export default RosterPrototype;
