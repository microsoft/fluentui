import * as React from 'react';
import { mount } from 'enzyme';
import { useDocumentRef } from './useDocumentRef';

describe('useDocumentRef', () => {
  it('returns document ref', () => {
    let lastRef: React.RefObject<Document> = React.createRef();
    const TestComponent: React.FunctionComponent = () => {
      const rootRef = React.useRef(null);
      lastRef = useDocumentRef(rootRef);
      return <div ref={rootRef} />;
    };

    const wrapper = mount(<TestComponent />);
    expect(lastRef).toBeDefined();
    expect(lastRef.current).toBe(document);
    wrapper.unmount();
    expect(lastRef.current).toBe(null);
  });
});
