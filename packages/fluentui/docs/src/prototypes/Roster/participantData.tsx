import * as React from 'react';
import Participant from './participant';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const participants = [
  {
    id: 1,
    title: (
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
  },
  {
    id: 2,
    title: (
      <Participant
        name="Skyler Parks"
        role="Product Manager"
        status={{
          color: 'red',
          title: 'Away',
        }}
      />
    ),
  },
  {
    id: 3,
    title: (
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
  },
  {
    id: 4,
    title: <Participant isTalking name="Dante Schneider" role="Guest" status={{ color: 'gray', title: 'unknown' }} />,
  },
  {
    id: 5,
    title: (
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
  },
  {
    id: 6,
    title: (
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
  },
  {
    id: 7,
    title: (
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
  },
  {
    id: 8,
    title: (
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
  },
  {
    id: 9,
    title: (
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
  },
  {
    id: 10,
    title: (
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
  },
  {
    id: 11,
    title: (
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
  },
  {
    id: 12,
    title: (
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
  },
  {
    id: 13,
    title: (
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
  },
  {
    id: 14,
    title: (
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
  },
  {
    id: 15,
    title: (
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
  },
  {
    id: 16,
    title: (
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
  },
  {
    id: 17,
    title: (
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
  },
  {
    id: 18,
    title: (
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
  },
  {
    id: 19,
    title: (
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
  },
  {
    id: 20,
    title: (
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
  },
  {
    id: 21,
    title: (
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
  },
  {
    id: 22,
    title: (
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
  },
  {
    id: 23,
    title: (
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
  },
  {
    id: 24,
    title: (
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
  },
  {
    id: 25,
    title: (
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
  },
  {
    id: 26,
    title: (
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
  },
  {
    id: 27,
    title: (
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
  },
  {
    id: 28,
    title: (
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
  },
  {
    id: 29,
    title: (
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
  },
  {
    id: 30,
    title: (
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
  },
  {
    id: 31,
    title: (
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
  },
  {
    id: 32,
    title: (
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
  },
  {
    id: 33,
    title: (
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
  },
  {
    id: 34,
    title: (
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
  },
  {
    id: 35,
    title: (
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
  },
  {
    id: 36,
    title: (
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
  },
  {
    id: 37,
    title: (
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
  },
  {
    id: 38,
    title: (
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
  },
  {
    id: 39,
    title: (
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
  },
];

export default participants;
