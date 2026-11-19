export const Branching = (props: { open: boolean; skip: boolean }): null => {
  const state = {
    components: { root: 'div' },
    root: {} as Record<string, string | undefined> & {
      'data-typed-exhaustive'?: 'initial' | 'open' | 'closed';
      'data-typed-overwritten'?: 'initial' | 'open' | 'final';
    },
  };

  state.root['data-exhaustive'] = 'initial';
  if (props.open) {
    state.root['data-exhaustive'] = 'open';
  } else {
    state.root['data-exhaustive'] = 'closed';
  }

  if (props.open) {
    state.root['data-alternatives'] = 'open';
  } else {
    state.root['data-alternatives'] = 'closed';
  }

  state.root['data-partial'] = 'initial';
  if (props.open) {
    state.root['data-partial'] = 'open';
  }

  state.root['data-overwritten'] = 'initial';
  if (props.open) {
    state.root['data-overwritten'] = 'open';
  }
  state.root['data-overwritten'] = 'final';

  state.root['data-typed-exhaustive'] = 'initial';
  if (props.open) {
    state.root['data-typed-exhaustive'] = 'open';
  } else {
    state.root['data-typed-exhaustive'] = 'closed';
  }

  state.root['data-typed-overwritten'] = 'initial';
  if (props.open) {
    state.root['data-typed-overwritten'] = 'open';
  }
  state.root['data-typed-overwritten'] = 'final';

  state.root['data-early-return'] = 'initial';
  if (props.open) {
    if (props.skip) {
      return null;
    }
    state.root['data-early-return'] = 'open';
  } else {
    state.root['data-early-return'] = 'closed';
  }

  return null;
};
