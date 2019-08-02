import * as React from 'react';
import { mount } from 'enzyme';
import { setUpMonacoMocks } from '@uifabric/tsx-editor/lib/common/testUtilities';

describe('ExampleCard', () => {
  beforeAll(setUpMonacoMocks);

  it('does fake test', () => {
    // TODO: actually test something :D
    mount(<div />);
    expect(true).toBeTruthy();
  });
});
