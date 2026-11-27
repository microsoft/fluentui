export const Ownership = (): null => {
  const options = {
    root: { 'data-selected': '' } as Record<string, string>,
    defaultProps: { 'data-default': '' },
  };
  options.root['data-assigned'] = '';

  const state = {
    components: { root: 'div', header: 'div' },
    root: {} as Record<string, string>,
    header: { 'data-header': '' },
  };
  state.root['data-owned'] = '';

  return null;
};
