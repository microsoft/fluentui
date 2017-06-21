import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { ResizeGroup, IResizeGroupState } from './ResizeGroup';
import * as sinon from 'sinon';
import * as stylesImport from './ResizeGroup.scss';
import { injectWrapperMethod, setRenderSpy } from '@uifabric/utilities/lib/test/';
import { IResizeGroupProps } from './ResizeGroup.Props';
const styles: any = stylesImport;

interface ITestScalingData {
  scalingIndex: number;
}

function onReduceScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex - 1
  };
}

function getWrapperWithMocks(data: ITestScalingData = { scalingIndex: 5 },
  onReduceData: (data: ITestScalingData) => ITestScalingData = onReduceScalingData) {
  const onReduceDataSpy = sinon.spy(onReduceData);
  const onRenderDataSpy = sinon.spy();
  const dataDidRenderSpy = sinon.spy();

  let wrapper = mount<IResizeGroupProps, IResizeGroupState>(<ResizeGroup
    data={ data }
    onReduceData={ onReduceDataSpy }
    onRenderData={ onRenderDataSpy }
    dataDidRender={ dataDidRenderSpy }
  />);

  return {
    wrapper,
    onReduceDataSpy,
    onRenderDataSpy,
    dataDidRenderSpy,
    ...getMeasurementMocks(wrapper)
  };
}

function getMeasurementMocks(wrapper: ReactWrapper<IResizeGroupProps, IResizeGroupState>) {
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
    rootGetClientRectMock,
    measuredGetClientRectMock
  };
}

describe('ResizeGroup', () => {
  it('does not render ResizeGroup when no data is passed', () => {
    const onReduceData = sinon.spy();
    const onRenderData = sinon.spy();
    const wrapper = shallow<IResizeGroupProps, IResizeGroupState>(
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
    const wrapper = shallow<IResizeGroupProps, IResizeGroupState>(
      <ResizeGroup
        data={ {} }
        onReduceData={ onReduceData }
        onRenderData={ onRenderData }
      />
    );

    expect(onRenderData.called).to.equal(false);
  });

  it('renders the result of onRenderData', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
    const onRenderData = (data) => <div id={ renderedDataId }> Rendered data: { data.content }</div >;

    const wrapper = shallow<IResizeGroupProps, IResizeGroupState>(
      <ResizeGroup
        data={ initialData }
        onReduceData={ onReduceScalingData }
        onRenderData={ onRenderData }
      />
    );

    expect(wrapper.containsMatchingElement(onRenderData(initialData))).to.be.true;

    // Updating the renderedData state should also render new data
    const nextData = { content: 5 };
    wrapper.setState({ renderedData: nextData });
    expect(wrapper.containsMatchingElement(onRenderData(nextData)));
  });

  it('remeasures if props are updated', () => {
    const onReduceData = sinon.spy();
    const onRenderData = sinon.spy();
    const dataDidRender = sinon.spy();

    let wrapper = mount(<ResizeGroup
      data={ { a: 1 } }
      onReduceData={ onReduceData }
      onRenderData={ onRenderData }
      dataDidRender={ dataDidRender }
    />);

    let newData = { a: 2 };
    wrapper.setProps({
      data: newData,
    });

    // onRenderData should get called to measure and to render when props are updated.
    expect(onRenderData.callCount).to.equal(4);

    // it should call onNewDataRendered with new properties
    expect(dataDidRender.callCount).to.equal(2);
    expect(dataDidRender.getCall(1).args[0]).to.deep.equal(newData);
  });

  it('calls onReduceData when contents do not fit', () => {
    let { wrapper, onReduceDataSpy, rootGetClientRectMock, measuredGetClientRectMock } = getWrapperWithMocks();

    onReduceDataSpy.reset();
    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 75 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 40 });

    wrapper.setState({ shouldMeasure: true });

    expect(onReduceDataSpy.callCount).to.equal(1);
  });

  it('measures after a window resize that grows the container', () => {
    let { onReduceDataSpy, rootGetClientRectMock, measuredGetClientRectMock, wrapper } = getWrapperWithMocks();

    // Initial render with measurements
    rootGetClientRectMock.returns({ width: 200 });
    measuredGetClientRectMock.returns({ width: 100 });
    wrapper.setState({ shouldMeasure: true });

    onReduceDataSpy.reset();
    rootGetClientRectMock.reset();
    measuredGetClientRectMock.reset();

    rootGetClientRectMock.returns({ width: 250 });
    measuredGetClientRectMock.returns({ width: 100 });

    let renderSpy = setRenderSpy(wrapper);
    window.dispatchEvent(new Event('resize'));

    expect(rootGetClientRectMock.callCount).to.equal(2);
    expect(measuredGetClientRectMock.callCount).to.equal(1);

    // Don't call onReduceData because everything fits.
    expect(onReduceDataSpy.callCount).to.equal(0);
    expect(renderSpy.callCount).to.equal(2);
  });

  it('does not render after a window resize that shrinks the container and everything still fits', () => {
    let { onReduceDataSpy, rootGetClientRectMock, measuredGetClientRectMock, wrapper } = getWrapperWithMocks();

    // Initial render with measurements
    rootGetClientRectMock.returns({ width: 200 });
    measuredGetClientRectMock.returns({ width: 100 });
    wrapper.setState({ shouldMeasure: true });

    onReduceDataSpy.reset();
    rootGetClientRectMock.reset();
    measuredGetClientRectMock.reset();

    rootGetClientRectMock.returns({ width: 150 });
    measuredGetClientRectMock.returns({ width: 100 });

    let renderSpy = setRenderSpy(wrapper);
    window.dispatchEvent(new Event('resize'));

    expect(rootGetClientRectMock.callCount).to.equal(1);
    expect(measuredGetClientRectMock.callCount).to.equal(0);

    // Don't call onReduceData or render because everything already fits.
    expect(onReduceDataSpy.callCount).to.equal(0);
    expect(renderSpy.callCount).to.equal(0);
  });

  it('does render after a window resize that shrinks the container and things do not fit', () => {
    let { onReduceDataSpy, rootGetClientRectMock, measuredGetClientRectMock, wrapper } = getWrapperWithMocks();

    // Initial render with measurements
    rootGetClientRectMock.returns({ width: 200 });
    measuredGetClientRectMock.returns({ width: 100 });
    wrapper.setState({ shouldMeasure: true });

    onReduceDataSpy.reset();
    rootGetClientRectMock.reset();
    measuredGetClientRectMock.reset();

    // Simulate a resize where the contents don't fit after a resize, but they fit
    // after calling onReduceData once.
    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 100 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 40 });

    let renderSpy = setRenderSpy(wrapper);
    window.dispatchEvent(new Event('resize'));

    expect(onReduceDataSpy.callCount).to.equal(1);

    // Renders:
    // 1. Measures the contents and determines it does not fit
    // 2. Measures reduced contents and determines it does fit
    // 3. Removes the measured div and updates the rendered view
    expect(renderSpy.callCount).to.equal(3);
  });

  it('starts scaling from the initial data when the container grows', () => {
    let data = { scalingIndex: 10 };

    let { wrapper,
      onReduceDataSpy,
      rootGetClientRectMock,
      measuredGetClientRectMock } = getWrapperWithMocks(data, onReduceScalingData);

    // Simulate a few scale down calls.
    rootGetClientRectMock.returns({ width: 200 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 300 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 250 });
    measuredGetClientRectMock.onThirdCall().returns({ width: 150 });
    wrapper.setState({ shouldMeasure: true });

    expect(wrapper.state().renderedData.scalingIndex).to.equal(8);

    onReduceDataSpy.reset();
    rootGetClientRectMock.reset();
    measuredGetClientRectMock.reset();

    // Simulate a resize where the container grows
    rootGetClientRectMock.returns({ width: 300 });
    measuredGetClientRectMock.returns({ width: 150 });

    window.dispatchEvent(new Event('resize'));

    // The contents fit, so there should be no call to onReduceData
    expect(onReduceDataSpy.callCount).to.equal(0);

    // The internal state should match that of the initial data
    expect(wrapper.state().renderedData.scalingIndex).to.equal(10);
  });

  it('continues scaling from the last rendered data when the container shrinks', () => {
    let data = { scalingIndex: 10 };

    let { wrapper,
      onReduceDataSpy,
      rootGetClientRectMock,
      measuredGetClientRectMock } = getWrapperWithMocks(data, onReduceScalingData);

    // Simulate a few scale down calls.
    rootGetClientRectMock.returns({ width: 200 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 300 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 250 });
    measuredGetClientRectMock.onThirdCall().returns({ width: 150 });
    wrapper.setState({ shouldMeasure: true });

    expect(wrapper.state().renderedData.scalingIndex).to.equal(8);

    onReduceDataSpy.reset();
    rootGetClientRectMock.reset();
    measuredGetClientRectMock.reset();

    // Simulate a resize where the container shrinks and the contents don't fit
    // The contents will then fit after a call to onReduceData
    rootGetClientRectMock.returns({ width: 100 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 150 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 50 });

    window.dispatchEvent(new Event('resize'));

    expect(onReduceDataSpy.callCount).to.equal(1);
    expect(onReduceDataSpy.getCall(0).args[0]).to.deep.equal({ scalingIndex: 8 });
    expect(wrapper.state().renderedData.scalingIndex).to.equal(7);
  });

  it('continues to shrink until everything fits', () => {
    let data = { scalingIndex: 7 };

    let { wrapper,
      onReduceDataSpy,
      rootGetClientRectMock,
      measuredGetClientRectMock,
      dataDidRenderSpy } = getWrapperWithMocks(data, onReduceScalingData);

    dataDidRenderSpy.reset();
    onReduceDataSpy.reset();
    measuredGetClientRectMock.reset();
    rootGetClientRectMock.reset();
    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.onFirstCall().returns({ width: 100 });
    measuredGetClientRectMock.onSecondCall().returns({ width: 80 });
    measuredGetClientRectMock.onThirdCall().returns({ width: 40 });

    wrapper.setState({ shouldMeasure: true });

    expect(onReduceDataSpy.callCount).to.equal(2);
    expect(onReduceDataSpy.getCall(0).args[0]).to.deep.equal(data);
    expect(onReduceDataSpy.getCall(1).args[0]).to.deep.equal({ scalingIndex: 6 });
    expect(wrapper.state()).to.deep.equal({
      measuredData: data,
      renderedData: { scalingIndex: 5 },
      shouldMeasure: false
    });

    // Each measure triggers a render, but the rendered contents only change after the measurement phase completes.
    expect(dataDidRenderSpy.callCount).to.equal(4);
    expect(dataDidRenderSpy.getCall(0).args[0]).to.deep.equal({ scalingIndex: 7 });
    expect(dataDidRenderSpy.getCall(1).args[0]).to.deep.equal({ scalingIndex: 7 });
    expect(dataDidRenderSpy.getCall(2).args[0]).to.deep.equal({ scalingIndex: 7 });
    expect(dataDidRenderSpy.getCall(3).args[0]).to.deep.equal({ scalingIndex: 5 });
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

  it('does not call onReduceData again when it returns undefined', () => {
    let mockData = { data: 'foo' };
    let onReduceDataStub = sinon.stub();
    onReduceDataStub.returns({});
    const onRenderDataMock = sinon.spy();

    let wrapper = mount<IResizeGroupProps, IResizeGroupState>(<ResizeGroup
      data={ mockData }
      onReduceData={ onReduceDataStub }
      onRenderData={ onRenderDataMock }
    />);

    let { rootGetClientRectMock, measuredGetClientRectMock } = getMeasurementMocks(wrapper);

    rootGetClientRectMock.returns({ width: 50 });
    measuredGetClientRectMock.returns({ width: 75 });

    let onRenderSpy = setRenderSpy(wrapper);
    // This test will always return that the measured contents don't fit in the root
    // The first onReduceData call returns some data, the second returns undefined.
    // There should not be additional calls to onReduceData after undefined is returned.
    onReduceDataStub.reset();
    onReduceDataStub.onFirstCall().returns(mockData);
    onReduceDataStub.onSecondCall().returns(undefined);

    wrapper.setState({
      shouldMeasure: true
    });

    // We'll render 3 times after attaching the render spy.
    // 1. Initial render from setting shouldMeasure
    // 2. Second render after reducing the data
    // 3. Third render to remove the measuring div after onReduce returns undefined
    expect(onRenderSpy.callCount).to.equal(3);
    expect(onReduceDataStub.callCount).to.equal(2);
    expect(wrapper.state().shouldMeasure).to.equal(false);
  });

  it('initially renders content even if it does not fit', () => {
    let data = { scalingIndex: 5 };

    // Simulate an onReduce data that has no more scaling operations
    let onReduceData = (_) => undefined;

    let { rootGetClientRectMock, measuredGetClientRectMock, wrapper } = getWrapperWithMocks(data, onReduceData);

    // Make sure the content never fits
    rootGetClientRectMock.returns({ width: 27 });
    measuredGetClientRectMock.returns({ width: 52 });

    // Reset the internal rendered state of the component
    wrapper.setState({
      shouldMeasure: true,
      renderedData: null
    });

    expect(wrapper.state().renderedData).to.deep.equal(data);
  });

  it('calls dataDidRender for the initial render', () => {
    const initialData = { content: 7 };
    const dataDidRender = sinon.spy();

    const wrapper = mount<IResizeGroupProps, IResizeGroupState>(
      <ResizeGroup
        data={ initialData }
        onReduceData={ onReduceScalingData }
        onRenderData={ sinon.spy() }
        dataDidRender={ dataDidRender }
      />
    );

    expect(dataDidRender.callCount).to.equal(1);
    expect(dataDidRender.getCall(0).args[0]).to.deep.equal(initialData);
  });
});
