import { act, render } from '@testing-library/react';
import * as React from 'react';

import { createStateMotionController } from '../state/createStateMotionController';
import type { StateMotionDefinition, StateMotionTransitionMotionFnParams } from '../types';
import { createStateMotionComponent } from './createStateMotionComponent';

type PlayerState = 'stopped' | 'playing' | 'paused';
type PlayerEvent = { type: 'PLAY'; speed: number } | { type: 'PAUSE' } | { type: 'STOP' };

const transitionMotion = jest.fn(
  ({ event }: StateMotionTransitionMotionFnParams<PlayerState, Extract<PlayerEvent, { type: 'PLAY' }>>) => ({
    keyframes: [{ opacity: 0.5 }, { opacity: 1 }],
    duration: event.speed * 100,
  }),
);

const definition: StateMotionDefinition<PlayerState, PlayerEvent> = {
  initialState: 'stopped',
  states: {
    stopped: {
      keyframe: { opacity: 0.5, transform: 'scale(0.9)' },
      on: { PLAY: { target: 'playing', motion: transitionMotion } },
    },
    playing: {
      keyframe: { opacity: 1, transform: 'scale(1)' },
      on: { PAUSE: { target: 'paused' }, STOP: { target: 'stopped' } },
    },
    paused: {
      keyframe: { opacity: 0.75, transform: 'scale(0.95)' },
      on: { PLAY: { target: 'playing' }, STOP: { target: 'stopped' } },
    },
  },
};

describe('createStateMotionComponent', () => {
  it('applies the initial state and animates selected graph edges', () => {
    const controller = createStateMotionController(definition);
    const StateMotion = createStateMotionComponent(definition);
    const onMotionStart = jest.fn();
    const onMotionFinish = jest.fn();
    const { getByTestId } = render(
      <StateMotion controller={controller} onMotionStart={onMotionStart} onMotionFinish={onMotionFinish}>
        <div data-testid="target" />
      </StateMotion>,
    );

    expect(getByTestId('target')).toHaveStyle({ opacity: 0.5, transform: 'scale(0.9)' });
    expect(onMotionStart).not.toHaveBeenCalled();

    act(() => {
      controller.send({ type: 'PLAY', speed: 2 });
    });

    expect(transitionMotion).toHaveBeenCalledWith(
      expect.objectContaining({ element: getByTestId('target'), event: { type: 'PLAY', speed: 2 } }),
    );
    expect(onMotionStart).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ source: 'stopped', target: 'playing', event: { type: 'PLAY', speed: 2 } }),
    );
    expect(onMotionFinish).toHaveBeenCalledWith(
      null,
      expect.objectContaining({ source: 'stopped', target: 'playing', event: { type: 'PLAY', speed: 2 } }),
    );

    act(() => {
      controller.send({ type: 'PAUSE' });
    });

    expect(getByTestId('target')).toHaveStyle({ opacity: 0.75, transform: 'scale(0.95)' });
    expect(onMotionFinish).toHaveBeenLastCalledWith(
      null,
      expect.objectContaining({ source: 'playing', target: 'paused', event: { type: 'PAUSE' } }),
    );
  });

  it('settles to the current state without replaying an event sent before mount', () => {
    const controller = createStateMotionController(definition);
    controller.send({ type: 'PLAY', speed: 1 });
    const StateMotion = createStateMotionComponent(definition);
    const onMotionStart = jest.fn();
    const { getByTestId } = render(
      <StateMotion controller={controller} onMotionStart={onMotionStart}>
        <div data-testid="target" />
      </StateMotion>,
    );

    expect(getByTestId('target')).toHaveStyle({ opacity: 1, transform: 'scale(1)' });
    expect(onMotionStart).not.toHaveBeenCalled();
  });

  it('rejects a controller created for a different graph definition', () => {
    const StateMotion = createStateMotionComponent(definition);
    const controller = createStateMotionController({ ...definition });

    expect(() =>
      render(
        <StateMotion controller={controller}>
          <div />
        </StateMotion>,
      ),
    ).toThrow('The controller must be created from the same definition');
  });
});
