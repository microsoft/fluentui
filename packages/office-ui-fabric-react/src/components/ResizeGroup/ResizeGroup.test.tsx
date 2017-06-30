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

      let result = getNextResizeGroupState(resizeGroupProps,
        resizeGroupState,
        null);

      expect(result).to.equal(undefined);
    });
  });
});
