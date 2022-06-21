/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import { Story, Canvas } from '@storybook/addon-docs';

interface ExampleProps {
  code: string;
  name: string;
  children: any;
}

export const Example = (props: ExampleProps) => {
  console.log(props);
  // const code = '!!raw-loader!./Sliderv8Examples.stories.tsx';
  return (
    <Canvas>
      <Story name="hi">hi</Story>
    </Canvas>
  );
};
