import * as React from 'react';
import { Alert, Button, Flex, MenuButton } from '@fluentui/react-northstar';
import { ExpandIcon } from '@fluentui/react-icons-northstar';

class MenuButtonExampleOn extends React.Component {
  state = { alert: false };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => this.setState({ alert: false }), 2000);
  };

  render() {
    return (
      <>
        <Flex gap="gap.smaller">
          <MenuButton
            trigger={<Button icon={<ExpandIcon />} content="Click" aria-label="Click button" />}
            menu={['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]}
            on="click"
          />
          <MenuButton
            trigger={<Button icon={<ExpandIcon />} content="Hover" aria-label="Hover button" />}
            menu={['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]}
            on="hover"
          />
          <MenuButton
            trigger={<Button icon={<ExpandIcon />} content="Focus" aria-label="Focus button" />}
            menu={['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]}
            on="focus"
          />
          <MenuButton
            trigger={
              <Button icon={<ExpandIcon />} content="Context" aria-label="Context button" onClick={this.showAlert} />
            }
            menu={['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }]}
            on="context"
          />
        </Flex>
        {this.state.alert && (
          <Alert warning content="Right, you can still click the button! Right click opens the MenuButton." />
        )}
      </>
    );
  }
}

export default MenuButtonExampleOn;
