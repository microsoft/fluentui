// tslint:disable-next-line:no-any
export const getClasses = (state: any) => {
  const { classes } = state;

  return typeof classes === 'function' ? classes(state) : classes;
};
