import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { ResizeGroup } from './ResizeGroup';
import * as sinon from 'sinon';
import * as stylesImport from './ResizeGroup.scss';
const styles: any = stylesImport;

function getShallowWrapperWithMocks(data = { a: 1 }) {
  const onReduceDataMock = sinon.spy();
  const onRenderDataMock = sinon.spy();

  let wrapper = mount(<ResizeGroup
    data={ data }
    onReduceData={ onReduceDataMock }
    onRenderData={ onRenderDataMock }
  />);

  return {
    wrapper,
    onReduceDataMock,
    onRenderDataMock,
  };
}

function getClientRectMocks(wrapper: ReactWrapper<any, any>) {
  let measured = wrapper.find('.' + styles.measured);
  expect(measured).to.have.length(1);

  let rootGetClientRectMock = sinon.spy();
  wrapper.getDOMNode().getBoundingClientRect = rootGetClientRectMock;

  let measuredGetClientRectMock = sinon.spy();
  measured.getDOMNode().getBoundingClientRect = measuredGetClientRectMock;

  return {
    rootGetClientRectMock,
    measuredGetClientRectMock
  }
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

    wrapper = mount(<ResizeGroup
      data={ { a: 2 } }
      onReduceData={ onReduceData }
      onRenderData={ onRenderData }
    />);

    // onRenderData should get called to measure and to render when props are updated.
    expect(onRenderData.callCount).to.equal(4);

  });
});
