import { CommonWrapper, ReactWrapper } from 'enzyme';

export const findIntrinsicElement = (wrapper: ReactWrapper, selector: string): CommonWrapper =>
  wrapper.find(selector).filterWhere(n => typeof n.type() === 'string');
