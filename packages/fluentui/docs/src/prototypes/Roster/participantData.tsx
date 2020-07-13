import * as React from 'react';
import Participant from './participant';
import { TreeItem } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const participants = [
  <TreeItem id="1">
    <Participant
      name="Irving Kuhic"
      role="Software Engineer"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/ariffsetiawan/128.jpg"
      status={{
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="2">
    <Participant
      name="Skyler Parks"
      role="Product Manager"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="3">
    <Participant
      name="Adam Parks"
      role="Manager"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/derekcramer/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="4">
    <Participant isTalking name="Dante Schneider" role="Guest" status={{ color: 'gray', title: 'unknown' }} />
  </TreeItem>,
  <TreeItem id="5">
    <Participant
      isMuted
      name="John Doe"
      role="Guest"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="6">
    <Participant
      isTalking
      name="Talking Jim"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/wesleytrankin/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="7">
    <Participant
      name="Tiana kohler"
      role="Software Engineer"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/timmillwood/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="8">
    <Participant
      name="Vernie haley"
      role="Product Manager"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/layerssss/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="9">
    <Participant
      name="Cecile johns"
      role="Software Engineer"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/BenouarradeM/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="10">
    <Participant
      isTalking
      name="Sigmund terry"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/kirangopal/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="11">
    <Participant
      isMuted
      name="Aurore von"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/baumann_alex/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="12">
    <Participant
      isTalking
      name="Rocky walsh"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/tanveerrao/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="13">
    <Participant
      name="Cecile johns"
      role="Software Engineer"
      isTalking
      image="https://s3.amazonaws.com/uifaces/faces/twitter/mirfanqureshi/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="14">
    <Participant
      isTalking
      name="Clementina predovic"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/kimcool/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="15">
    <Participant
      isMuted
      name="Robin huel"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/panchajanyag/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="16">
    <Participant
      isTalking
      name="Rocky walsh"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/tanveerrao/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="17">
    <Participant
      name="Dena langosh"
      role="Product Manager"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/shinze/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="18">
    <Participant
      name="Felicity littel"
      role="Software Engineer"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/thibaut_re/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="19">
    <Participant
      isMuted
      name="Bobby metz"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/catarino/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="20">
    <Participant
      isMuted
      name="Aurore von"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/baumann_alex/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="21">
    <Participant
      isMuted
      name="Baby runolfsson"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/joshhemsley/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="22">
    <Participant
      name="Lucienne fisher"
      role="Software Engineer"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/byrnecore/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="23">
    <Participant
      isMuted
      name="Jaydon dibbert"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/psdesignuk/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="24">
    <Participant
      isMuted
      name="Amya o'conner"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/a_harris88/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="25">
    <Participant
      isMuted
      name="Henriette von"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/jydesign/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="26">
    <Participant
      isMuted
      name="Corene macejkovic"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/gipsy_raf/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="27">
    <Participant
      isMuted
      name="Mireya heathcote"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/kurtinc/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="28">
    <Participant
      name="Danyka ferry"
      isTalking
      role="Software Engineer"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/ivanfilipovbg/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="29">
    <Participant
      isMuted
      name="Lea bogisich"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/caspergrl/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="30">
    <Participant
      isMuted
      name="Alvah kuhic"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/larrygerard/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="31">
    <Participant
      isMuted
      name="Julius weber"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/hgharrygo/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="32">
    <Participant
      name="Lisandro wunsch"
      role="Software Engineer"
      isMuted
      image="https://s3.amazonaws.com/uifaces/faces/twitter/victordeanda/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="33">
    <Participant
      isMuted
      name="Rogelio runolfsson"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/benoitboucart/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="34">
    <Participant
      isMuted
      name="Rebecca yundt"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/HenryHoffman/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
  <TreeItem id="35">
    <Participant
      isMuted
      name="Clair lang"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/duivvv/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="36">
    <Participant
      name="Aubree rodriguez"
      role="Software Engineer"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/chris_witko/128.jpg"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="37">
    <Participant
      isMuted
      name="Jaydon dibbert"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/psdesignuk/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="38">
    <Participant
      isMuted
      name="Sonia funk"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/thimo_cz/128.jpg"
      role="Manager"
      status={{
        color: 'green',
        title: 'Available',
      }}
    />
  </TreeItem>,
  <TreeItem id="39">
    <Participant
      isMuted
      name="Marjolaine cummerata"
      role="Guest"
      image="https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg"
      status={{
        color: 'red',
        title: 'Away',
      }}
    />
  </TreeItem>,
];

export default participants;
