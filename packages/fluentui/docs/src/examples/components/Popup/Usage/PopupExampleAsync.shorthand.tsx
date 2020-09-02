import * as React from 'react';
import { Button, PopperRefHandle, Popup, Segment } from '@fluentui/react-northstar';
import { MoreIcon } from '@fluentui/react-icons-northstar';

class AsyncDataLoader extends React.Component<{ onLoaded: Function }, { data: React.ReactElement }> {
  state = {
    data: <span>loading..</span>,
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

const PopupExampleAsync = () => {
  const popperRef = React.useRef<PopperRefHandle>();

  return (
    <Popup
      content={<AsyncDataLoader onLoaded={() => popperRef.current.updatePosition()} />}
      trigger={<Button icon={<MoreIcon />} content="Click me!" />}
      popperRef={popperRef}
    />
  );
};

export default PopupExampleAsync;
