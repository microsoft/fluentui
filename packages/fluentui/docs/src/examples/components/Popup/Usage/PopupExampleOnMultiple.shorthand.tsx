import * as React from 'react';
import { Alert, Button, Flex, Popup } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

class PopupExampleOnMultiple extends React.Component {
  state = { alert: false };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => this.setState({ alert: false }), 2000);
  };

  render() {
    return (
      <>
        <Flex gap="gap.smaller" padding="padding.medium">
          <Popup
            trigger={<Button icon={<MoreIcon />} content="Click + Focus" aria-label="Click or focus button" />}
            content="Hello from popup on click!"
            on={['click', 'focus']}
          />
          <Popup
            trigger={<Button icon={<MoreIcon />} content="Hover + Focus" aria-label="Hover or focus button" />}
            content="Hello from popup on hover!"
            on={['hover', 'focus']}
          />
        </Flex>
        <Flex gap="gap.smaller" padding="padding.medium">
          <Popup
            trigger={
              <Button
                icon={<MoreIcon />}
                content="Context + Focus"
                aria-label="Right click or focus button"
                onClick={this.showAlert}
              />
            }
            content="Hello from popup on click!"
            on={['context', 'focus']}
          />
          <Popup
            trigger={
              <Button
                icon={<MoreIcon />}
                content="Context + Hover"
                aria-label="Right click or hover button"
                onClick={this.showAlert}
              />
            }
            content="Hello from popup on hover!"
            on={['context', 'hover']}
          />
          <Popup
            trigger={
              <Button
                icon={<MoreIcon />}
                content="Context + Hover + Focus"
                aria-label="Right click or hover or focus button"
                onClick={this.showAlert}
              />
            }
            content="Hello from popup on hover!"
            on={['context', 'hover', 'focus']}
          />
        </Flex>
        {this.state.alert && <Alert warning content="Click!" />}
      </>
    );
  }
}

export default PopupExampleOnMultiple;
