import * as React from 'react';
import { Button, Divider, Flex, Header, Label, Portal } from '@fluentui/react-northstar';

class PortalExamplePortal extends React.Component {
  state = { log: [], logCount: 0 };

  handleClick = () =>
    this.setState({
      log: [`${new Date().toLocaleTimeString()}: handleClick`, ...this.state.log].slice(0, 20),
      logCount: this.state.logCount + 1,
    });

  clearLog = () => this.setState({ log: [], logCount: 0 });

  render() {
    const { log, logCount } = this.state;

    return (
      <div>
        <Portal
          content={
            <div
              style={{
                position: 'fixed',
                left: '40%',
                top: '45%',
                zIndex: 1000,
                backgroundColor: '#fff',
                padding: '15px',
                boxShadow: 'rgb(187, 187, 187) 0px 2px 8px',
                border: '1px solid rgba(34,36,38,.15)',
                borderRadius: '5px',
              }}
            >
              <Header>This is a basic portal</Header>
              <p>Portals have tons of great callback functions to hook into.</p>
              <p>To close, simply click the close button or click away</p>
            </div>
          }
          trigger={<Button content={'Toggle portal'} onClick={this.handleClick} />}
        />
        <Divider />
        <div>
          <Flex gap="gap.small" vAlign="center">
            <Button onClick={this.clearLog} content="Clear" />
            <span>
              Event Log <Label circular>{logCount}</Label>
            </span>
          </Flex>

          <pre>
            {log.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </pre>
        </div>
      </div>
    );
  }
}

export default PortalExamplePortal;
