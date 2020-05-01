import * as React from 'react';
import { Alert, Button, Flex, Popup } from '@fluentui/react-northstar';

const contentWithButtons = (
  <Flex gap="gap.smaller">
    <Button>First</Button>
    <Button primary>Second</Button>
  </Flex>
);

class PopupContextOnElement extends React.Component {
  state = { alert: false };

  showAlert = () => {
    this.setState({ alert: true });
    setTimeout(() => this.setState({ alert: false }), 2000);
  };

  render() {
    return (
      <>
        <Popup
          position="after"
          align="top"
          trigger={
            <div style={{ padding: '4rem', border: 'red dashed' }}>
              <Button content="Random button" onClick={this.showAlert} />
            </div>
          }
          tabbableTrigger={false}
          content={contentWithButtons}
          trapFocus
          on="context"
        />
        {this.state.alert && <Alert warning content="Click!" />}
      </>
    );
  }
}

export default PopupContextOnElement;
