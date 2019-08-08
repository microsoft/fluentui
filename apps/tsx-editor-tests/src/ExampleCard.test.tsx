import * as React from 'react';
import { mount } from 'enzyme';
import { setUpMonaco } from './testUtilities';

describe('ExampleCard', () => {
  beforeAll(setUpMonaco);

  it('does fake test', () => {
    // TODO: actually test something :D
    mount(<div />);
    expect(true).toBeTruthy();
  });
});
