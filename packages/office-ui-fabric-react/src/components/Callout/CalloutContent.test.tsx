/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { CalloutContentBase } from './CalloutContent.base';
import { mount } from 'enzyme';
import { Rectangle } from 'office-ui-fabric-react/lib/utilities/positioning';

describe('CalloutContentBase', () => {
  it('Ensure callout content updates when needed', () => {
    const renderMock = jest.spyOn(CalloutContentBase.prototype, 'render');
    const targetElement1 = document.createElement('div');
    const targetElement2 = document.createElement('div');
    document.body.appendChild(targetElement1);
    document.body.appendChild(targetElement2);
    const props = {
      target: targetElement1,
      hidden: true
    };

    const callout = mount(
      <CalloutContentBase {...props}>
        <div>Content</div>
      </CalloutContentBase>
    );

    expect(renderMock).toHaveBeenCalled();
    renderMock.mockClear();

    // Updating content props while hidden should not
    // trigger a render update.
    callout.setProps({ target: targetElement2, hidden: true });
    expect(renderMock).not.toHaveBeenCalled();
    renderMock.mockClear();

    // Showing content should trigger a render update.
    callout.setProps({ target: targetElement2, hidden: false });
    expect(renderMock).toHaveBeenCalled();
    renderMock.mockClear();

    callout.setProps({
      target: targetElement2,
      hidden: true
    });

    // Updating content should trigger a render update.
    // even when hidden when shouldUpdateWhenHidden is true.
    callout.setProps({
      target: targetElement1,
      hidden: true,
      shouldUpdateWhenHidden: true
    });
    expect(renderMock).toHaveBeenCalled();
    renderMock.mockClear();
  });

  it('Ensure callout content does not update when props are shallow equal', () => {
    const renderMock = jest.spyOn(CalloutContentBase.prototype, 'render');
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    const props = {
      target: targetElement,
      backgroundColor: '#ffffff',
      bounds: new Rectangle(0, 0, 0, 0),
      onLayerMounted: () => {
        return;
      }
    };

    const callout = mount(
      <CalloutContentBase {...props}>
        <div>Content</div>
      </CalloutContentBase>
    );

    expect(renderMock).toHaveBeenCalled();
    renderMock.mockClear();

    // Shallow updating props should not trigger another update
    callout.setProps({ ...props });
    expect(renderMock).not.toHaveBeenCalled();
    renderMock.mockClear();
  });

  it('Ensure callout content updates when props are not shallow equal', () => {
    const renderMock = jest.spyOn(CalloutContentBase.prototype, 'render');
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    const props = {
      target: targetElement,
      backgroundColor: '#ffffff',
      bounds: new Rectangle(0, 0, 0, 0),
      onLayerMounted: () => {
        return;
      }
    };

    const callout = mount(
      <CalloutContentBase {...props}>
        <div>Content</div>
      </CalloutContentBase>
    );

    expect(renderMock).toHaveBeenCalled();
    renderMock.mockClear();

    callout.setProps({ ...props, bounds: new Rectangle(0, 0, 0, 0) });
    expect(renderMock).toHaveBeenCalled();
    renderMock.mockClear();
  });
});
