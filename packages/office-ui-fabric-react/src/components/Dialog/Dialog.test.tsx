/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

let { expect } = chai;
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

    expect(document.querySelector('[role="dialog"]')).to.not.be.null;
    wrapper.setProps({ hidden: true });
    wrapper.update();

    // give time for update to complete
    setTimeout(() => {
      try {
        expect(document.querySelector('[role="dialog"]')).to.be.null;
        expect(dismissedCalled).to.be.true;
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
    expect(dialogHTML).to.not.be.null;
    expect(dialogHTML!.getAttribute('aria-labelledby')).to.match(/Dialog[\d+]+-title/, 'aria label should match the pattern');
    expect(dialogHTML!.getAttribute('aria-describedby')).to.match(/Dialog[\d+]+-subText/, 'aria describeby should match the pattern');
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
    expect(dialogHTML).to.not.be.null;
    expect(dialogHTML!.getAttribute('aria-labelledby')).to.match(/Dialog[\d+]+-title/, 'aria label should match the pattern');
    expect(dialogHTML!.getAttribute('aria-describedby')).equals(subTextAriaId, 'aria describeby should match the pattern');
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
    expect(dialogHTML).to.not.be.null;
    expect(dialogHTML!.getAttribute('aria-labelledby')).equals(titleAriaId, 'aria label should match the pattern');
    expect(dialogHTML!.getAttribute('aria-describedby')).to.match(/Dialog[\d+]+-subText/, 'aria describeby should match the pattern');
    wrapper.unmount();
  });
});