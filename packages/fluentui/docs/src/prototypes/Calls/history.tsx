import * as React from 'react';
import { Text, Flex, Avatar } from '@fluentui/react-northstar';
import { ArrowUpIcon, AcceptIcon } from '@fluentui/react-icons-northstar';
import getAvatar from './avatarImages';

function getRowArray(props) {
  return [
    {
      content: <Avatar image={`data:image/jpeg;base64,${props.image}`} name={props.name} status={props.status} />,
      variables: { isHistoryAvatar: true },
    },
    {
      content: props.wasIncomming ? (
        <Text content={props.name} />
      ) : (
        <Flex column>
          <Text content={props.name} />
          <ArrowUpIcon rotate={45} />
        </Flex>
      ),
      variables: { isHistoryName: true },
    },
    {
      content: <Text size="small" content={props.length} />,
      variables: { isHistoryLength: true },
    },
    {
      content: <Text size="small" content={props.date} />,
      variables: { isHistoryDate: true },
    },
  ];
}

const historyRows = [
  {
    key: 1,
    items: getRowArray({
      image: getAvatar(1),
      status: {
        color: 'red',
        title: 'Away',
      },
      name: 'Adam Parks',
      length: '3m 28s',
      date: '7/17/2020, 11:47 AM ',
    }),
  },
  {
    key: 2,
    items: getRowArray({
      image: getAvatar(2),
      status: {
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
      },
      name: 'Skyler Parks',
      length: '9m 22s',
      date: '7/17/2020, 12:17 AM ',
      wasIncomming: true,
    }),
  },
  {
    key: 3,
    items: getRowArray({
      image: getAvatar(3),
      status: {
        color: 'red',
        title: 'Away',
      },
      name: 'Dante Schneider',
      length: '41m 28s',
      date: '7/17/2020, 11:47 AM ',
    }),
  },
  {
    key: 4,
    items: getRowArray({
      image: getAvatar(4),
      status: {
        color: 'red',
        title: 'Away',
      },
      name: 'Tiana kohler',
      length: '1m 28s',
      date: '7/6/2020, 11:47 AM ',
    }),
  },
  {
    key: 5,
    items: getRowArray({
      image: getAvatar(5),
      status: {
        color: 'red',
        title: 'Away',
      },
      name: 'Cecile johns',
      length: '41m 28s',
      date: '7/4/2020, 10:47 AM ',
      wasIncomming: true,
    }),
  },
  {
    key: 6,
    items: getRowArray({
      image: getAvatar(6),
      status: 'unknown',
      name: 'Vernie haley',
      length: '18m 44s',
      date: '6/24/2020, 7:47 AM ',
      wasIncomming: true,
    }),
  },
  {
    key: 7,
    items: getRowArray({
      image: getAvatar(7),
      status: {
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
      },
      name: 'Vernie haley',
      length: '21m 28s',
      date: '6/22/2020, 8:47 AM ',
      wasIncomming: true,
    }),
  },
  {
    key: 8,
    items: getRowArray({
      image: getAvatar(8),
      status: {
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
      },
      name: 'Vernie haley',
      length: '1m 8s',
      date: '6/20/2020, 6:47 AM ',
    }),
  },
];
export default historyRows;
