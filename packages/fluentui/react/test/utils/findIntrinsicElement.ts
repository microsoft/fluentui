import { CommonWrapper, ReactWrapper } from 'enzyme';

const findIntrinsicElement = (wrapper: ReactWrapper, selector: string): CommonWrapper =>
  wrapper.find(selector).filterWhere(n => typeof n.type() === 'string');

export default findIntrinsicElement;
