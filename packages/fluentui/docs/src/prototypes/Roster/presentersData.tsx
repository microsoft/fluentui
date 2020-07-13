import * as React from 'react';
import Participant from './participant';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const presenters = [
  {
    id: 40,
    title: (
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
  },
  {
    id: 41,
    title: (
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
  },
  {
    id: 42,
    title: (
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
  },
  {
    id: 43,
    title: (
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
  },
  {
    id: 44,
    title: (
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
  },
  {
    id: 45,
    title: (
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
  },
  {
    id: 46,
    title: (
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
  },
  {
    id: 47,
    title: (
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
  },
  {
    id: 48,
    title: (
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
  },
  {
    id: 49,
    title: (
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
  },
  {
    id: 50,
    title: (
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
  },
];
export default presenters;
