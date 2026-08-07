import type { StateMotionMachineDefinition } from '@fluentui/react-components';

export type CardState =
  | 'dropped'
  | 'lifting'
  | 'lifted'
  | 'transferring'
  | 'transferred'
  | 'pickingUp'
  | 'dragging'
  | 'dropping';
export type CardEvent =
  | { type: 'LIFT' }
  | { type: 'TRANSFER' }
  | { type: 'RETARGET' }
  | { type: 'DROP' }
  | { type: 'GRAB' }
  | { type: 'RELEASE' }
  | { type: 'CANCEL' };
export type CardAnimation = 'lifting' | 'transferring' | 'dropping';

export const cardMachine: StateMotionMachineDefinition<CardState, CardEvent, CardAnimation> = {
  initialState: 'dropped',
  states: {
    dropped: {
      on: { LIFT: { target: 'lifting' }, GRAB: { target: 'pickingUp' } },
    },
    lifting: {
      animation: { id: 'lifting', target: 'lifted' },
      on: { DROP: { target: 'dropping' } },
    },
    lifted: {
      on: {
        TRANSFER: { target: 'transferring' },
        DROP: { target: 'dropping' },
      },
    },
    transferring: {
      animation: { id: 'transferring', target: 'transferred' },
      on: {
        RETARGET: { target: 'transferring' },
        DROP: { target: 'dropping' },
      },
    },
    transferred: {
      on: { DROP: { target: 'dropping' } },
    },
    pickingUp: {
      animation: { id: 'lifting', target: 'dragging' },
      on: { RELEASE: { target: 'dropping' }, CANCEL: { target: 'dropping' } },
    },
    dragging: {
      on: { RELEASE: { target: 'dropping' }, CANCEL: { target: 'dropping' } },
    },
    dropping: {
      animation: { id: 'dropping', target: 'dropped' },
      on: { LIFT: { target: 'lifting' } },
    },
  },
};
