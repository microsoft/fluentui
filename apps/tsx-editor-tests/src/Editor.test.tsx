import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Editor, transpile } from '@uifabric/tsx-editor';
import { setUpMonaco } from './testUtilities';

describe('Editor', () => {
  let wrapper: ReactWrapper;

  beforeAll(setUpMonaco);

  afterEach(() => {
    wrapper.unmount();
  });

  it('mounts', () => {
    wrapper = mount(<Editor width={500} height={500} language="typescript" code="" onChange={jest.fn()} />);
    // TODO: actually test something :D
    expect(wrapper).toBeTruthy();
  });

  it('transpiles', () => {
    let model: monaco.editor.ITextModel;
    function onChange(m: monaco.editor.ITextModel) {
      model = m;
    }

    wrapper = mount(<Editor width={500} height={500} language="typescript" code="const foo: string = 'hi';" onChange={onChange} />);
    // jest.runAllImmediates();
    // jest.runAllTicks();
    // jest.runOnlyPendingTimers();

    return transpile(model!).then(result => {
      expect(result).toBeTruthy();
    });
  });
});
