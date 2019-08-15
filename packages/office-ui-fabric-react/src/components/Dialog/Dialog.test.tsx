import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { mount } from 'enzyme';
import { DialogBase } from './Dialog.base';
import { DialogContent } from './DialogContent';
import { DialogType } from './DialogContent.types'; // for express fluent assertions

describe('Dialog', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Dialog correctly', () => {
    const component = renderer.create(<DialogContent />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Dialog with a jsx title', () => {
    const component = renderer.create(
      <DialogContent
        type={DialogType.normal}
        title={
          <div>
            <span>I am span 1</span>
            <span>I am span 2</span>
          </div>
        }
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Fires dismissed after closing', () => {
    jest.useFakeTimers();
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const wrapper = mount(<DialogBase hidden={false} modalProps={{ onDismissed: handleDismissed }} />);

    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    wrapper.setProps({ hidden: true });
    wrapper.update();

    jest.runAllTimers();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(dismissedCalled).toEqual(true);
    wrapper.unmount();
  });

  it('Properly attaches auto-generated aria attributes IDs', () => {
    const wrapper = mount(
      <DialogBase
        hidden={false}
        modalProps={{
          onDismissed: () => {
            /* no-op */
          }
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext'
        }}
      />
    );

    const dialogHTML = document.querySelector('[role="dialog"]');
    expect(dialogHTML).not.toBeNull();
    expect(dialogHTML!.getAttribute('aria-labelledby')).toMatch(/Dialog[\d+]+-title/);
    expect(dialogHTML!.getAttribute('aria-describedby')).toMatch(/Dialog[\d+]+-subText/);
    wrapper.unmount();
  });

  it('Properly attaches IDs when aria-describedby is passed', () => {
    const subTextAriaId = 'subtextariaid';
    const wrapper = mount(
      <DialogBase
        hidden={false}
        modalProps={{
          onDismissed: () => {
            /* no-op */
          },
          subtitleAriaId: subTextAriaId
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext'
        }}
      />
    );

    const dialogHTML = document.querySelector('[role="dialog"]');
    expect(dialogHTML).not.toBeNull();
    expect(dialogHTML!.getAttribute('aria-labelledby')).toMatch(/Dialog[\d+]+-title/);
    expect(dialogHTML!.getAttribute('aria-describedby')).toEqual(subTextAriaId);
    wrapper.unmount();
  });

  it('Properly attaches IDs when aria-labelledby is passed', () => {
    const titleAriaId = 'titleariaid';
    const wrapper = mount(
      <DialogBase
        hidden={false}
        modalProps={{
          onDismissed: () => {
            /* no-op */
          },
          titleAriaId: titleAriaId
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext'
        }}
      />
    );

    const dialogHTML = document.querySelector('[role="dialog"]');
    expect(dialogHTML).not.toBeNull();
    expect(dialogHTML!.getAttribute('aria-labelledby')).toEqual(titleAriaId);
    expect(dialogHTML!.getAttribute('aria-describedby')).toMatch(/Dialog[\d+]+-subText/);
    wrapper.unmount();
  });
});
