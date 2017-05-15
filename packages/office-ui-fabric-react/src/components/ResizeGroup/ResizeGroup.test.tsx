import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ResizeGroup } from './ResizeGroup';
import * as sinon from 'sinon';

describe('ResizeGroup', () => {
  afterEach(() => {
    [].forEach.call(document.querySelectorAll('body > div'), div => div.parentNode.removeChild(div));

    expect(document.querySelector('.ms-ResizeGroup')).to.be.null;
  });

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

    const div = document.createElement('div');

    ReactDOM.render(<ResizeGroup
      data={ { a: 1 } }
      onReduceData={ onReduceData }
      onRenderData={ onRenderData }
    />, div);
    ReactDOM.render(<ResizeGroup
      data={ { a: 2 } }
      onReduceData={ onReduceData }
      onRenderData={ onRenderData }
    />, div);

    // onRenderData should get called to measure and to render when props are updated.
    expect(onRenderData.callCount).to.equal(4);

  });
});
