import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { ResizeGroup, IResizeGroupState } from './ResizeGroup';
import * as sinon from 'sinon';
import * as stylesImport from './ResizeGroup.scss';
import { IResizeGroupProps } from './ResizeGroup.Props';
const styles: any = stylesImport;

function getShallowWrapperWithMocks(data = { a: 1 }) {
  const onReduceDataMock = sinon.spy();
  const onRenderDataMock = sinon.spy();

  let wrapper = mount<ResizeGroup, IResizeGroupState>(<ResizeGroup
    data={ data }
    onReduceData={ onReduceDataMock }
    onRenderData={ onRenderDataMock }
  />);

  let rootGetClientRectMock = sinon.stub();
  let measuredGetClientRectMock = sinon.stub();
  rootGetClientRectMock.returns({ width: 0 });
  measuredGetClientRectMock.returns({ width: 0 });

  let originalComponentDidUpdate = wrapper.instance()['componentDidUpdate'];
  wrapper.instance()['componentDidUpdate'] = function (prevProps: IResizeGroupProps) {
    let measured = wrapper.find('.' + styles.measured);
    if (measured.length > 0) {
      measured.getDOMNode().getBoundingClientRect = measuredGetClientRectMock;
    }

    wrapper.getDOMNode().getBoundingClientRect = rootGetClientRectMock;

    originalComponentDidUpdate.call(this, prevProps);
  }

  return {
    wrapper,
    onReduceDataMock,
    onRenderDataMock,
    rootGetClientRectMock,
    measuredGetClientRectMock
  };
}

describe('ResizeGroup', () => {
  it('does not render ResizeGroup when no data is passed', () => {
    const onReduceData = sinon.spy();
    const onRenderData = sinon.spy();
    const wrapper = shallow(
      <ResizeGroup
        onReduceData={ onReduceData }
        onRenderData={ onRenderData }
      />
    );

    expect(onRenderData.called).to.equal(false);
  });

  it('does not render ResizeGroup when empty data is passed', () => {
    const onReduceData = sinon.spy();
    const onRenderData = sinon.spy();
    const wrapper = shallow(
      <ResizeGroup
        data={ {} }
        onReduceData={ onReduceData }
        onRenderData={ onRenderData }
      />
    );

    expect(onRenderData.called).to.equal(false);
  });

  it('will remeasure if props are updated', () => {
    const onReduceData = sinon.spy();
    const onRenderData = sinon.spy();

    let wrapper = mount(<ResizeGroup
      data={ { a: 1 } }
      onReduceData={ onReduceData }
      onRenderData={ onRenderData }
    />);

    wrapper.setProps({
      data: { a: 2 },
      onReduceData: onReduceData,
      onRenderData: onRenderData
    });

    // onRenderData should get called to measure and to render when props are updated.
    expect(onRenderData.callCount).to.equal(4);
  });

  it('will call onReduceData when contents do not fit', () => {
    let { wrapper, onReduceDataMock, rootGetClientRectMock, measuredGetClientRectMock } = getShallowWrapperWithMocks();

    onReduceDataMock.reset();
    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.returns({ width: 75 })

    wrapper.setState({ shouldMeasure: true });
    expect(onReduceDataMock.callCount).to.equal(1);
  });
});
