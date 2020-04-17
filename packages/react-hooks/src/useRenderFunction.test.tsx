import * as React from 'react';
import { mount } from 'enzyme';
import { useRenderFunction } from './useRenderFunction';
import { IRenderFunction } from '@uifabric/utilities';

interface ITestComponentProps {
  onRenderContent?: IRenderFunction<ITestComponentProps>;
}

describe('useRenderFunction', () => {
  const defaulRenderContent = () => <div id="default" />;
  const TestComponent = (props: ITestComponentProps) => {
    const renderContent = useRenderFunction(props, 'onRenderContent', defaulRenderContent);

    return renderContent();
  };

  it('uses the default render when no custom render is provided', () => {
    const wrapper = mount(<TestComponent />);

    // Default id node should be rendered
    expect(wrapper.getDOMNode()?.id).toBe('default');
  });

  it('uses the latest custom render', () => {
    const wrapper = mount(<TestComponent onRenderContent={() => <div id="first" />} />);

    expect(wrapper.getDOMNode()?.id).toBe('first');

    wrapper.setProps({ onRenderContent: () => <div id="second" /> });
    expect(wrapper.getDOMNode()?.id).toBe('second');
  });

  it('passes the props and default renderer to the custom renderer', () => {
    const onRenderContent = jasmine.createSpy().and.returnValue(null);
    const props: ITestComponentProps = {
      onRenderContent,
    };
    mount(<TestComponent {...props} />);

    expect(onRenderContent).toHaveBeenCalledWith(props, defaulRenderContent);
  });
});
