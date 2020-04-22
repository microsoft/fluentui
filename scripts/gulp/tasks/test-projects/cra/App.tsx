import {
  Accordion,
  Animation,
  Avatar,
  Divider,
  Header,
  CalendarIcon,
  Image,
  imageBehavior,
  Input,
  Popup,
  Provider,
  themes,
} from '@fluentui/react-northstar';
import * as React from 'react';

// TODO: revert changes here
class App extends React.Component {
  render() {
    return (
      <Provider theme={themes.teams}>
        <div>
          <Accordion panels={[{ title: 'Title', content: 'Content' }]} />
          <Animation name="spinner">
            <CalendarIcon circular bordered />
          </Animation>
          <Avatar image="//placehold.it" />
          <Divider />
          <Header content="This is " />
          <Image accessibility={imageBehavior} src="//placehold.it" />
          <Input placeholder="Type here" />
          <Popup trigger={<button>Popup</button>} content="Popup content" />
        </div>
      </Provider>
    );
  }
}

export default App;
