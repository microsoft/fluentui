import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

import type { Scenarios } from './types';

export function render(scenarios: Scenarios) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const renderFinishedMarkerId = 'render-done';
  const renderFinishedMarker = document.createElement('div');
  renderFinishedMarker.id = renderFinishedMarkerId;

  // TODO: could default to displaying list of scenarios if param is not provided.
  const defaultScenarioName = Object.keys(scenarios)[0];
  const defaultIterations = 10;
  const queryParams = new URLSearchParams(window.location.search);

  const iterations = queryParams.get('iterations') ? Number(queryParams.get('iterations')) : defaultIterations;
  const scenario = queryParams.get('scenario') ?? defaultScenarioName;
  const renderType = queryParams.get('renderType');

  const PerfTestScenario = scenarios[scenario];

  let root = createRoot(div);

  if (PerfTestScenario) {
    const PerfTestDecorator = PerfTestScenario.decorator || 'div';

    if (renderType === 'virtual-rerender' || renderType === 'virtual-rerender-with-unmount') {
      for (let i = 0; i < iterations - 1; i++) {
        flushSync(() => {
          root.render(<PerfTestScenario />);
        });
        if (renderType === 'virtual-rerender-with-unmount') {
          root.unmount();
          // Need to recreate the root after unmounting
          root = createRoot(div);
        }
      }
      flushSync(() => {
        root.render(<PerfTestScenario />);
      });
      div.appendChild(renderFinishedMarker);
    } else {
      // TODO: This seems to increase React (unstable_runWithPriority) render consumption from 4% to 72%!
      // const ScenarioContent = Array.from({ length: iterations }, () => scenarios[scenario]);

      // TODO: Using React Fragments increases React (unstable_runWithPriority) render consumption from 4% to 26%.
      // It'd be interesting to root cause why at some point.
      // root.render(<>{Array.from({ length: iterations }, () => (scenarios[scenario]))}</>, div);
      flushSync(() => {
        root.render(
          <PerfTestDecorator>
            {Array.from({ length: iterations }, () => (
              <PerfTestScenario />
            ))}
          </PerfTestDecorator>,
        );
      });
      div.appendChild(renderFinishedMarker);
    }
  } else {
    // No PerfTest scenario to render -> done
    div.appendChild(renderFinishedMarker);
  }
}
