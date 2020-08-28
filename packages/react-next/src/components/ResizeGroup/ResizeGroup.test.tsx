import * as React from 'react';
import { mount } from 'enzyme';
import { ResizeGroup } from './ResizeGroup';
import { IResizeGroupState, getNextResizeGroupStateProvider, getMeasurementCache } from './ResizeGroup.base';
import * as sinon from 'sinon';
import * as renderer from 'react-test-renderer';

interface ITestScalingData {
  scalingIndex: number;
  cacheKey?: string;
}

function onReduceScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex - 1,
  };
}

function onGrowScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex + 1,
  };
}

function getRequiredResizeGroupProps(): { data: {}; onReduceData: sinon.SinonStub; onRenderData: sinon.SinonStub } {
  return {
    data: {},
    onReduceData: sinon.stub(),
    onRenderData: sinon.stub(),
  };
}

describe('ResizeGroup', () => {
  it('renders the ResizeGroup correctly', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onRenderData = (data: any) => <div id={renderedDataId}> Rendered data: {data.content}</div>;
    expect(
      renderer
        .create(
          <ResizeGroup
            data={initialData}
            onReduceData={onReduceScalingData}
            onRenderData={onRenderData}
            className={'TestClassName'}
          />,
        )
        .toJSON(),
    ).toMatchSnapshot();
  });

  it('renders the result of onRenderData', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onRenderData = (data: any) => <div id={renderedDataId}> Rendered data: {data.content}</div>;

    const wrapper = mount(
      <ResizeGroup data={initialData} onReduceData={onReduceScalingData} onRenderData={onRenderData} />,
    );

    expect(wrapper.find('#' + renderedDataId).length).toEqual(1);
  });

  describe('getNextResizeGroupStateProvider', () => {
    it('does not provide a new state when there is no container width provided or data to measure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = {};
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub);

      expect(result).toEqual(undefined);
      expect(getMeasuredElementWidthStub.callCount).toEqual(0);
    });

    it('sets the renderedData when the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
    });

    it('calls onReduceData and sets the next measuredData when contents do not fit', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.returns({ index: 4 });
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 10);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 4 },
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
    });

    it('does not call getMeasuredElementBounds when the data has already been cached', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
    });

    it('calls onReduceData multiple times when everything is in the cache', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }, { cacheKey: '3' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      measurementCache.addMeasurementToCache(dataArray[2], 5);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.onFirstCall().returns(dataArray[1]);
      resizeGroupProps.onReduceData.onSecondCall().returns(dataArray[2]);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        renderedData: dataArray[2],
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
    });

    it('sets dataToMeasure when the current data is cached but the onReduceData result is not cached', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.onFirstCall().returns(dataArray[1]);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'shrink',
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
    });

    it('renders the last measured data if onReduceData returns undefined', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();

      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.returns(undefined);

      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;

      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
    });

    it('renders the last measured data in the cache if onReduceData returns undefined', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.onFirstCall().returns(dataArray[1]);
      resizeGroupProps.onReduceData.onSecondCall().returns(undefined);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: undefined,
        renderedData: dataArray[1],
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
    });

    it('does not crash when the container size is set and there is no dataToMeasure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, {}, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(0);
    });

    it('makes sure the contents still fit when the container width decreases', () => {
      const initialWidth = 50;
      const reducedWidth = 40;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, sinon.stub(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData: renderedData,
      };

      const result = getNextResizeGroupState(resizeGroupProps, currentState, getMeasuredElementWidthStub, reducedWidth);

      // Important to note that we do not start scaling from the initial data,
      // we continue from the last rendered data.
      expect(result).toEqual({
        renderedData: renderedData,
        dataToMeasure: renderedData,
        measureContainer: false,
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(0);
    });

    it('starts from the beginning when the container width increases and there is no onGrowData', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' } };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, sinon.stub(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData: renderedData,
      };

      const result = getNextResizeGroupState(
        resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth,
      );

      expect(result).toEqual({
        renderedData: renderedData,
        dataToMeasure: resizeGroupProps.data,
        resizeDirection: 'shrink',
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(0);
    });

    it('renders contents when the resizeDirection is grow, there is no onGrowData, and the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
    });

    // eslint-disable-next-line @fluentui/max-len
    it('sets resize direction to shrink when resizeDirection is grow, contents do not fit, and there is no onGrowData', () => {
      const dataToMeasure = { index: 8 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.returns({ index: 7 });
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = sinon.stub();
      getMeasuredElementWidthStub.returns(100);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 72);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 7 },
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
      expect(resizeGroupProps.onReduceData.callCount).toEqual(1);
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

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 2 },
        resizeDirection: 'grow',
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
      expect(onGrowData.callCount).toEqual(1);
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

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 40);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(1);
      expect(onGrowData.callCount).toEqual(1);
      expect(resizeGroupProps.onReduceData.callCount).toEqual(0);
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
      getNextResizeGroupState(resizeGroupProps, {}, sinon.stub(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData: renderedData,
      };

      const result = getNextResizeGroupState(
        resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth,
      );

      expect(result).toEqual({
        renderedData: renderedData,
        dataToMeasure: { index: 4 },
        resizeDirection: 'grow',
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub.callCount).toEqual(0);
      expect(onGrowData.callCount).toEqual(1);
    });

    it('does not call getMeasuredElementBounds when data has already been cached in the grow resizeDirection', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = sinon.stub();
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const measuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
    });

    it('calls onGrowData multiple times when everything is in the cache in the grow resizeDirection', () => {
      const dataArray: ITestScalingData[] = [
        { scalingIndex: 0, cacheKey: '0' },
        { scalingIndex: 1, cacheKey: '1' },
        { scalingIndex: 2, cacheKey: '2' },
        { scalingIndex: 3, cacheKey: '3' },
      ];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 70);
      measurementCache.addMeasurementToCache(dataArray[2], 80);
      measurementCache.addMeasurementToCache(dataArray[3], 150);
      const stateProvider = getNextResizeGroupStateProvider(measurementCache);

      const resizeGroupProps = {
        ...getRequiredResizeGroupProps(),
        onGrowData: (data: ITestScalingData) => dataArray[data.scalingIndex + 1],
        onReduceData: (data: ITestScalingData) => dataArray[data.scalingIndex - 1],
      };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = sinon.stub();

      const result = stateProvider.getNextState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        measureContainer: false,
        renderedData: dataArray[2],
        dataToMeasure: undefined,
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
    });

    it(`sets dataToMeasure when the current data is in the cache but the onGrowData result is not in the cache
      in the grow resizeDirection`, () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '6' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = sinon.stub();
      onGrowData.onFirstCall().returns(dataArray[1]);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = sinon.stub();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'grow',
      });
      expect(measuredElementWidthStub.callCount).toEqual(0);
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
    getNextResizeGroupState(resizeGroupProps, {}, sinon.stub(), initialWidth);

    // Pass in a state that reflects some rendered data
    const currentState: IResizeGroupState = {
      renderedData: renderedData,
      dataToMeasure: { index: 8 },
      resizeDirection: 'grow',
    };

    resizeGroupProps.onReduceData.returns({ index: 7 });

    const result = getNextResizeGroupState(resizeGroupProps, currentState, getMeasuredElementWidthStub, initialWidth);

    // Important to note that we do not start scaling from the initial data,
    // we continue from the last rendered data.
    expect(result).toEqual({
      renderedData: renderedData,
      dataToMeasure: { index: 7 },
      measureContainer: false,
      resizeDirection: 'shrink',
    });
    expect(getMeasuredElementWidthStub.callCount).toEqual(1);
    expect(resizeGroupProps.onReduceData.callCount).toEqual(1);
  });

  it('does not render to the hidden div when there is no dataToMeasure', () => {
    const resizeGroupStateProvider = getNextResizeGroupStateProvider();

    const result = resizeGroupStateProvider.shouldRenderDataForMeasurement(undefined);

    expect(result).toEqual(false);
  });

  it('does render to the hidden div when there is dataToMeasure', () => {
    const resizeGroupStateProvider = getNextResizeGroupStateProvider();

    const result = resizeGroupStateProvider.shouldRenderDataForMeasurement({ index: 18 });

    expect(result).toEqual(true);
  });

  it('does not render to the hidden div when there is dataToMeasure that is in the cache', () => {
    const data = { index: 8, cacheKey: 'myCoolCacheKey' };
    const measurementCache = getMeasurementCache();
    measurementCache.addMeasurementToCache(data, 12);
    const resizeGroupStateProvider = getNextResizeGroupStateProvider(measurementCache);

    const result = resizeGroupStateProvider.shouldRenderDataForMeasurement(data);

    expect(result).toEqual(false);
  });

  it('it tries to measure smaller data when contents do not fit on initial measure and onGrowData is provided', () => {
    const props = {
      data: { scalingIndex: 8 },
      onReduceData: onReduceScalingData,
      onGrowData: onGrowScalingData,
      onRenderData: sinon.stub(),
    };

    const stateProvider = getNextResizeGroupStateProvider();

    const initialState = stateProvider.getInitialResizeGroupState(props.data);

    const getElementToMeasureWidth = () => 100;
    const containerWidth = 75;

    const nextState = stateProvider.getNextState(props, initialState, getElementToMeasureWidth, containerWidth);

    expect(nextState!.dataToMeasure.scalingIndex).toEqual(7);
  });
});
