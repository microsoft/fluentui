import * as React from 'react';
import { Button, Subtitle1, Text } from '@fluentui/react-components';
import { action } from '@storybook/addon-actions';

export const Demos = () => {
  return (
    <div>
      <Subtitle1>This story is for testing purposes of this addon</Subtitle1>
      <section>
        <Button onClick={action('button clicked')}>
          <Text>Click me</Text>
        </Button>
      </section>
    </div>
  );
};

export default {
  title: 'Demos',
  components: Demos,
};
