import * as React from 'react';
import { mount } from 'enzyme';
import Editor from './Editor';
import { setUpMonacoMocks } from '../common/testUtilities';

describe('Editor', () => {
  beforeAll(setUpMonacoMocks);

  it('mounts', () => {
    mount(<Editor width={500} height={500} language="typescript" code="" onChange={jest.fn()} />);
    // TODO: actually test something :D
    expect(true).toBeTruthy();
  });
});
