import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { mount } from 'enzyme';
import { Dialog } from './Dialog';
import { DialogBase } from './Dialog.base';
import { DialogContent } from './DialogContent';
import { DialogType } from './DialogContent.types'; // for express fluent assertions
import { setWarningCallback } from '@uifabric/utilities';
import { isConformant } from '../../common/isConformant';

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
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders DialogContent with titleProps', () => {
    const component = renderer.create(
      <DialogContent
        type={DialogType.normal}
        title="sample title"
        subText="Sample subtext"
        titleProps={{
          className: 'title_class',
          'aria-level': 3,
          title: 'tooltip',
        }}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
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

  it('deprecated isOpen controls open state of the dialog', () => {
    setWarningCallback(() => {
      /* suppress deprecation warning as error */
    });

    jest.useFakeTimers();
    let dismissedCalled = false;

    const handleDismissed = () => {
      dismissedCalled = true;
    };
    const wrapper = mount(<DialogBase isOpen={true} modalProps={{ onDismissed: handleDismissed }} />);

    expect(document.querySelector('[role="dialog"]')).not.toBeNull();
    wrapper.setProps({ isOpen: false });
    wrapper.update();

    jest.runAllTimers();
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(dismissedCalled).toEqual(true);
    wrapper.unmount();

    setWarningCallback();
  });

  it('Properly attaches auto-generated aria attributes IDs', () => {
    const wrapper = mount(
      <DialogBase
        hidden={false}
        modalProps={{
          onDismissed: () => {
            /* no-op */
          },
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext',
          titleProps: { 'aria-level': 3 },
        }}
      />,
    );

    const dialogHTML = document.querySelector('[role="dialog"]');
    expect(dialogHTML).not.toBeNull();

    const labelledby = dialogHTML!.getAttribute('aria-labelledby');
    expect(labelledby).toMatch(/Dialog[\d+]+-title/);
    expect(document.getElementById(labelledby!)).not.toBeNull();

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
          subtitleAriaId: subTextAriaId,
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext',
        }}
      />,
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
          titleAriaId: titleAriaId,
        }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'sample title',
          subText: 'Sample subtext',
        }}
      />,
    );

    const dialogHTML = document.querySelector('[role="dialog"]');
    expect(dialogHTML).not.toBeNull();
    expect(dialogHTML!.getAttribute('aria-labelledby')).toEqual(titleAriaId);
    expect(dialogHTML!.getAttribute('aria-describedby')).toMatch(/Dialog[\d+]+-subText/);
    wrapper.unmount();
  });

  describe('Dialog Title Id', () => {
    beforeEach(() => {
      // Prevent warn deprecations from failing test
      setWarningCallback(() => {
        /* no-op */
      });
    });

    afterEach(() => setWarningCallback());

    it('deprecated titleId prop should be set if titleProps.id is not passed', () => {
      const titleId = 'title_id';
      const wrapper = mount(
        <DialogBase
          hidden={false}
          dialogContentProps={{
            titleId,
            type: DialogType.normal,
            title: 'sample title',
          }}
        />,
      );

      const dialogTitle = document.getElementById(titleId);
      expect(dialogTitle).not.toBeNull();
      wrapper.unmount();
    });

    it('deprecated titleId prop should not be set if titleProps.id is undefined', () => {
      const titleId = 'title_id';
      const wrapper = mount(
        <DialogBase
          hidden={false}
          dialogContentProps={{
            titleId,
            type: DialogType.normal,
            title: 'sample title',
            titleProps: { id: undefined },
          }}
        />,
      );

      const dialogTitle = document.getElementById(titleId);
      expect(dialogTitle).toBeNull();
      wrapper.unmount();
    });

    it('titleProps.id should be set if deprecated titleId is also passed', () => {
      const titleId = 'title_id';
      const wrapper = mount(
        <DialogBase
          hidden={false}
          dialogContentProps={{
            titleId: `${titleId}_deprecated`,
            type: DialogType.normal,
            title: 'sample title',
            titleProps: { id: titleId },
          }}
        />,
      );

      const dialogTitle = document.getElementById(titleId);
      expect(dialogTitle).not.toBeNull();
      wrapper.unmount();
    });
  });

  isConformant({
    Component: Dialog,
    displayName: 'Dialog',
  });
});
