import * as React from 'react';
import { Label } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const LabelExampleContentCustomizationShorthand: React.FunctionComponent = () => {
  const [hidden, setHidden] = React.useState<boolean>(false);

  const hide = () => {
    setHidden(true);
    setTimeout(() => setHidden(false), 2000);
  };

  return hidden ? (
    <>{'Returning in 2 seconds...'}</>
  ) : (
    <Label
      content="You can remove me!"
      circular
      image={{
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
        avatar: true,
      }}
      icon={<CloseIcon {...{ onClick: hide }} />}
    />
  );
};

export default LabelExampleContentCustomizationShorthand;
