import { createStateMotionController } from './createStateMotionController';
import type { StateMotionDefinition, StateMotionMachineDefinition } from '../types';

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
  it('routes events through a flat graph and records the selected animation', () => {
    const controller = createStateMotionController(definition);

    expect(controller.getSnapshot()).toEqual({ state: 'stopped', animation: undefined });
    expect(controller.send({ type: 'PLAY' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'playing',
      animation: { id: 1, source: 'stopped', target: 'playing', event: { type: 'PLAY' } },
    });

    expect(controller.send({ type: 'PAUSE' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'paused',
      animation: { id: 2, source: 'playing', target: 'paused', event: { type: 'PAUSE' } },
    });
  });

  it('commits every state across repeated transfer cycles', () => {
    type CardState = 'dropped' | 'lifted' | 'transferred';
    type CardEvent = { type: 'LIFT' } | { type: 'TRANSFER' } | { type: 'DROP' };

    const cardDefinition: StateMotionDefinition<CardState, CardEvent> = {
      initialState: 'dropped',
      states: {
        dropped: { keyframe: {}, on: { LIFT: { target: 'lifted' } } },
        lifted: { keyframe: {}, on: { TRANSFER: { target: 'transferred' } } },
        transferred: { keyframe: {}, on: { DROP: { target: 'dropped' } } },
      },
    };
    const controller = createStateMotionController(cardDefinition);
    const snapshots = [controller.getSnapshot()];
    controller.subscribe(() => snapshots.push(controller.getSnapshot()));

    const events: CardEvent[] = [
      { type: 'LIFT' },
      { type: 'TRANSFER' },
      { type: 'DROP' },
      { type: 'LIFT' },
      { type: 'TRANSFER' },
      { type: 'DROP' },
    ];
    events.forEach(event => expect(controller.send(event)).toBe(true));

    expect(snapshots.map(snapshot => snapshot.state)).toEqual([
      'dropped',
      'lifted',
      'transferred',
      'dropped',
      'lifted',
      'transferred',
      'dropped',
    ]);
    expect(snapshots.slice(1).map(snapshot => snapshot.animation)).toEqual([
      { id: 1, source: 'dropped', target: 'lifted', event: { type: 'LIFT' } },
      { id: 2, source: 'lifted', target: 'transferred', event: { type: 'TRANSFER' } },
      { id: 3, source: 'transferred', target: 'dropped', event: { type: 'DROP' } },
      { id: 4, source: 'dropped', target: 'lifted', event: { type: 'LIFT' } },
      { id: 5, source: 'lifted', target: 'transferred', event: { type: 'TRANSFER' } },
      { id: 6, source: 'transferred', target: 'dropped', event: { type: 'DROP' } },
    ]);
  });

  it('commits only the current active motion after an interruption', () => {
    type State = 'dropped' | 'lifting' | 'lifted' | 'dropping';
    type Event = { type: 'LIFT' } | { type: 'DROP' };
    type Transition = 'lifting' | 'dropping';

    const machine: StateMotionMachineDefinition<State, Event, Transition> = {
      initialState: 'dropped',
      states: {
        dropped: { on: { LIFT: { target: 'lifting' } } },
        lifting: { animation: { id: 'lifting', target: 'lifted' }, on: { DROP: { target: 'dropping' } } },
        lifted: { on: { DROP: { target: 'dropping' } } },
        dropping: { animation: { id: 'dropping', target: 'dropped' } },
      },
    };
    const controller = createStateMotionController(machine);

    expect(controller.send({ type: 'LIFT' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'lifting',
      animation: { id: 1, source: 'dropped', target: 'lifted', event: { type: 'LIFT' } },
    });

    expect(controller.send({ type: 'DROP' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'dropping',
      animation: { id: 2, source: 'lifting', target: 'dropped', event: { type: 'DROP' } },
    });

    expect(controller.completeAnimation(1)).toBe(false);
    expect(controller.getSnapshot().state).toBe('dropping');
    expect(controller.completeAnimation(2)).toBe(true);
    expect(controller.getSnapshot()).toEqual({ state: 'dropped', animation: undefined });
    expect(controller.completeAnimation(2)).toBe(false);
  });

  it('can drop a lifted state back to its origin', () => {
    type State = 'dropped' | 'lifting' | 'lifted' | 'dropping';
    type Event = { type: 'LIFT' } | { type: 'DROP' };
    type Animation = 'lifting' | 'dropping';

    const machine: StateMotionMachineDefinition<State, Event, Animation> = {
      initialState: 'dropped',
      states: {
        dropped: { on: { LIFT: { target: 'lifting' } } },
        lifting: { animation: { id: 'lifting', target: 'lifted' } },
        lifted: { on: { DROP: { target: 'dropping' } } },
        dropping: { animation: { id: 'dropping', target: 'dropped' } },
      },
    };
    const controller = createStateMotionController(machine);

    controller.send({ type: 'LIFT' });
    controller.completeAnimation(1);
    expect(controller.getSnapshot().state).toBe('lifted');
    expect(controller.send({ type: 'DROP' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'dropping',
      animation: { id: 2, source: 'lifted', target: 'dropped', event: { type: 'DROP' } },
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

  it('gives repeated self-transition animations distinct identities', () => {
    const controller = createStateMotionController(definition, { initialState: 'playing' });

    controller.send({ type: 'RESTART' });
    expect(controller.getSnapshot().animation?.id).toBe(1);
    controller.send({ type: 'RESTART' });
    expect(controller.getSnapshot().animation?.id).toBe(2);
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
