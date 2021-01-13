import * as React from 'react';
import { Loader } from '@fluentui/react-northstar';
import { Button, useButton, renderButton, ButtonProps } from '@fluentui/react-button';
import { useBooleanKnob } from '@fluentui/docs-components';

const TeamsButton: React.FC<ButtonProps> = props => {
  const state = useButton(props, null, {
    // TODO: Note, this doesn't work in the current useButton > mergeProps API.
    //       There is no way to set a default slot.
    //       The 'as' prop is also not used correctly, need to pull changes from previous v0 integration.
    loader: <Loader size="small" />,
  });

  return renderButton(state);
};
TeamsButton.displayName = 'Button';

const ButtonExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true });

  // TODO: how to handle default slot components like Loader
  return (
    <div>
      <h4>Option 1</h4>
      <Button loading={loading} content={loading ? 'Processing' : 'Success'} loader={<Loader size="small" />} />
      <h4>Option 2</h4>
      <TeamsButton loading={loading} content={loading ? 'Processing' : 'Success'} />
    </div>
  );
};

export default ButtonExampleLoading;
