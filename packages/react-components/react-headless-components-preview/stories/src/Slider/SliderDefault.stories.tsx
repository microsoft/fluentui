import * as React from 'react';
import { Slider } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => {
  return (
    <Slider
      id="custom-slider"
      min={0}
      max={100}
      defaultValue={42}
      className="relative w-full max-w-xs"
      input={{ className: 'peer absolute opacity-0 h-full w-full z-10 focus:outline-none' }}
      rail={{
        className:
          'h-1 rounded-full bg-gray-200 shadow-xs relative after:block after:content-[""] after:absolute after:inset-0 after:rounded-full after:bg-gray-900 after:border after:border-gray-800 after:w-(--fui-Slider--progress)',
      }}
      thumb={{
        className:
          'absolute -top-2 bg-gray-900 rounded-full size-5 shadow border-2 border-white peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2 left-(--fui-Slider--progress) -ml-2',
      }}
    />
  );
};
