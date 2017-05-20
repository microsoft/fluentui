import { ReactWrapper } from 'enzyme';

/**
 * Injects a function call prior to running componentDidUpdate for a component
 * rendered using enzyme deep rendering.
 * @param wrapper The enzyme deep rendering wrapper whose onComponentDidUpdate
 * @param fn The function to run prior to onComponentDidUpdate
 */
export function runPriorToComponentDidUpdate(wrapper: ReactWrapper<any, any>, fn: () => void) {
  const originalComponentDidUpdate = wrapper.instance()['componentDidUpdate'];
  wrapper.instance()['componentDidUpdate'] = function (prevProps: any) {
    fn();
    originalComponentDidUpdate.call(this, prevProps);
  }
}