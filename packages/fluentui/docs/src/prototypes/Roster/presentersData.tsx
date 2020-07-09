import * as React from 'react';
import Participant from './participant';
import { MenuButton } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const itemRenderer = (Component, props) => <MenuButton contextMenu trigger={<Component {...props} />} />;

const presenters = [
  {
    key: '40',
    content: (
      <Participant
        isMuted
        name="Ashton hoppe"
        role="Guest"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/lvovenok/128.jpg"
        status={{
          color: 'green',
          icon: <AcceptIcon />,
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },

  {
    key: '41',
    content: (
      <Participant
        isMuted
        name="Corene macejkovic"
        role="Guest"
        status={{
          color: 'red',
          title: 'Away',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '42',
    content: (
      <Participant
        isMuted
        name="Mireya heathcote"
        role="Guest"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/dnezkumar/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '43',
    content: (
      <Participant
        name="Kelly davis"
        isTalking
        role="Software Engineer"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/nessoila/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '44',
    content: (
      <Participant
        isMuted
        name="Aurore gusikowski"
        role="Guest"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/brandclay/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },

  {
    key: '45',
    content: (
      <Participant
        isMuted
        name="Corene macejkovic"
        role="Guest"
        status={{
          color: 'red',
          title: 'Away',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '46',
    content: (
      <Participant
        isMuted
        name="Horace ritchie"
        role="Guest"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/zforrester/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '47',
    content: (
      <Participant
        name="Bradly wiza"
        isTalking
        role="Software Engineer"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/rmlewisuk/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },

  {
    key: '48',
    content: (
      <Participant
        isMuted
        name="Malinda gulgowski"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/nateschulte/128.jpg"
        role="Manager"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '49',
    content: (
      <Participant
        isMuted
        name="Immanuel anderson"
        role="Guest"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/kevinjohndayy/128.jpg"
        status={{
          color: 'red',
          title: 'Away',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '50',
    content: (
      <Participant
        isMuted
        name="Moses harris"
        role="Guest"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/brunodesign1206/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },
];
export default presenters;
