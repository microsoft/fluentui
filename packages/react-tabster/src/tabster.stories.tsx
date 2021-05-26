import * as React from 'react';
import { useKeyborg } from './index';

export const Keyborg = () => {
  return (
    <div ref={useKeyborg()}>
      <button>Start</button>
      <button>Finish</button>
    </div>
  );
};

export default {
  title: 'tabster',
  id: 'Components/tabster',
};
