import * as React from 'react';
import { shallow } from 'enzyme';
const { expect } = chai;
import { OverflowSet } from './OverflowSet';
import * as sinon from 'sinon';

describe('OverflowSet', () => {
  it('does not render overflow when there are no overflow items', () => {
    const onRenderItem = sinon.spy();
    const onRenderOverflowButton = sinon.spy();
    const wrapper = shallow(<OverflowSet onRenderItem={ onRenderItem } onRenderOverflowButton={ onRenderOverflowButton } />);

    expect(onRenderOverflowButton.called).to.equal(false);
  });

  it('does not render overflow when overflow items is an empty array', () => {
    const onRenderItem = sinon.spy();
    const onRenderOverflowButton = sinon.spy();
    const wrapper = shallow(<OverflowSet onRenderItem={ onRenderItem } onRenderOverflowButton={ onRenderOverflowButton } overflowItems={ [] } />);

    expect(onRenderOverflowButton.called).to.equal(false);
  });
});
