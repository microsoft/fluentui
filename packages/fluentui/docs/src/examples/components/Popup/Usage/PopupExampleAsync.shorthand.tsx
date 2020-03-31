import * as React from 'react';
import { Button, Popup, Segment } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

class AsyncDataLoader extends React.Component<any, any> {
  state = {
    data: 'loading..',
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: <Segment styles={{ minHeight: '300px' }}>Hello from loaded data!</Segment>,
      });
      this.props.onLoaded();
    }, 1000);
  }

  render() {
    return this.state.data;
  }
}

const PopupExampleAsync = () => (
  <Popup
    trigger={<Button icon={<MoreIcon />} content="Click me!" />}
    renderContent={updatePosition => <AsyncDataLoader onLoaded={updatePosition} />}
  />
);

export default PopupExampleAsync;
