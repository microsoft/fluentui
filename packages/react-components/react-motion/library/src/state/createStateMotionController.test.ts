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

  it('commits every state in a reversible transition sequence', () => {
    type CardState = 'originRest' | 'originLifted' | 'destinationLifted' | 'destinationRest';
    type CardEvent =
      | { type: 'LIFT_FROM_ORIGIN' }
      | { type: 'TRANSFER_TO_DESTINATION' }
      | { type: 'DROP_AT_DESTINATION' }
      | { type: 'LIFT_FROM_DESTINATION' }
      | { type: 'TRANSFER_TO_ORIGIN' }
      | { type: 'DROP_AT_ORIGIN' };

    const cardDefinition: StateMotionDefinition<CardState, CardEvent> = {
      initialState: 'originRest',
      states: {
        originRest: { keyframe: {}, on: { LIFT_FROM_ORIGIN: { target: 'originLifted' } } },
        originLifted: {
          keyframe: {},
          on: {
            TRANSFER_TO_DESTINATION: { target: 'destinationLifted' },
            DROP_AT_ORIGIN: { target: 'originRest' },
          },
        },
        destinationLifted: {
          keyframe: {},
          on: {
            DROP_AT_DESTINATION: { target: 'destinationRest' },
            TRANSFER_TO_ORIGIN: { target: 'originLifted' },
          },
        },
        destinationRest: {
          keyframe: {},
          on: { LIFT_FROM_DESTINATION: { target: 'destinationLifted' } },
        },
      },
    };
    const controller = createStateMotionController(cardDefinition);
    const snapshots = [controller.getSnapshot()];
    controller.subscribe(() => snapshots.push(controller.getSnapshot()));

    const events: CardEvent[] = [
      { type: 'LIFT_FROM_ORIGIN' },
      { type: 'TRANSFER_TO_DESTINATION' },
      { type: 'DROP_AT_DESTINATION' },
      { type: 'LIFT_FROM_DESTINATION' },
      { type: 'TRANSFER_TO_ORIGIN' },
      { type: 'DROP_AT_ORIGIN' },
    ];
    events.forEach(event => expect(controller.send(event)).toBe(true));

    expect(snapshots.map(snapshot => snapshot.state)).toEqual([
      'originRest',
      'originLifted',
      'destinationLifted',
      'destinationRest',
      'destinationLifted',
      'originLifted',
      'originRest',
    ]);
    expect(snapshots.slice(1).map(snapshot => snapshot.transition)).toEqual([
      { id: 1, source: 'originRest', target: 'originLifted', event: { type: 'LIFT_FROM_ORIGIN' } },
      {
        id: 2,
        source: 'originLifted',
        target: 'destinationLifted',
        event: { type: 'TRANSFER_TO_DESTINATION' },
      },
      {
        id: 3,
        source: 'destinationLifted',
        target: 'destinationRest',
        event: { type: 'DROP_AT_DESTINATION' },
      },
      {
        id: 4,
        source: 'destinationRest',
        target: 'destinationLifted',
        event: { type: 'LIFT_FROM_DESTINATION' },
      },
      {
        id: 5,
        source: 'destinationLifted',
        target: 'originLifted',
        event: { type: 'TRANSFER_TO_ORIGIN' },
      },
      { id: 6, source: 'originLifted', target: 'originRest', event: { type: 'DROP_AT_ORIGIN' } },
    ]);
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

  it('rejects target as a reserved state name', () => {
    const invalidDefinition = {
      initialState: 'target',
      states: {
        target: { keyframe: {} },
      },
    } as unknown as StateMotionDefinition<PlayerState, PlayerEvent>;

    expect(() => createStateMotionController(invalidDefinition)).toThrow(
      'createStateMotionController: "target" is reserved and cannot be used as a state name.',
    );
  });

  it('rejects target as a reserved transition target', () => {
    const invalidDefinition = {
      initialState: 'stopped',
      states: {
        stopped: {
          keyframe: {},
          on: { PLAY: { target: 'target' } },
        },
      },
    } as unknown as StateMotionDefinition<PlayerState, PlayerEvent>;

    expect(() => createStateMotionController(invalidDefinition)).toThrow(
      'createStateMotionController: "target" is reserved and cannot be used as a state name.',
    );
  });
});
