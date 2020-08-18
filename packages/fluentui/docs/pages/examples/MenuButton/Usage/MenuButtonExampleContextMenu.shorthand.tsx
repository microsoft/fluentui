import * as React from 'react';
import { Alert, Button, MenuButton } from '@fluentui/react-northstar';

const items = ['1', '2', '3', { content: 'submenu', menu: { items: ['4', '5'] } }];

class MenuButtonOnElement extends React.Component {
  state = { alert: false };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => this.setState({ alert: false }), 2000);
  };

  render() {
    return (
      <>
        <MenuButton
          contextMenu
          trigger={
            <div style={{ padding: '4rem', border: 'red dashed' }}>
              <Button content="Random button" onClick={this.showAlert} />
            </div>
          }
          menu={{ items }}
        />
        {this.state.alert && <Alert warning content="Click!" />}
      </>
    );
  }
}

export default MenuButtonOnElement;
