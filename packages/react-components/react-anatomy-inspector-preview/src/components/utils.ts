/**
 * Returns the component name and slot prop name from a BEM className.
 * @param {string} className
 * @returns { componentName: string, slotName: string }
 */
export const parseFluentClassName = (className: string) => {
  const componentName =
    className
      .match(/fui-[A-Za-z]+/g)
      ?.filter(x => !x.includes('__'))
      ?.pop()
      ?.replace('fui-', '') || '';

  const [slotComponentName, slotName] = className
    .split(' ')
    ?.filter(x => x.includes(componentName) && x.includes('__'))
    ?.pop()
    ?.replace('.fui-', '')
    ?.split('__') || ['', ''];

  return { componentName, slotName, slotComponentName };
};
