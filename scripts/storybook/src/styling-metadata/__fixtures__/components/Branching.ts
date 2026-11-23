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

function useBase(active: boolean) {
  const state = { components: { root: 'div' }, root: {} as Record<string, string | undefined> };
  state.root['data-presence'] = active ? '' : undefined;
  state.root['data-literal'] = 'base';
  return state;
}

export const CrossScope = (props: { active: boolean; mode: string }): null => {
  const state = useBase(props.active);
  state.root['data-presence'] = 'final';
  state.root['data-presence'] = 'settled';
  state.root['data-literal'] = props.mode;
  return null;
};

const Inherited = (): null => {
  const state = { components: { root: 'div' }, root: {} as Record<string, string | undefined> };
  state.root['data-presence'] = 'inherited';
  state.root['data-literal'] = 'inherited';
  return null;
};

export const ComposedCrossScope = (props: { active: boolean; mode: string }): null => {
  const state = { ...useBase(props.active), components: { root: Inherited } };
  state.root['data-presence'] = 'final';
  state.root['data-literal'] = props.mode;
  return null;
};
