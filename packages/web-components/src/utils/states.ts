import { CustomStatesSetSupported } from './element-internals.js';

export type ValidationStateValue =
  | 'bad-input'
  | 'custom-error'
  | 'has-message'
  | 'pattern-mismatch'
  | 'range-overflow'
  | 'range-underflow'
  | 'step-mismatch'
  | 'too-long'
  | 'too-short'
  | 'type-mismatch'
  | 'valid'
  | 'value-missing';

export type AvatarStateValue =
  | 'beige'
  | 'blue'
  | 'brass'
  | 'brown'
  | 'cornflower'
  | 'cranberry'
  | 'dark-green'
  | 'dark-red'
  | 'forest'
  | 'gold'
  | 'grape'
  | 'lavender'
  | 'light-teal'
  | 'lilac'
  | 'magenta'
  | 'marigold'
  | 'mink'
  | 'navy'
  | 'peach'
  | 'pink'
  | 'platinum'
  | 'plum'
  | 'pumpkin'
  | 'purple'
  | 'red'
  | 'royal-blue'
  | 'seafoam'
  | 'steel'
  | 'teal';

export type StateValue =
  | 'align-end'
  | 'align-start'
  | 'anchor'
  | 'auto-resize'
  | 'block'
  | 'bold'
  | 'bordered'
  | 'brand'
  | 'center'
  | 'checked'
  | 'circular'
  | 'danger'
  | 'disabled'
  | 'display-shadow'
  | 'dot'
  | 'end'
  | 'error'
  | 'expanded'
  | 'extra-large'
  | 'extra-small'
  | 'filled-darker'
  | 'filled-lighter'
  | 'fit-center'
  | 'fit-contain'
  | 'fit-cover'
  | 'fit-none'
  | 'focus-visible'
  | 'ghost'
  | 'horizontal'
  | 'huge'
  | 'icon-only'
  | 'icon'
  | 'important'
  | 'indeterminate'
  | 'informative'
  | 'inline'
  | 'inset'
  | 'inverted'
  | 'italic'
  | 'justify'
  | 'large'
  | 'medium'
  | 'monospace'
  | 'multi-line'
  | 'neutral'
  | 'nowrap'
  | 'numeric'
  | 'outline'
  | 'pressed'
  | 'primary'
  | 'resize-both'
  | 'resize-horizontal'
  | 'resize-vertical'
  | 'resize'
  | 'rounded'
  | 'semibold'
  | 'severe'
  | 'shadowed'
  | 'single-line'
  | 'size-100'
  | 'size-200'
  | 'size-400'
  | 'size-500'
  | 'size-600'
  | 'size-700'
  | 'size-800'
  | 'size-900'
  | 'size-1000'
  | 'small'
  | 'square'
  | 'strikethrough'
  | 'strong'
  | 'submenu'
  | 'subtle'
  | 'success'
  | 'tint'
  | 'tiny'
  | 'transparent'
  | 'truncate'
  | 'underline'
  | 'user-invalid'
  | 'user-valid'
  | 'vertical'
  | 'warning'
  | AvatarStateValue
  | ValidationStateValue;

/**
 * A cache for the state values.
 *
 * @internal
 */
const statesMap = new Map<string, string>();

/**
 * Returns a string that represents a state.
 *
 * @param state - the state value to convert to a string.
 * @returns a string that represents a state.
 *
 * @public
 */
export function state(state: StateValue): string {
  if (!statesMap.has(state)) {
    if (!CustomStatesSetSupported) {
      statesMap.set(state, `[state--${state}]`);
    } else {
      statesMap.set(state, `:state(${state})`);
    }
  }

  return statesMap.get(state)!;
}
