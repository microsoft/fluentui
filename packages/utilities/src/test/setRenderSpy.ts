import { ReactWrapper } from 'enzyme';
import * as sinon from 'sinon';

/**
 * Replaces the enzyme render function with a spy that can be used to count how many
 * times the render function was called in a test.
 * @param wrapper - The wrapper around the component instance for which you want to spy upon
 */
export function setRenderSpy(wrapper: ReactWrapper<{}, {}>): sinon.SinonSpy {
  let spy = sinon.spy(wrapper.instance().render);
  wrapper.instance().render = spy;
  return spy;
}