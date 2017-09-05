import * as React from 'react';
import { shallow } from 'enzyme';
const { expect } = chai;
import { ResizeGroup, IResizeGroupState, getNextResizeGroupStateProvider, getMeasurementCache } from './ResizeGroup';
import { IResizeGroupProps } from './ResizeGroup.Props';
import * as sinon from 'sinon';

interface ITestScalingData {
  scalingIndex: number;
}

function onReduceScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex - 1
  };
}

function getRequiredResizeGroupProps() {
  return {
    data: {},
    onReduceData: sinon.stub(),
    onRenderData: sinon.stub()
  };
}

describe('ResizeGroup', () => {
  it('renders the result of onRenderData', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
    const onRenderData = (data: any) => <div id={ renderedDataId }> Rendered data: { data.content }</div >;

    const wrapper = shallow<IResizeGroupProps, IResizeGroupState>(
      <ResizeGroup
        data={ initialData }
        onReduceData={ onReduceScalingData }
        onRenderData={ onRenderData }
      />
    );

    expect(wrapper.containsMatchingElement(onRenderData(initialData))).to.equal(true);
  });

  describe('getNextResizeGroupStateProvider', () => {
    it('does not provide a new state when there is no container width provided or data to measure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = {};
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub);

      expect(result).to.equal(undefined);
      expect(getMeasuredElementWidthStub.callCount).to.equal(0);
    });

    it('sets the renderedData when the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        50);

      expect(result).to.deep.equal({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
    });

    it('calls onReduceData and sets the next measuredData when contents do not fit', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.returns({ index: 4 });
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        10);

      expect(result).to.deep.equal({
        measureContainer: false,
        dataToMeasure: { index: 4 },
        resizeDirection: 'shrink'
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
    });

    it('does not call getMeasuredElementBounds when the data has already been cached', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      let measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        100);

      expect(result).to.deep.equal({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });

    it('calls onReduceData multiple times when everything is in the cache', () => {
      const dataArray = [{ cacheKey: '5' },
      { cacheKey: '4' },
      { cacheKey: '3' }];

      let measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      measurementCache.addMeasurementToCache(dataArray[2], 5);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.onFirstCall().returns(dataArray[1]);
      resizeGroupProps.onReduceData.onSecondCall().returns(dataArray[2]);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        10);

      expect(result).to.deep.equal({
        renderedData: dataArray[2],
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });

    it('sets dataToMeasure when the current data is in the cache but the onReduceData result is not in the cache', () => {
      const dataArray = [{ cacheKey: '5' },
      { cacheKey: '4' }];

      let measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.onFirstCall().returns(dataArray[1]);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        10);

      expect(result).to.deep.equal({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'shrink'
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });

    it('renders the last measured data if onReduceData returns undefined', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();

      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.returns(undefined);

      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;

      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        10);

      expect(result).to.deep.equal({
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        measureContainer: false,
        resizeDirection: undefined
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
    });

    it('renders the last measured data in the cache if onReduceData returns undefined', () => {
      const dataArray = [{ cacheKey: '5' },
      { cacheKey: '4' }];

      let measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.onFirstCall().returns(dataArray[1]);
      resizeGroupProps.onReduceData.onSecondCall().returns(undefined);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        10);

      expect(result).to.deep.equal({
        dataToMeasure: undefined,
        renderedData: dataArray[1],
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });

    it('does not crash when the container size is set and there is no dataToMeasure', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        {},
        getMeasuredElementWidthStub,
        50);

      expect(result).to.deep.equal({
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(0);
    });

    it('makes sure the contents still fit when the container width decreases', () => {
      const initialWidth = 50;
      const reducedWidth = 40;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps,
        {},
        sinon.stub(),
        initialWidth);

      // Pass in a state that reflects some rendered data
      let currentState = {
        renderedData: renderedData
      };

      let result = getNextResizeGroupState(resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        reducedWidth);

      // Important to note that we do not start scaling from the initial data,
      // we continue from the last rendered data.
      expect(result).to.deep.equal({
        renderedData: renderedData,
        dataToMeasure: renderedData,
        measureContainer: false,
        resizeDirection: 'shrink'
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(0);
    });

    it('starts from the beginning when the container width increases and there is no onGrowData', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' } };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps,
        {},
        sinon.stub(),
        initialWidth);

      // Pass in a state that reflects some rendered data
      let currentState = {
        renderedData: renderedData
      };

      let result = getNextResizeGroupState(resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth);

      expect(result).to.deep.equal({
        renderedData: renderedData,
        dataToMeasure: resizeGroupProps.data,
        resizeDirection: 'shrink',
        measureContainer: false
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(0);
    });

    it('renders contents when the resizeDirection is grow, there is no onGrowData, and the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        50);

      expect(result).to.deep.equal({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
    });

    it('sets the resize direction to shrink when the resizeDirection is grow, contents do not fit, and there is no onGrowData', () => {
      const dataToMeasure = { index: 8 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.returns({ index: 7 });
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(100);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        72);

      expect(result).to.deep.equal({
        measureContainer: false,
        dataToMeasure: { index: 7 },
        resizeDirection: 'shrink'
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
      expect(resizeGroupProps.onReduceData.callCount).to.equal(1);
    });

    it('measures the next state when the resizeDirection is grow and the dataToMeasure fits', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = sinon.stub();
      onGrowData.returns({ index: 2 });
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        50);

      expect(result).to.deep.equal({
        measureContainer: false,
        dataToMeasure: { index: 2 },
        resizeDirection: 'grow'
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
      expect(onGrowData.callCount).to.equal(1);
    });

    it('sets the resizeDirection to shrink after determining contents do not fit when the resize direction is grow', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = sinon.stub();
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(75);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        40);

      expect(result).to.deep.equal({
        measureContainer: false,
        dataToMeasure,
        resizeDirection: 'shrink'
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
      expect(onGrowData.callCount).to.equal(0);
      expect(resizeGroupProps.onReduceData.callCount).to.equal(0);
    });

    it('renders the last measured contents when onGrowData returns undefined', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = sinon.stub();
      onGrowData.returns(undefined);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        getMeasuredElementWidthStub,
        40);

      expect(result).to.deep.equal({
        measureContainer: false,
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        resizeDirection: undefined
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(1);
      expect(onGrowData.callCount).to.equal(1);
      expect(resizeGroupProps.onReduceData.callCount).to.equal(0);
    });

    it('calls onGrowData when the container width increases and onGrowData is provided', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { index: 3 };
      const onGrowData = sinon.stub();
      onGrowData.returns({ index: 4 });
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' }, onGrowData };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps,
        {},
        sinon.stub(),
        initialWidth);

      // Pass in a state that reflects some rendered data
      let currentState = {
        renderedData: renderedData
      };

      let result = getNextResizeGroupState(resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth);

      expect(result).to.deep.equal({
        renderedData: renderedData,
        dataToMeasure: { index: 4 },
        resizeDirection: 'grow',
        measureContainer: false
      });
      expect(getMeasuredElementWidthStub.callCount).to.equal(0);
      expect(onGrowData.callCount).to.equal(1);
    });

    it('does not call getMeasuredElementBounds when the data has already been cached in the grow resizeDirection', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = sinon.stub();
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        100);

      expect(result).to.deep.equal({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });

    it('calls onGrowData multiple times when everything is in the cache in the grow resizeDirection', () => {
      const dataArray = [{ cacheKey: '5' },
      { cacheKey: '6' },
      { cacheKey: '7' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 70);
      measurementCache.addMeasurementToCache(dataArray[2], 150);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = sinon.stub();
      onGrowData.onFirstCall().returns(dataArray[1]);
      onGrowData.onSecondCall().returns(dataArray[2]);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        100);

      expect(result).to.deep.equal({
        measureContainer: false,
        dataToMeasure: dataArray[2],
        resizeDirection: 'shrink'
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });

    it('sets dataToMeasure when the current data is in the cache but the onGrowData result is not in the cache in the grow resizeDirection', () => {
      const dataArray = [{ cacheKey: '5' },
      { cacheKey: '6' }];

      let measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = sinon.stub();
      onGrowData.onFirstCall().returns(dataArray[1]);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementWidthStub,
        100);

      expect(result).to.deep.equal({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'grow'
      });
      expect(measuredElementWidthStub.callCount).to.equal(0);
    });
  });

  it('does not clear out the rendered contents when setting a new dataToMeasure', () => {
    const initialWidth = 50;
    const renderedData = { index: 4 };
    const resizeGroupProps = getRequiredResizeGroupProps();
    const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
    const getMeasuredElementWidthStub = sinon.stub();
    getMeasuredElementWidthStub.returns(100);

    // Set the initial window width
    getNextResizeGroupState(resizeGroupProps,
      {},
      sinon.stub(),
      initialWidth);

    // Pass in a state that reflects some rendered data
    let currentState: IResizeGroupState = {
      renderedData: renderedData,
      dataToMeasure: { index: 8 },
      resizeDirection: 'grow'
    };

    resizeGroupProps.onReduceData.returns({ index: 7 });

    let result = getNextResizeGroupState(resizeGroupProps,
      currentState,
      getMeasuredElementWidthStub,
      initialWidth);

    // Important to note that we do not start scaling from the initial data,
    // we continue from the last rendered data.
    expect(result).to.deep.equal({
      renderedData: renderedData,
      dataToMeasure: { index: 7 },
      measureContainer: false,
      resizeDirection: 'shrink'
    });
    expect(getMeasuredElementWidthStub.callCount).to.equal(1);
    expect(resizeGroupProps.onReduceData.callCount).to.equal(1);
  });

  it('does not render to the hidden div when there is no dataToMeasure', () => {
    const resizeGroupStateProvider = getNextResizeGroupStateProvider();

    let result = resizeGroupStateProvider.shouldRenderDataToMeasureInHiddenDiv(undefined);

    expect(result).to.equal(false);
  });

  it('does render to the hidden div when there is dataToMeasure', () => {
    const resizeGroupStateProvider = getNextResizeGroupStateProvider();

    let result = resizeGroupStateProvider.shouldRenderDataToMeasureInHiddenDiv({ index: 18 });

    expect(result).to.equal(true);
  });

  it('does not render to the hidden div when there is dataToMeasure that is in the cache', () => {
    let data = { index: 8, cacheKey: 'myCoolCacheKey' };
    const measurementCache = getMeasurementCache();
    measurementCache.addMeasurementToCache(data, 12);
    const resizeGroupStateProvider = getNextResizeGroupStateProvider(measurementCache);

    let result = resizeGroupStateProvider.shouldRenderDataToMeasureInHiddenDiv(data);

    expect(result).to.equal(false);
  });
});
