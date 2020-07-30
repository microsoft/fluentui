import * as React from 'react';
import RecentContactsList from './RecentContactsList';
import themeOverrides from './styles';
import historyRows from './history';
import {
  Provider,
  Divider,
  Table,
  Menu,
  Label,
  Text,
  Flex,
  Button,
  Input,
  Header,
  teamsTheme,
} from '@fluentui/react-northstar';
import { AddIcon, CallIcon, IndentIcon } from '@fluentui/react-icons-northstar';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

const CallsPrototype: React.FC = () => {
  return (
    <PrototypeSection title="Calls">
      <ComponentPrototype>
        <Provider theme={teamsTheme}>
          <Provider theme={themeOverrides}>
            <Flex>
              <Flex column variables={{ isSuggestions: true }}>
                <Flex variables={{ isSearch: true }}>
                  <Input fluid placeholder="Type a name or number" />
                </Flex>
                <RecentContactsList />
                <Button disabled icon={<CallIcon />} content="Call" variables={{ isCall: true }} />
                <Text content="Work number" variables={{ isWorkNumber: true }} />
                <Divider />
                <Button content="Call Park" variables={{ isCallPark: true }} />
              </Flex>
              <Flex column variables={{ isHistory: true }}>
                <Label fluid content="Fetching your voicemail..." variables={{ isHistoryStatus: true }} />
                <Flex space="between" variables={{ isHistoryHeaderContainer: true }}>
                  <Header as="h4" content="History" variables={{ isHistoryHeader: true }} />
                  <Menu
                    pills
                    items={[
                      {
                        content: (
                          <Label circular content="All" variables={{ isHistoryFilterLabel: true, isSelected: true }} />
                        ),
                        variables: { isHistoryMenuItem: true },
                      },
                      {
                        content: <Label circular content="Missed" variables={{ isHistoryFilterLabel: true }} />,
                        variables: { isHistoryMenuItem: true },
                      },
                      {
                        content: <Label circular content="Incomming" variables={{ isHistoryFilterLabel: true }} />,
                        variables: { isHistoryMenuItem: true },
                      },
                      {
                        content: <Label circular content="Voicemail" variables={{ isHistoryFilterLabel: true }} />,
                        variables: { isHistoryMenuItem: true },
                      },
                      {
                        content: <IndentIcon outlined />,
                      },
                    ]}
                    variables={{ isHistroyFilter: true }}
                  />
                </Flex>
                <Table rows={historyRows} aria-label="History of calls" />
              </Flex>
              <Flex space="between" variables={{ isSpeedDial: true }}>
                <Header as="h4" content="Speed dial" />
                <Button variables={{ isAddButton: true }} icon={<AddIcon />} title="Close" iconOnly text />
              </Flex>
            </Flex>
          </Provider>
        </Provider>
      </ComponentPrototype>
    </PrototypeSection>
  );
};

export default CallsPrototype;
