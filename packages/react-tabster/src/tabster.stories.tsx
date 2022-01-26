import * as React from 'react';
import { useKeyboardNavAttribute } from './index';

export const Keyborg = () => {
  return (
    <div ref={useKeyboardNavAttribute()}>
      <button>Start</button>
      <button>Finish</button>
    </div>
  );
};

export default {
  title: 'tabster',
  id: 'Components/tabster',
};
