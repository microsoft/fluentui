import * as React from 'react';
import { Button } from '@fluentui/react-future';
import { useBooleanKnob } from '@fluentui/docs-components';

const ButtonExampleLoading = () => {
  const [loading] = useBooleanKnob({ name: 'loading', initialValue: true });

  return <Button loading={loading} content={loading ? 'Processing' : 'Success'} />;
};

export default ButtonExampleLoading;
