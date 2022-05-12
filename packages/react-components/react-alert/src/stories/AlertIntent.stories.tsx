import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { DismissCircle20Regular } from '@fluentui/react-icons';

import { Alert } from '../index';

export const Intent = () => {
  const btn = <Button shape="circular" appearance="transparent" icon={<DismissCircle20Regular />} />;

  return (
    <>
      <Alert intent="success" content="success text" action={btn} />
      <Alert intent="error" content="error text" action={btn} />
      <Alert intent="warning" content="warning text" action={btn} />
      <Alert intent="info" content="info text" action={btn} />
    </>
  );
};

Intent.storyName = 'Intent';
Intent.parameters = {
  docs: {
    description: {
      story: 'The intent is used to render a pre-configured Alert component with matching styles',
    },
  },
};
