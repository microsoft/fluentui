import * as React from 'react';
import { Label } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

class LabelExampleContentCustomizationShorthand extends React.Component {
  state = { hidden: false };

  hide = () => {
    this.setState({ hidden: true });
    setTimeout(() => this.setState({ hidden: false }), 2000);
  };

  render() {
    const { hidden } = this.state;

    if (hidden) return 'Returning in 2 seconds...';

    return (
      <Label
        content="You can remove me!"
        circular
        image={{
          src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/matt.jpg',
          avatar: true,
        }}
        icon={<CloseIcon {...{ onClick: this.hide }} />}
      />
    );
  }
}

export default LabelExampleContentCustomizationShorthand;
