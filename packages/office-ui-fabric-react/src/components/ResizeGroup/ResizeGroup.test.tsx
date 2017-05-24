import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { ResizeGroup, IResizeGroupState } from './ResizeGroup';
import * as sinon from 'sinon';
import * as stylesImport from './ResizeGroup.scss';
import { injectWrapperMethod, setRenderSpy } from '@uifabric/utilities/lib/test/';
const styles: any = stylesImport;

interface ITestScalingData {
  scalingIndex: number;
}

function onReduceScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex - 1
  };
}

function getWrapperWithMocks(data: ITestScalingData = { scalingIndex: 5 }, onReduceData?: (data: ITestScalingData) => ITestScalingData) {
  const onReduceDataMock = sinon.spy(onReduceData);
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

  // Since measurement happens inside componentDidUpdate, we need to make sure
  // that our mocks are attached to the DOM nodes before that code runs so that
  // we can return fake measurements in our tests.
  injectWrapperMethod(wrapper, 'componentDidUpdate', () => {
    let measured = wrapper.find('.' + styles.measured);
    if (measured.length > 0) {
      measured.getDOMNode().getBoundingClientRect = measuredGetClientRectMock;
    }

    wrapper.getDOMNode().getBoundingClientRect = rootGetClientRectMock;
  });

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
    });

    // onRenderData should get called to measure and to render when props are updated.
    expect(onRenderData.callCount).to.equal(4);
  });

  it('will call onReduceData when contents do not fit', () => {
    let { wrapper, onReduceDataMock, rootGetClientRectMock, measuredGetClientRectMock } = getWrapperWithMocks();

    onReduceDataMock.reset();
    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 75 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 40 });

    wrapper.setState({ shouldMeasure: true });

    expect(onReduceDataMock.callCount).to.equal(1);
  });

  it('will measure after a window resize', () => {
    let { onReduceDataMock, rootGetClientRectMock, measuredGetClientRectMock } = getWrapperWithMocks();

    onReduceDataMock.reset();
    rootGetClientRectMock.reset();
    measuredGetClientRectMock.reset();
    rootGetClientRectMock.returns({ width: 200 });
    measuredGetClientRectMock.returns({ width: 100 });

    window.dispatchEvent(new Event('resize'));

    expect(rootGetClientRectMock.callCount).to.equal(1);
    expect(measuredGetClientRectMock.callCount).to.equal(1);

    // Don't call onReduceData since everything fits
    expect(onReduceDataMock.callCount).to.equal(0);
  });

  it('will continue to shrink until everything fits', () => {
    let data = { scalingIndex: 7 };

    let { wrapper,
      onReduceDataMock,
      rootGetClientRectMock,
      measuredGetClientRectMock } = getWrapperWithMocks(data, onReduceScalingData);

    onReduceDataMock.reset();
    measuredGetClientRectMock.reset();
    rootGetClientRectMock.reset();
    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 100 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 80 });
    measuredGetClientRectMock.onThirdCall().returns({ width: 40 });

    wrapper.setState({ shouldMeasure: true });

    expect(onReduceDataMock.callCount).to.equal(2);
    expect(onReduceDataMock.getCall(0).args[0]).to.deep.equal(data);
    expect(onReduceDataMock.getCall(1).args[0]).to.deep.equal({ scalingIndex: 6 });
    expect(wrapper.state()).to.deep.equal({
      measuredData: data,
      renderedData: { scalingIndex: 5 },
      shouldMeasure: false
    });
  });

  it('renders no more than twice when everything fits', () => {
    let { wrapper, rootGetClientRectMock, measuredGetClientRectMock } = getWrapperWithMocks();

    rootGetClientRectMock.returns({ width: 100 });
    measuredGetClientRectMock.returns({ width: 75 });

    let onRenderSpy = setRenderSpy(wrapper);

    wrapper.setState({ shouldMeasure: true });

    // There are 2 renders. The first does a measure and a layout, the second removes the measured.
    // Ideally, this can be optimized so that there is only 1 render, but this
    // test makes sure it doesn't get worse than this.
    expect(onRenderSpy.callCount).to.equal(2);
  });

  it('starts from the beginning when resizing', () => {
    let data = { scalingIndex: 10 };
    let { wrapper, onRenderDataMock } = getWrapperWithMocks(data);

    wrapper.setState({
      renderedData: { scalingIndex: 5 },
      shouldMeasure: false
    });

    onRenderDataMock.reset();
    wrapper.setState({
      shouldMeasure: true
    });

    // This is a scenario where too many renders take place,
    // but the important thing here is that the last onRender data
    // starts from the beginning to make sure we are making maximal
    // use of the screen real estate.
    expect(onRenderDataMock.callCount).to.equal(3);
    expect(onRenderDataMock.getCall(2).args[0]).to.deep.equal(data);
    expect(wrapper.state()).to.deep.equal({
      renderedData: data,
      measuredData: data,
      shouldMeasure: false
    });
  });
});
