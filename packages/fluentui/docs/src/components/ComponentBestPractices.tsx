import * as React from 'react';
import * as _ from 'lodash';
import {
  Extendable,
  Box,
  Flex,
  Header,
  List,
  ListItemProps,
  Segment,
  ShorthandCollection,
} from '@fluentui/react-northstar';
import { AcceptIcon, CloseIcon } from '@fluentui/react-icons-northstar';

export type ComponentBestPracticesProps = Extendable<{
  doList?: React.ReactNode[];
  dontList?: React.ReactNode[];
}>;

const ComponentBestPractices: React.FC<ComponentBestPracticesProps> = ({ doList, dontList }) => {
  const updatedDoList: ShorthandCollection<ListItemProps> = [];
  const updatedDontList: ShorthandCollection<ListItemProps> = [];

  if (_.size(doList) > 0) {
    _.map(doList, element => {
      updatedDoList.push({
        key: doList.indexOf(element),
        content: element,
        media: <AcceptIcon styles={{ color: 'green' }} />,
      });
    });
  }

  if (_.size(dontList) > 0) {
    _.map(dontList, element => {
      updatedDontList.push({
        key: dontList.indexOf(element),
        content: element,
        media: <CloseIcon styles={{ color: 'red' }} />,
      });
    });
  }
  return (
    <>
      <Segment>
        {_.size(doList) > 0 && _.size(dontList) > 0 ? (
          <Flex>
            <Flex.Item size="size.half">
              <Box>
                <Header as="h3" content="Do" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDoList} />
              </Box>
            </Flex.Item>
            <Flex.Item size="size.half">
              <Box>
                <Header as="h3" content="Don't" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDontList} />
              </Box>
            </Flex.Item>
          </Flex>
        ) : _.size(doList) > 0 ? (
          <Flex>
            <Flex.Item grow>
              <Box>
                <Header as="h3" content="Do" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDoList} />
              </Box>
            </Flex.Item>
          </Flex>
        ) : _.size(dontList) > 0 ? (
          <Flex>
            <Flex.Item grow>
              <Box>
                <Header as="h3" content="Don't" styles={{ paddingLeft: '20px' }} />
                <List items={updatedDontList} />
              </Box>
            </Flex.Item>
          </Flex>
        ) : (
          <></>
        )}
      </Segment>
    </>
  );
};

export default ComponentBestPractices;
