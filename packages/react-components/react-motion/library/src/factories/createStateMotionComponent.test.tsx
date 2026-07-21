import { act, render } from '@testing-library/react';
import * as React from 'react';

import { createStateMotionController } from '../state/createStateMotionController';
import type {
  StateMotionDefinition,
  StateMotionMachineDefinition,
  StateMotionSkin,
  StateMotionTransitionMotionFnParams,
} from '../types';
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

  it('resolves state references in a multi-keyframe animation skin', () => {
    type State = 'stopped' | 'playing';
    type Event = { type: 'PLAY' };
    type Animation = 'startPlayback';

    const machine: StateMotionMachineDefinition<State, Event, Animation> = {
      initialState: 'stopped',
      states: {
        stopped: { on: { PLAY: { target: 'playing' } } },
        playing: { animation: { id: 'startPlayback', target: 'playing' } },
      },
    };
    const skin = {
      states: {
        stopped: { opacity: 0.6, transform: 'translateX(0) scale(0.9)' },
        playing: { opacity: 1, transform: 'translateX(48px) scale(1)' },
      },
      animations: {
        startPlayback: {
          keyframes: [
            { state: 'current' },
            { offset: 0.7, opacity: 1, transform: 'translateX(56px) scale(1.06)' },
            { state: 'target' },
          ],
          duration: 300,
        },
      },
    } satisfies StateMotionSkin<State, Animation>;
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    const animation = {
      cancel: jest.fn(),
      finish: jest.fn(),
      pause: jest.fn(),
      play: jest.fn(),
      reverse: jest.fn(),
    } as unknown as Animation;
    const animate = jest.fn(() => animation);
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    const { getByTestId } = render(
      <StateMotion controller={controller}>
        <div data-testid="target" />
      </StateMotion>,
    );

    act(() => {
      controller.send({ type: 'PLAY' });
    });

    expect(animate).toHaveBeenCalledWith(
      [
        {},
        { offset: 0.7, opacity: 1, transform: 'translateX(56px) scale(1.06)' },
        { opacity: 1, transform: 'translateX(48px) scale(1)' },
      ],
      expect.objectContaining({ duration: 300 }),
    );
    expect(getByTestId('target')).toHaveStyle({ opacity: 1, transform: 'translateX(48px) scale(1)' });
    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });

  it('resolves state keyframes from the current context', () => {
    type State = 'dropped' | 'lifted' | 'transferred';
    type Event = { type: 'LIFT' } | { type: 'TRANSFER' } | { type: 'DROP' };
    type Animation = 'lifting' | 'transferring' | 'dropping';
    type Route = { originX: number; destinationX: number };

    const machine: StateMotionMachineDefinition<State, Event, Animation> = {
      initialState: 'dropped',
      states: {
        dropped: { animation: { id: 'dropping', target: 'dropped' }, on: { LIFT: { target: 'lifted' } } },
        lifted: { animation: { id: 'lifting', target: 'lifted' }, on: { TRANSFER: { target: 'transferred' } } },
        transferred: { animation: { id: 'transferring', target: 'transferred' }, on: { DROP: { target: 'dropped' } } },
      },
    };
    const skin = {
      states: {
        dropped: ({ context }: { context: Route }) => ({ transform: `translate(${context.originX}px, 0)` }),
        lifted: ({ context }: { context: Route }) => ({ transform: `translate(${context.originX}px, -20px)` }),
        transferred: ({ context }: { context: Route }) => ({
          transform: `translate(${context.destinationX}px, -20px)`,
        }),
      },
      animations: {
        lifting: { keyframes: [{ state: 'current' }, { state: 'target' }] },
        transferring: { keyframes: [{ state: 'current' }, { state: 'target' }] },
        dropping: { keyframes: [{ state: 'current' }, { state: 'target' }] },
      },
    } satisfies StateMotionSkin<State, Animation, Route>;
    const animation = { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() } as unknown as Animation;
    const animate = jest.fn(() => animation);
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    const outboundRoute = { originX: 0, destinationX: 100 };
    const returnRoute = { originX: 100, destinationX: 0 };
    const { getByTestId, rerender } = render(
      <StateMotion context={outboundRoute} controller={controller}>
        <div data-testid="target" />
      </StateMotion>,
    );

    expect(getByTestId('target')).toHaveStyle({ transform: 'translate(0px, 0)' });
    act(() => controller.send({ type: 'LIFT' }));
    act(() => controller.send({ type: 'TRANSFER' }));
    act(() => {
      rerender(
        <StateMotion context={returnRoute} controller={controller}>
          <div data-testid="target" />
        </StateMotion>,
      );
      controller.send({ type: 'DROP' });
    });

    expect(controller.getSnapshot().state).toBe('dropped');
    expect(animate).toHaveBeenNthCalledWith(1, [{}, { transform: 'translate(0px, -20px)' }], expect.anything());
    expect(animate).toHaveBeenNthCalledWith(2, [{}, { transform: 'translate(100px, -20px)' }], expect.anything());
    expect(animate).toHaveBeenNthCalledWith(3, [{}, { transform: 'translate(100px, 0)' }], expect.anything());

    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });

  it('does not restart an active animation when context identity changes', () => {
    type State = 'idle' | 'moving' | 'moved';
    type Event = { type: 'MOVE' };
    type AnimationId = 'moving';
    type Context = { offset: number };

    const machine: StateMotionMachineDefinition<State, Event, AnimationId> = {
      initialState: 'idle',
      states: {
        idle: { on: { MOVE: { target: 'moving' } } },
        moving: { animation: { id: 'moving', target: 'moved' } },
        moved: {},
      },
    };
    const skin = {
      states: {
        idle: { transform: 'translateX(0)' },
        moving: { transform: 'translateX(0)' },
        moved: ({ context }: { context: Context }) => ({ transform: `translateX(${context.offset}px)` }),
      },
      animations: { moving: { keyframes: [{ state: 'current' }, { state: 'target' }] } },
    } satisfies StateMotionSkin<State, AnimationId, Context>;
    const animation = { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() } as unknown as Animation;
    const animate = jest.fn(() => animation);
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    const { rerender } = render(
      <StateMotion context={{ offset: 10 }} controller={controller}>
        <div />
      </StateMotion>,
    );

    act(() => controller.send({ type: 'MOVE' }));
    rerender(
      <StateMotion context={{ offset: 10 }} controller={controller}>
        <div />
      </StateMotion>,
    );

    expect(animate).toHaveBeenCalledTimes(1);
    expect(animation.cancel).not.toHaveBeenCalled();

    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });

  it('disposes the active animation handle on unmount', async () => {
    type State = 'idle' | 'moving' | 'moved';
    type Event = { type: 'MOVE' };
    type AnimationId = 'moving';

    const machine: StateMotionMachineDefinition<State, Event, AnimationId> = {
      initialState: 'idle',
      states: {
        idle: { on: { MOVE: { target: 'moving' } } },
        moving: { animation: { id: 'moving', target: 'moved' } },
        moved: {},
      },
    };
    const skin = {
      states: { idle: { opacity: 0 }, moving: { opacity: 0 }, moved: { opacity: 1 } },
      animations: { moving: { keyframes: [{ state: 'current' }, { state: 'target' }] } },
    } satisfies StateMotionSkin<State, AnimationId>;
    const animation = { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() } as unknown as Animation;
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: () => animation });
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    const onMotionFinish = jest.fn();
    const { unmount } = render(
      <StateMotion controller={controller} onMotionFinish={onMotionFinish}>
        <div />
      </StateMotion>,
    );

    act(() => controller.send({ type: 'MOVE' }));
    unmount();
    await act(async () => {
      animation.onfinish?.(null as unknown as AnimationPlaybackEvent);
      await Promise.resolve();
    });

    expect(controller.getSnapshot().state).toBe('moving');
    expect(onMotionFinish).not.toHaveBeenCalled();

    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });

  it('completes only the current motion after an interruption', async () => {
    type State = 'dropped' | 'lifting' | 'lifted' | 'dropping';
    type Event = { type: 'LIFT' } | { type: 'DROP' };
    type Animation = 'lifting' | 'dropping';

    const machine: StateMotionMachineDefinition<State, Event, Animation> = {
      initialState: 'dropped',
      states: {
        dropped: { on: { LIFT: { target: 'lifting' } } },
        lifting: { animation: { id: 'lifting', target: 'lifted' }, on: { DROP: { target: 'dropping' } } },
        lifted: { on: { DROP: { target: 'dropping' } } },
        dropping: { animation: { id: 'dropping', target: 'dropped' } },
      },
    };
    const skin = {
      states: {
        dropped: { transform: 'translateY(0)' },
        lifting: { transform: 'translateY(0)' },
        lifted: { transform: 'translateY(-20px)' },
        dropping: { transform: 'translateY(-20px)' },
      },
      animations: {
        lifting: { keyframes: [{ state: 'current' }, { state: 'target' }] },
        dropping: { keyframes: [{ state: 'current' }, { state: 'target' }] },
      },
    } satisfies StateMotionSkin<State, Animation>;
    const animations = [
      { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() },
      { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() },
    ] as unknown as Animation[];
    const animate = jest
      .fn<Animation, [Keyframe[], KeyframeAnimationOptions]>()
      .mockReturnValueOnce(animations[0])
      .mockReturnValueOnce(animations[1]);
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    const onMotionFinish = jest.fn();
    const { getByTestId } = render(
      <StateMotion controller={controller} onMotionFinish={onMotionFinish}>
        <div data-testid="target" />
      </StateMotion>,
    );

    act(() => controller.send({ type: 'LIFT' }));
    expect(controller.getSnapshot().state).toBe('lifting');
    act(() => controller.send({ type: 'DROP' }));
    expect(controller.getSnapshot().state).toBe('dropping');

    await act(async () => {
      animations[0].onfinish?.(null as unknown as AnimationPlaybackEvent);
      await Promise.resolve();
    });
    expect(controller.getSnapshot().state).toBe('dropping');
    expect(getByTestId('target')).not.toHaveStyle({ transform: 'translateY(-20px)' });
    expect(onMotionFinish).not.toHaveBeenCalled();

    await act(async () => {
      animations[1].onfinish?.(null as unknown as AnimationPlaybackEvent);
      await Promise.resolve();
    });
    expect(controller.getSnapshot()).toEqual({ state: 'dropped', animation: undefined });
    expect(getByTestId('target')).toHaveStyle({ transform: 'translateY(0)' });
    expect(onMotionFinish).toHaveBeenCalledTimes(1);

    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });

  it('allows a passive renderer to observe an animation without completing it', async () => {
    type State = 'idle' | 'moving' | 'moved';
    type Event = { type: 'MOVE' };
    type Animation = 'moving';

    const machine: StateMotionMachineDefinition<State, Event, Animation> = {
      initialState: 'idle',
      states: {
        idle: { on: { MOVE: { target: 'moving' } } },
        moving: { animation: { id: 'moving', target: 'moved' } },
        moved: {},
      },
    };
    const skin = {
      states: { idle: { opacity: 0 }, moving: { opacity: 0 }, moved: { opacity: 1 } },
      animations: { moving: { keyframes: [{ state: 'current' }, { state: 'target' }] } },
    } satisfies StateMotionSkin<State, Animation>;
    const animations = [
      { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() },
      { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() },
    ] as unknown as Animation[];
    const animate = jest
      .fn<Animation, [Keyframe[], KeyframeAnimationOptions]>()
      .mockReturnValueOnce(animations[0])
      .mockReturnValueOnce(animations[1]);
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    render(
      <>
        <StateMotion controller={controller}>
          <div />
        </StateMotion>
        <StateMotion completeAnimation={false} controller={controller}>
          <div />
        </StateMotion>
      </>,
    );

    act(() => controller.send({ type: 'MOVE' }));
    await act(async () => {
      animations[1].onfinish?.(null as unknown as AnimationPlaybackEvent);
      await Promise.resolve();
    });
    expect(controller.getSnapshot().state).toBe('moving');

    await act(async () => {
      animations[0].onfinish?.(null as unknown as AnimationPlaybackEvent);
      await Promise.resolve();
    });
    expect(controller.getSnapshot()).toEqual({ state: 'moved', animation: undefined });

    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });

  it('preserves the current presentation between consecutive state changes', () => {
    type State = 'dropped' | 'lifted' | 'transferred';
    type Event = { type: 'LIFT' } | { type: 'TRANSFER' };
    type Animation = 'lifting' | 'transferring';

    const machine: StateMotionMachineDefinition<State, Event, Animation> = {
      initialState: 'dropped',
      states: {
        dropped: { on: { LIFT: { target: 'lifted' } } },
        lifted: { animation: { id: 'lifting', target: 'lifted' }, on: { TRANSFER: { target: 'transferred' } } },
        transferred: { animation: { id: 'transferring', target: 'transferred' } },
      },
    };
    const skin = {
      states: {
        dropped: { transform: 'translate(0, 0)' },
        lifted: { transform: 'translate(0, -20px)' },
        transferred: { transform: 'translate(100px, -20px)' },
      },
      animations: {
        lifting: { keyframes: [{ state: 'current' }, { state: 'target' }], duration: 200 },
        transferring: { keyframes: [{ state: 'current' }, { state: 'target' }], duration: 400 },
      },
    } satisfies StateMotionSkin<State, Animation>;
    const animations = [
      { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() },
      { cancel: jest.fn(), commitStyles: jest.fn(), persist: jest.fn() },
    ] as unknown as Animation[];
    const animate = jest
      .fn<Animation, [Keyframe[], KeyframeAnimationOptions]>()
      .mockReturnValueOnce(animations[0])
      .mockReturnValueOnce(animations[1]);
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, value: animate });
    const controller = createStateMotionController(machine);
    const StateMotion = createStateMotionComponent(machine, skin);
    render(
      <StateMotion controller={controller}>
        <div />
      </StateMotion>,
    );

    act(() => {
      controller.send({ type: 'LIFT' });
    });
    act(() => {
      controller.send({ type: 'TRANSFER' });
    });

    expect(controller.getSnapshot().state).toBe('transferred');
    expect(animate).toHaveBeenNthCalledWith(
      1,
      [{}, { transform: 'translate(0, -20px)' }],
      expect.objectContaining({ duration: 200 }),
    );
    expect(animate).toHaveBeenNthCalledWith(
      2,
      [{}, { transform: 'translate(100px, -20px)' }],
      expect.objectContaining({ duration: 400 }),
    );
    expect(animations[0].commitStyles).toHaveBeenCalledTimes(1);
    expect((animations[0].commitStyles as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan(
      (animations[0].cancel as jest.Mock).mock.invocationCallOrder[0],
    );

    delete (HTMLElement.prototype as Partial<HTMLElement>).animate;
  });
});
