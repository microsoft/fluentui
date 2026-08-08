/** Two source files each export ButtonState, causing a duplicate key 'Button'. */
export { ButtonState } from './ButtonA';
export { ButtonState as ButtonStateB } from './ButtonB';
