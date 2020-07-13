import * as React from 'react';
import Participant from './participant';
import { TreeItem } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const presenters = [
  <TreeItem id="40">
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
  </TreeItem>,
  <TreeItem id="41">
    <Participant
      isMuted
      name="Corene macejkovic"
      role="Guest"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="42">
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
  </TreeItem>,
  <TreeItem id="43">
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
  </TreeItem>,
  <TreeItem id="44">
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
  </TreeItem>,
  <TreeItem id="45">
    <Participant
      isMuted
      name="Corene macejkovic"
      role="Guest"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="46">
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
  </TreeItem>,
  <TreeItem id="47">
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
  </TreeItem>,
  <TreeItem id="48">
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
  </TreeItem>,
  <TreeItem id="49">
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
  </TreeItem>,
  <TreeItem id="50">
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
  </TreeItem>,
];
export default presenters;
