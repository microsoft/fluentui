import { ReactWrapper } from 'enzyme';
import * as sinon from 'sinon';
/**
 * Injects a function call prior to running componentDidUpdate for a component
 * rendered using enzyme deep rendering.
 * @param wrapper The enzyme deep rendering wrapper whose onComponentDidUpdate
 * @param fn The function to run prior to onComponentDidUpdate
 */
export function runPriorToComponentDidUpdate(wrapper: ReactWrapper<any, any>, fn: () => void) {
  // tslint:disable-next-line:no-string-literal
  const originalComponentDidUpdate = wrapper.instance()['componentDidUpdate'];

  if (typeof originalComponentDidUpdate !== 'function') {
    throw new Error('Tried to override componentDidUpdate on a ReactWrapper that does not have that function');
  }

  // tslint:disable-next-line:no-string-literal
  wrapper.instance()['componentDidUpdate'] = function (prevProps: any) {
    fn();
    originalComponentDidUpdate.call(this, prevProps);
  };
}

/**
 * Replaces the enzyme render function with a spy that can be used to count how many
 * times the render function was called in a test.
 * @param wrapper The wrapper around the component instance for which you want to spy upon
 */
export function setRenderSpy(wrapper: ReactWrapper<any, any>): sinon.SinonSpy {
  let spy = sinon.spy(wrapper.instance().render);
  wrapper.instance().render = spy;
  return spy;
}