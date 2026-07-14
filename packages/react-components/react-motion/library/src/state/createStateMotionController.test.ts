import { createStateMotionController } from './createStateMotionController';
import type { StateMotionDefinition } from '../types';

type PlayerState = 'stopped' | 'playing' | 'paused';
type PlayerEvent = { type: 'PLAY' } | { type: 'PAUSE' } | { type: 'STOP' } | { type: 'RESTART' };

const definition: StateMotionDefinition<PlayerState, PlayerEvent> = {
  initialState: 'stopped',
  states: {
    stopped: {
      keyframe: { opacity: 0.5 },
      on: { PLAY: { target: 'playing' } },
    },
    playing: {
      keyframe: { opacity: 1 },
      on: {
        PAUSE: { target: 'paused' },
        STOP: { target: 'stopped' },
        RESTART: { target: 'playing' },
      },
    },
    paused: {
      keyframe: { opacity: 0.75 },
      on: {
        PLAY: { target: 'playing' },
        STOP: { target: 'stopped' },
      },
    },
  },
};

describe('createStateMotionController', () => {
  it('routes events through a flat graph and records the selected edge', () => {
    const controller = createStateMotionController(definition);

    expect(controller.getSnapshot()).toEqual({ state: 'stopped', transition: undefined });
    expect(controller.send({ type: 'PLAY' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'playing',
      transition: { id: 1, source: 'stopped', target: 'playing', event: { type: 'PLAY' } },
    });

    expect(controller.send({ type: 'PAUSE' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'paused',
      transition: { id: 2, source: 'playing', target: 'paused', event: { type: 'PAUSE' } },
    });
  });

  it('ignores events without an edge and preserves snapshot identity', () => {
    const controller = createStateMotionController(definition);
    const listener = jest.fn();
    const snapshot = controller.getSnapshot();
    controller.subscribe(listener);

    expect(controller.send({ type: 'STOP' })).toBe(false);
    expect(controller.getSnapshot()).toBe(snapshot);
    expect(listener).not.toHaveBeenCalled();
  });

  it('gives repeated self-transitions distinct identities', () => {
    const controller = createStateMotionController(definition, { initialState: 'playing' });

    controller.send({ type: 'RESTART' });
    expect(controller.getSnapshot().transition?.id).toBe(1);
    controller.send({ type: 'RESTART' });
    expect(controller.getSnapshot().transition?.id).toBe(2);
  });

  it('notifies active subscribers once per accepted event', () => {
    const controller = createStateMotionController(definition);
    const listener = jest.fn();
    const unsubscribe = controller.subscribe(listener);

    controller.send({ type: 'PLAY' });
    unsubscribe();
    unsubscribe();
    controller.send({ type: 'STOP' });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
