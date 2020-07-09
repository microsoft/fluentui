import * as React from 'react';
import Participant from './participant';
import { MenuButton } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const itemRenderer = (Component, props) => <MenuButton contextMenu trigger={<Component {...props} />} />;

const participants = [
  {
    key: '1',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '2',
    content: (
      <Participant
        name="Skyler Parks"
        role="Product Manager"
        status={{
          color: 'red',
          title: 'Away',
        }}
      />
    ),
    children: itemRenderer,
  },
  {
    key: '3',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '4',
    content: <Participant isTalking name="Dante Schneider" role="Guest" status={{ color: 'gray', title: 'unknown' }} />,
    children: itemRenderer,
  },
  {
    key: '5',
    content: (
      <Participant
        isMuted
        name="John Doe"
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
    key: '6',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '7',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '8',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '9',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '10',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '11',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '12',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '13',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '14',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '15',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '16',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '17',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '18',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '19',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '20',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '21',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '22',
    content: (
      <Participant
        name="Lucienne fisher"
        role="Software Engineer"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/byrnecore/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },

  {
    key: '23',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '24',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '25',
    content: (
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
    ),
    children: itemRenderer,
  },

  {
    key: '26',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '27',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '28',
    content: (
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
    ),
    children: itemRenderer,
  },

  {
    key: '29',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '30',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '31',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '32',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '33',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '34',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '35',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '36',
    content: (
      <Participant
        name="Aubree rodriguez"
        role="Software Engineer"
        image="https://s3.amazonaws.com/uifaces/faces/twitter/chris_witko/128.jpg"
        status={{
          color: 'green',
          title: 'Available',
        }}
      />
    ),
    children: itemRenderer,
  },
  ,
  {
    key: '37',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '38',
    content: (
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
    ),
    children: itemRenderer,
  },
  {
    key: '39',
    content: (
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
    ),
    children: itemRenderer,
  },
];

export default participants;
