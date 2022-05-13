import * as React from 'react';
import { useKeyboardNavAttribute } from './index';

export const Default = () => {
  return (
    <div ref={useKeyboardNavAttribute()}>
      <button>Start</button>
      <button>Finish</button>
    </div>
  );
};

export default {
  title: 'Components/Tabster',
};
