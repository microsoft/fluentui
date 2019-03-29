/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { CalloutContent } from './CalloutContent';
import { CalloutContentBase } from './CalloutContent.base';
import { mount } from 'enzyme';

describe('CalloutContentBase', () => {
  it('Ensure callout content updates when needed', () => {
    const renderMock = jest.spyOn(CalloutContentBase.prototype, 'render');
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    const props = {
      target: targetElement,
      hidden: true
    };

    const callout = mount(
      <CalloutContent {...props}>
        <div>Content</div>
      </CalloutContent>
    );

    expect(renderMock).toHaveBeenCalledTimes(1);

    // Updating content props while hidden should not
    // trigger a render update.
    callout.setProps({ ...props });
    expect(renderMock).toHaveBeenCalledTimes(1);

    // Showing content should trigger a render update.
    callout.setProps({ ...props, hidden: false });
    // We expect two more times because there is an extra update due to
    // positioning recalculation.
    expect(renderMock).toHaveBeenCalledTimes(3);
  });
});
