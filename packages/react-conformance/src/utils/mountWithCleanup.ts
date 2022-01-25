import { mount as enzymeMount, ReactWrapper } from 'enzyme';

let wrapper: ReactWrapper | undefined;

/**
 * A wrapper around enzyme's mount that helps with unmounting and cleanup
 * This is an approach that's adopted by quite a few users of enzyme.
 * https://github.com/enzymejs/enzyme/issues/911
 * @returns Enzyme wrapper
 */
export const mount = (...args: Parameters<typeof enzymeMount>) => {
  const enzymeWrapper = enzymeMount(...args);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  wrapper = enzymeWrapper;
  return enzymeWrapper;
};

export const cleanup = () => {
  if (wrapper) {
    try {
      wrapper.unmount();
    } catch {
      console.error('failed to unmount');
    }
  }

  wrapper = undefined;
};
