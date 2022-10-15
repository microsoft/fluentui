import * as React from 'react';
import { styleInjector } from '../css/injectStyles';
// import { requestPostAnimationFrame } from '../utils/requestPostAnimationFrame';
import { ReactSelectorTree } from './ReactSelectorTree';
import type { TestProps } from './types';

type DebouncedOnRender = () => React.ProfilerOnRenderCallback;

const debouncedOnRender: DebouncedOnRender = () => {
  let start: number;
  let timeoutId: number;
  return (_profilerId, _mode, _actualTime, _baseTime, startTime, commitTime) => {
    if (!start) {
      start = startTime;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      requestAnimationFrame(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        performance.measure('stress', {
          start,
          end: performance.now(),
        });
      });
    }, 250);
  };
};

export const TestMount: React.FC<TestProps> = ({ tree, selectors, componentRenderer, testOptions }) => {
  const ref = React.useRef(false);
  if (!ref.current) {
    ref.current = true;
    if (testOptions.withStyles === 'true') {
      styleInjector(selectors);
    }
  }

  return (
    <React.Profiler id="mount" onRender={debouncedOnRender()}>
      <ReactSelectorTree tree={tree} componentRenderer={componentRenderer} />
    </React.Profiler>
  );
};
