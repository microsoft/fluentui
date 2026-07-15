import type { StateMotionMachineDefinition } from '@fluentui/react-components';

export type CardState = 'dropped' | 'lifting' | 'lifted' | 'transferring' | 'transferred' | 'dropping';
export type CardEvent = { type: 'LIFT' } | { type: 'TRANSFER' } | { type: 'RETARGET' } | { type: 'DROP' };
export type CardAnimation = 'lifting' | 'transferring' | 'dropping';

export const cardMachine: StateMotionMachineDefinition<CardState, CardEvent, CardAnimation> = {
  initialState: 'dropped',
  states: {
    dropped: {
      on: { LIFT: { target: 'lifting' } },
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
    dropping: {
      animation: { id: 'dropping', target: 'dropped' },
      on: { LIFT: { target: 'lifting' } },
    },
  },
};
