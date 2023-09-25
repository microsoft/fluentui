import * as React from 'react';
import { mount } from 'enzyme';
import { ResizeGroup } from './ResizeGroup';
import { getNextResizeGroupStateProvider, getMeasurementCache } from './ResizeGroup.base';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../common/isConformant';
import type { IResizeGroupState } from './ResizeGroup.base';

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

function getRequiredResizeGroupProps() {
  return {
    data: {},
    onReduceData: jest.fn(),
    onRenderData: jest.fn(),
  };
}

describe('ResizeGroup', () => {
  it('renders the ResizeGroup correctly', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
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

  isConformant({
    Component: ResizeGroup,
    displayName: 'ResizeGroup',
    requiredProps: {
      data: { content: 5 },
      onRenderData: () => <div />,
      onReduceData: onReduceScalingData,
    },
  });

  it('renders the result of onRenderData', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
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
      const getMeasuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub);

      expect(result).toEqual(undefined);
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('sets the renderedData when the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    it('calls onReduceData and sets the next measuredData when contents do not fit', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.mockReturnValue({ index: 4 });
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 10);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 4 },
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    it('does not call getMeasuredElementBounds when the data has already been cached', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('calls onReduceData multiple times when everything is in the cache', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }, { cacheKey: '3' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      measurementCache.addMeasurementToCache(dataArray[2], 5);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      let callCount = 0;
      resizeGroupProps.onReduceData = jest.fn(() => {
        callCount++;
        return callCount === 1 ? dataArray[1] : dataArray[2];
      });

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        renderedData: dataArray[2],
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('sets dataToMeasure when the current data is cached but the onReduceData result is not cached', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.mockReturnValueOnce(dataArray[1]);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'shrink',
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('renders the last measured data if onReduceData returns undefined', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();

      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.mockReturnValue(undefined);

      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;

      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    it('renders the last measured data in the cache if onReduceData returns undefined', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      let callCount = 0;
      resizeGroupProps.onReduceData = jest.fn(() => {
        callCount++;
        return callCount === 1 ? dataArray[1] : undefined;
      });

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: undefined,
        renderedData: dataArray[1],
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('does not crash when the container size is set and there is no dataToMeasure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, {}, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('makes sure the contents still fit when the container width decreases', () => {
      const initialWidth = 50;
      const reducedWidth = 40;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData,
      };

      const result = getNextResizeGroupState(resizeGroupProps, currentState, getMeasuredElementWidthStub, reducedWidth);

      // Important to note that we do not start scaling from the initial data,
      // we continue from the last rendered data.
      expect(result).toEqual({
        renderedData,
        dataToMeasure: renderedData,
        measureContainer: false,
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('starts from the beginning when the container width increases and there is no onGrowData', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' } };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData,
      };

      const result = getNextResizeGroupState(
        resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth,
      );

      expect(result).toEqual({
        renderedData,
        dataToMeasure: resizeGroupProps.data,
        resizeDirection: 'shrink',
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('renders contents when the resizeDirection is grow, there is no onGrowData, and the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line @fluentui/max-len
    it('sets resize direction to shrink when resizeDirection is grow, contents do not fit, and there is no onGrowData', () => {
      const dataToMeasure = { index: 8 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.mockReturnValue({ index: 7 });
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(100);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 72);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 7 },
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
      expect(resizeGroupProps.onReduceData).toHaveBeenCalledTimes(1);
    });

    it('measures the next state when the resizeDirection is grow and the dataToMeasure fits', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = jest.fn();
      onGrowData.mockReturnValue({ index: 2 });
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 2 },
        resizeDirection: 'grow',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
      expect(onGrowData).toHaveBeenCalledTimes(1);
    });

    it('renders the last measured contents when onGrowData returns undefined', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = jest.fn();
      onGrowData.mockReturnValue(undefined);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 40);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
      expect(onGrowData).toHaveBeenCalledTimes(1);
      expect(resizeGroupProps.onReduceData).toHaveBeenCalledTimes(0);
    });

    it('calls onGrowData when the container width increases and onGrowData is provided', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { index: 3 };
      const onGrowData = jest.fn();
      onGrowData.mockReturnValue({ index: 4 });
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' }, onGrowData };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData,
      };

      const result = getNextResizeGroupState(
        resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth,
      );

      expect(result).toEqual({
        renderedData,
        dataToMeasure: { index: 4 },
        resizeDirection: 'grow',
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
      expect(onGrowData).toHaveBeenCalledTimes(1);
    });

    it('does not call getMeasuredElementBounds when data has already been cached in the grow resizeDirection', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = jest.fn();
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
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
      const measuredElementWidthStub = jest.fn();

      const result = stateProvider.getNextState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        measureContainer: false,
        renderedData: dataArray[2],
        dataToMeasure: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it(`sets dataToMeasure when the current data is in the cache but the onGrowData result is not in the cache
      in the grow resizeDirection`, () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '6' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = jest.fn();
      onGrowData.mockReturnValueOnce(dataArray[1]);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'grow',
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });
  });

  it('does not clear out the rendered contents when setting a new dataToMeasure', () => {
    const initialWidth = 50;
    const renderedData = { index: 4 };
    const resizeGroupProps = getRequiredResizeGroupProps();
    const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
    const getMeasuredElementWidthStub = jest.fn();
    getMeasuredElementWidthStub.mockReturnValue(100);

    // Set the initial window width
    getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

    // Pass in a state that reflects some rendered data
    const currentState: IResizeGroupState = {
      renderedData,
      dataToMeasure: { index: 8 },
      resizeDirection: 'grow',
    };

    resizeGroupProps.onReduceData.mockReturnValue({ index: 7 });

    const result = getNextResizeGroupState(resizeGroupProps, currentState, getMeasuredElementWidthStub, initialWidth);

    // Important to note that we do not start scaling from the initial data,
    // we continue from the last rendered data.
    expect(result).toEqual({
      renderedData,
      dataToMeasure: { index: 7 },
      measureContainer: false,
      resizeDirection: 'shrink',
    });
    expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    expect(resizeGroupProps.onReduceData).toHaveBeenCalledTimes(1);
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
      onRenderData: jest.fn(),
    };

    const stateProvider = getNextResizeGroupStateProvider();

    const initialState = stateProvider.getInitialResizeGroupState(props.data);

    const getElementToMeasureWidth = () => 100;
    const containerWidth = 75;

    const nextState = stateProvider.getNextState(props, initialState, getElementToMeasureWidth, containerWidth);

    expect(nextState!.dataToMeasure.scalingIndex).toEqual(7);
  });
});
