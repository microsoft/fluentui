import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import { ResizeGroup, IResizeGroupState, getNextResizeGroupStateProvider } from './ResizeGroup';
import { IResizeGroupProps } from './ResizeGroup.Props';
import * as sinon from 'sinon';

function getRequiredResizeGroupProps(): IResizeGroupProps {
  return {
    onReduceData: sinon.spy(),
    onRenderData: sinon.spy()
  };
}

describe('ResizeGroup', () => {
  describe('getNextResizeGroupStateProvider', () => {
    it('does not provide a new state when there is no container width provided or data to measure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = {};
      const getNextResizeGroupState = getNextResizeGroupStateProvider();
      const measuredElementBoundsStub = sinon.stub();

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementBoundsStub);

      expect(result).to.equal(undefined);
      expect(measuredElementBoundsStub.callCount).to.equal(0);
    });
    it('sets the renderedData when the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure };
      const getNextResizeGroupState = getNextResizeGroupStateProvider();
      const measuredElementBoundsStub = sinon.stub();
      measuredElementBoundsStub.returns(25);

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        measuredElementBoundsStub,
        50);

      expect(result).to.equal({ renderedData: dataToMeasure });
      expect(measuredElementBoundsStub.callCount).to.equal(1);
    });
  });
});
