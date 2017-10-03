/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { mount } from 'enzyme';

import { Dialog } from './Dialog';
import { DialogType } from './DialogContent.Props';

/* tslint:disable:no-unused-expression */// for express fluent assertions

describe('Dialog', () => {
  it('Fires dismissed after closing', (done) => {
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };

    const wrapper = mount(
      <Dialog
        hidden={ false }
        modalProps={ { onDismissed: handleDismissed } }
      />
    );

    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    wrapper.setProps({ hidden: true });
    wrapper.update();

    // give time for update to complete
    setTimeout(() => {
      try {
        expect(document.querySelector('[role="dialog"]')).toBeNull();
        expect(dismissedCalled).toEqual(true);
      } catch (e) {
        done(e);
      }
      wrapper.unmount();
      done();
    }, 300);
  });

  it('Properly attaches auto-generated aria attributes IDs', () => {
    const wrapper = mount(
      <Dialog
        hidden={ false }
        modalProps={ { onDismissed: () => {/* no-op */ } } }
        dialogContentProps={ {
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext'
        } }
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
      <Dialog
        hidden={ false }
        modalProps={ {
          onDismissed: () => {/* no-op */ },
          subtitleAriaId: subTextAriaId,
        } }
        dialogContentProps={ {
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext'
        } }
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
      <Dialog
        hidden={ false }
        modalProps={ {
          onDismissed: () => {/* no-op */ },
          titleAriaId: titleAriaId,
        } }
        dialogContentProps={ {
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext'
        } }
      />
    );

    const dialogHTML = document.querySelector('[role="dialog"]');
    expect(dialogHTML).not.toBeNull();
    expect(dialogHTML!.getAttribute('aria-labelledby')).toEqual(titleAriaId);
    expect(dialogHTML!.getAttribute('aria-describedby')).toMatch(/Dialog[\d+]+-subText/);
    wrapper.unmount();
  });
});