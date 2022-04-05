import {
  Accordion,
  Animation,
  Attachment,
  Avatar,
  Button,
  Divider,
  Header,
  CalendarIcon,
  Image,
  imageBehavior,
  Input,
  Popup,
  Provider,
  teamsTheme,
} from '@fluentui/react-northstar';
import * as React from 'react';

class App extends React.Component {
  render() {
    return (
      <Provider theme={teamsTheme}>
        <div>
          <Accordion panels={[{ title: 'Title', content: 'Content' }]} />
          <Animation name="spinner">
            <CalendarIcon circular bordered />
          </Animation>
          <Attachment header="Document.docx" />
          <Avatar image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg" />
          <Button content="Click me" />
          <Divider />
          <Header content="This is " />
          <Image
            accessibility={imageBehavior}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg"
          />
          <Input placeholder="Type here" />
          <Popup trigger={<Button content="Popup" />} content="Popup content" />
        </div>
      </Provider>
    );
  }
}

export default App;
