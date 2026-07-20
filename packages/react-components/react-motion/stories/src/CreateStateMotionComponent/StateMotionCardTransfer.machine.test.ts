import { createStateMotionController } from '../../../library/src/state/createStateMotionController';

import { InterruptibleScalar } from './createInterruptibleScalar';
import { cardMachine, type CardEvent, type CardState } from './StateMotionCardTransfer.machine';

const eventTypes: CardEvent['type'][] = ['LIFT', 'TRANSFER', 'RETARGET', 'DROP', 'GRAB', 'RELEASE', 'CANCEL'];

const legalTransitions: Record<CardState, Partial<Record<CardEvent['type'], CardState>>> = {
  dropped: { LIFT: 'lifting', GRAB: 'pickingUp' },
  lifting: { DROP: 'dropping' },
  lifted: { TRANSFER: 'transferring', DROP: 'dropping' },
  transferring: { RETARGET: 'transferring', DROP: 'dropping' },
  transferred: { DROP: 'dropping' },
  pickingUp: { RELEASE: 'dropping', CANCEL: 'dropping' },
  dragging: { RELEASE: 'dropping', CANCEL: 'dropping' },
  dropping: { LIFT: 'lifting' },
};

const animationTargets: Partial<Record<CardState, CardState>> = {
  lifting: 'lifted',
  transferring: 'transferred',
  pickingUp: 'dragging',
  dropping: 'dropped',
};

describe('cardMachine', () => {
  it('starts dropped without an active animation', () => {
    const controller = createStateMotionController(cardMachine);

    expect(controller.getSnapshot()).toEqual({ state: 'dropped', animation: undefined });
  });

  it.each(Object.entries(legalTransitions) as Array<[CardState, Partial<Record<CardEvent['type'], CardState>>]>)(
    'accepts exactly the declared events from %s',
    (source, transitions) => {
      for (const eventType of eventTypes) {
        const controller = createStateMotionController(cardMachine, { initialState: source });
        const before = controller.getSnapshot();
        const expectedState = transitions[eventType];
        const accepted = controller.send({ type: eventType });

        if (!expectedState) {
          expect(accepted).toBe(false);
          expect(controller.getSnapshot()).toBe(before);
          continue;
        }

        expect(accepted).toBe(true);
        expect(controller.getSnapshot()).toEqual({
          state: expectedState,
          animation: animationTargets[expectedState]
            ? {
                id: 1,
                source,
                target: animationTargets[expectedState],
                event: { type: eventType },
              }
            : undefined,
        });
      }
    },
  );

  it('completes the lift, transfer, and drop cycle in order', () => {
    const controller = createStateMotionController(cardMachine);

    expect(controller.send({ type: 'LIFT' })).toBe(true);
    expect(controller.completeAnimation(1)).toBe(true);
    expect(controller.getSnapshot()).toEqual({ state: 'lifted', animation: undefined });

    expect(controller.send({ type: 'TRANSFER' })).toBe(true);
    expect(controller.completeAnimation(2)).toBe(true);
    expect(controller.getSnapshot()).toEqual({ state: 'transferred', animation: undefined });

    expect(controller.send({ type: 'DROP' })).toBe(true);
    expect(controller.completeAnimation(3)).toBe(true);
    expect(controller.getSnapshot()).toEqual({ state: 'dropped', animation: undefined });
  });

  it('lifts into dragging after the card is grabbed', () => {
    const controller = createStateMotionController(cardMachine);

    expect(controller.send({ type: 'GRAB' })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'pickingUp',
      animation: { id: 1, source: 'dropped', target: 'dragging', event: { type: 'GRAB' } },
    });
    expect(controller.completeAnimation(1)).toBe(true);
    expect(controller.getSnapshot()).toEqual({ state: 'dragging', animation: undefined });
  });

  it.each(['RELEASE', 'CANCEL'] as const)('can end a pickup early through %s', eventType => {
    const controller = createStateMotionController(cardMachine);
    controller.send({ type: 'GRAB' });

    expect(controller.send({ type: eventType })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'dropping',
      animation: { id: 2, source: 'pickingUp', target: 'dropped', event: { type: eventType } },
    });
    expect(controller.completeAnimation(1)).toBe(false);
    expect(controller.completeAnimation(2)).toBe(true);
  });

  it.each(['RELEASE', 'CANCEL'] as const)('drops from dragging through %s', eventType => {
    const controller = createStateMotionController(cardMachine, { initialState: 'dragging' });

    expect(controller.send({ type: eventType })).toBe(true);
    expect(controller.getSnapshot()).toEqual({
      state: 'dropping',
      animation: { id: 1, source: 'dragging', target: 'dropped', event: { type: eventType } },
    });
  });

  it('assigns a new identity to every mid-flight retarget and ignores stale completions', () => {
    const controller = createStateMotionController(cardMachine, { initialState: 'lifted' });

    controller.send({ type: 'TRANSFER' });
    controller.send({ type: 'RETARGET' });
    controller.send({ type: 'RETARGET' });

    expect(controller.getSnapshot()).toEqual({
      state: 'transferring',
      animation: { id: 3, source: 'transferring', target: 'transferred', event: { type: 'RETARGET' } },
    });
    expect(controller.completeAnimation(1)).toBe(false);
    expect(controller.completeAnimation(2)).toBe(false);
    expect(controller.completeAnimation(3)).toBe(true);
    expect(controller.getSnapshot()).toEqual({ state: 'transferred', animation: undefined });
  });

  it('can interrupt any active phase through its declared event', () => {
    const lifting = createStateMotionController(cardMachine);
    lifting.send({ type: 'LIFT' });
    expect(lifting.send({ type: 'DROP' })).toBe(true);
    expect(lifting.completeAnimation(1)).toBe(false);
    expect(lifting.getSnapshot().state).toBe('dropping');

    const transferring = createStateMotionController(cardMachine, { initialState: 'lifted' });
    transferring.send({ type: 'TRANSFER' });
    expect(transferring.send({ type: 'DROP' })).toBe(true);
    expect(transferring.completeAnimation(1)).toBe(false);
    expect(transferring.getSnapshot().state).toBe('dropping');

    const dropping = createStateMotionController(cardMachine, { initialState: 'transferred' });
    dropping.send({ type: 'DROP' });
    expect(dropping.send({ type: 'LIFT' })).toBe(true);
    expect(dropping.completeAnimation(1)).toBe(false);
    expect(dropping.getSnapshot().state).toBe('lifting');
  });
});

describe('InterruptibleScalar', () => {
  const duration = 1000;

  it('starts at the settled value and reaches the requested target', () => {
    const motion = new InterruptibleScalar(0, () => duration);
    const segment = motion.moveTo(2, 0);

    expect(segment.start).toBe(0);
    expect(segment.target).toBe(2);
    expect(segment.easing.easing).toMatch(/^linear\(/);
    expect(motion.valueAt(0)).toBe(0);
    expect(motion.valueAt(duration * 0.8)).toBeGreaterThan(2);
    expect(motion.valueAt(duration)).toBe(2);
  });

  it.each([
    { name: 'forward', firstTarget: 2, nextTarget: 1 },
    { name: 'reverse', firstTarget: 2, nextTarget: -1 },
  ])('preserves position and real velocity for a $name retarget', ({ firstTarget, nextTarget }) => {
    const motion = new InterruptibleScalar(0, () => duration);
    const current = motion.moveTo(firstTarget, 0);
    const now = 400;
    const progress = now / current.duration;
    const positionBefore = motion.valueAt(now);
    const velocityBefore = ((current.target - current.start) / current.duration) * current.easing.velocityFn(progress);

    const next = motion.moveTo(nextTarget, now);
    const velocityAfter = ((next.target - next.start) / next.duration) * next.easing.velocityFn(0);

    expect(next.start).toBeCloseTo(positionBefore, 10);
    expect(motion.valueAt(now)).toBeCloseTo(positionBefore, 10);
    expect(velocityAfter).toBeCloseTo(velocityBefore, 10);
  });

  it('supports repeated retargets without losing continuity', () => {
    const motion = new InterruptibleScalar(0, () => duration);
    let segment = motion.moveTo(2, 0);

    for (const { target, now } of [
      { target: -1, now: 250 },
      { target: 1, now: 500 },
      { target: 0, now: 750 },
    ]) {
      const progress = (now - segment.startTime) / segment.duration;
      const positionBefore = motion.valueAt(now);
      const velocityBefore =
        ((segment.target - segment.start) / segment.duration) * segment.easing.velocityFn(progress);
      segment = motion.moveTo(target, now);
      const velocityAfter = ((segment.target - segment.start) / segment.duration) * segment.easing.velocityFn(0);

      expect(segment.start).toBeCloseTo(positionBefore, 10);
      expect(velocityAfter).toBeCloseTo(velocityBefore, 10);
    }
  });

  it('settles completed motion and resets cleanly', () => {
    const motion = new InterruptibleScalar(0, () => duration);
    motion.moveTo(2, 0);
    motion.complete();

    expect(motion.valueAt(500)).toBe(2);
    expect(motion.isComplete(500)).toBe(true);

    motion.reset(-1);
    const next = motion.moveTo(1, 600);
    expect(next.start).toBe(-1);
  });
});
