import * as React from 'react';
import { Alert, Button, Flex, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

class PopupExampleOn extends React.Component {
  state = { alert: false };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => this.setState({ alert: false }), 2000);
  };

  render() {
    return (
      <>
        <Flex gap="gap.smaller">
          <Popup
            trigger={<Button icon={<MoreIcon />} content="Click" aria-label="Click button" />}
            content="Hello from popup on click!"
            on="click"
          />
          <Popup
            trigger={<Button icon={<MoreIcon />} content="Hover" aria-label="Hover button" />}
            content="Hello from popup on hover!"
            on="hover"
          />
          <Popup
            trigger={<Button icon={<MoreIcon />} content="Focus" aria-label="Focus button" />}
            content="Hello from popup on focus!"
            on="focus"
          />
          <Popup
            trigger={
              <Button icon={<MoreIcon />} content="Context" aria-label="Context button" onClick={this.showAlert} />
            }
            content="Hello from popup on context!"
            on="context"
          />
        </Flex>
        {this.state.alert && (
          <Alert warning content="Right, you can still click the button! Right click opens the popup." />
        )}
      </>
    );
  }
}

export default PopupExampleOn;
