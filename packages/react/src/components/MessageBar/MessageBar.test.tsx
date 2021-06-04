import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { resetIds } from '@fluentui/utilities';
import { MessageBar } from './MessageBar';
import { MessageBarType } from './MessageBar.types';
import { isConformant } from '../../common/isConformant';

describe('MessageBar', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  const noop = () => {
    /* no-op */
  };

  describe('snapshots', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('renders MessageBar correctly', () => {
      const component = renderer.create(<MessageBar>Message</MessageBar>);
      // The message is delay-rendered. Run timers to show it.
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a info MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.info}>Message</MessageBar>);
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a warning MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.warning}>Message</MessageBar>);
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a error MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.error}>Message</MessageBar>);
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a severeWarning MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.severeWarning}>Message</MessageBar>);
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a success MessageBar correctly', () => {
      const component = renderer.create(<MessageBar messageBarType={MessageBarType.success}>Message</MessageBar>);
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline MessageBar correctly', () => {
      const component = renderer.create(<MessageBar isMultiline={true}>Message</MessageBar>);
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline info MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.info} isMultiline={true}>
          Message
        </MessageBar>,
      );
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline warning MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
          Message
        </MessageBar>,
      );
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline error MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          Message
        </MessageBar>,
      );
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline severeWarning MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.severeWarning} isMultiline={true}>
          Message
        </MessageBar>,
      );
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders a multiline success MessageBar correctly', () => {
      const component = renderer.create(
        <MessageBar messageBarType={MessageBarType.success} isMultiline={true}>
          Message
        </MessageBar>,
      );
      jest.runOnlyPendingTimers();
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  isConformant({
    Component: MessageBar,
    displayName: 'MessageBar',
  });

  it('renders custom message bar icon correctly', () => {
    const wrapper = mount(
      <MessageBar messageBarType={MessageBarType.success} messageBarIconProps={{ iconName: 'AddFriend' }} />,
    );
    const dismissIcon = wrapper.find('[data-icon-name="AddFriend"]');
    expect(dismissIcon.exists()).toBe(true);
  });

  it('can reflect props changes', () => {
    const wrapper = mount(<MessageBar messageBarType={MessageBarType.success} />);

    expect(wrapper.find('.ms-MessageBar--success').length).toEqual(1);
    wrapper.setProps({ messageBarType: MessageBarType.error });

    expect(wrapper.find('.ms-MessageBar--success').length).toEqual(0);
    expect(wrapper.find('.ms-MessageBar--error').length).toEqual(1);
  });

  it('delay renders message by default', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <MessageBar>
        <span id="test">content</span>
      </MessageBar>,
    );

    // message not rendered initially
    expect(wrapper.find('#test')).toHaveLength(0);

    // run timers to render
    jest.runOnlyPendingTimers();
    // update recorded state of wrapper so .find() works
    wrapper.update();
    // message is rendered
    expect(wrapper.find('#test')).toHaveLength(1);
    expect(wrapper.find('#test').text()).toBe('content');
  });

  it('can disable delayed rendering', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <MessageBar delayedRender={false}>
        <span id="test">content</span>
      </MessageBar>,
    );

    // message IS rendered initially
    expect(wrapper.find('#test')).toHaveLength(1);
    expect(wrapper.find('#test').text()).toBe('content');
  });

  it('respects updates to message', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <MessageBar>
        <span id="test1">content 1</span>
      </MessageBar>,
    );
    // run timers to render
    jest.runOnlyPendingTimers();
    wrapper.update();

    // check for first message
    expect(wrapper.find('#test1').text()).toBe('content 1');

    // update message
    wrapper.setProps({ children: <span id="test2">content 2</span> });
    wrapper.update();
    expect(wrapper.find('#test1')).toHaveLength(0);
    expect(wrapper.find('#test2')).toHaveLength(1);
    expect(wrapper.find('#test2').text()).toBe('content 2');
  });

  describe('dismiss', () => {
    describe('single-line', () => {
      it('is present when onDismiss exists', () => {
        const wrapper = mount(<MessageBar onDismiss={noop} isMultiline={false} />);
        const dismissElement = wrapper.find('.ms-MessageBar-dismissal');
        expect(dismissElement.exists()).toBe(true);
      });

      it('is not present when onDismiss is missing', () => {
        const wrapper = mount(<MessageBar isMultiline={false} />);
        const dismissElement = wrapper.find('.ms-MessageBar-dismissal');
        expect(dismissElement.exists()).toBe(false);
      });

      it('has custom dismiss icon', () => {
        const wrapper = mount(
          <MessageBar onDismiss={noop} isMultiline={false} dismissIconProps={{ iconName: 'AddFriend' }} />,
        );
        const dismissIcon = wrapper.find('[data-icon-name="AddFriend"]');
        expect(dismissIcon.exists()).toBe(true);
      });

      it('mixes in native props to the inner text element, except className', () => {
        const wrapper = mount(
          <MessageBar aria-live={'polite'} isMultiline={false} className={'sampleClassName'}>
            Message
          </MessageBar>,
        );

        const innerText = wrapper.find('.ms-MessageBar-innerText');
        expect(innerText.prop('aria-live')).toEqual('polite');

        const singleLine = wrapper.find('.ms-MessageBar-singleline');
        expect(singleLine.prop('className')).toContain('sampleClassName');
        expect(innerText.prop('className')).not.toContain('sampleClassName');
      });
    });

    describe('multi-line', () => {
      it('is present when onDismiss exists', () => {
        const wrapper = mount(<MessageBar onDismiss={noop} isMultiline={true} />);
        const dismissElement = wrapper.find('.ms-MessageBar-dismissal');
        expect(dismissElement.exists()).toBe(true);
      });

      it('is not present when onDismiss is missing', () => {
        const wrapper = mount(<MessageBar isMultiline={true} />);
        const dismissElement = wrapper.find('.ms-MessageBar-dismissal');
        expect(dismissElement.exists()).toBe(false);
      });

      it('mixes in native props to the inner text element', () => {
        const wrapper = mount(
          <MessageBar aria-live={'polite'} isMultiline={true}>
            Message
          </MessageBar>,
        );

        const innerText = wrapper.find('.ms-MessageBar-innerText');
        expect(innerText.prop('aria-live')).toEqual('polite');
      });
    });
  });

  describe('truncated', () => {
    it('is present when onDismiss exists', () => {
      const wrapper = mount(<MessageBar truncated={true} isMultiline={false} />);
      const expandElement = wrapper.find('.ms-MessageBar-expand');
      expect(expandElement.exists()).toBe(true);
    });

    it('is not present when truncated is missing', () => {
      const wrapper = mount(<MessageBar isMultiline={false} />);
      const expandElement = wrapper.find('.ms-MessageBar-expand');
      expect(expandElement.exists()).toBe(false);
    });
  });

  describe('role attribute', () => {
    it('is present only once', () => {
      const wrapper = mount(<MessageBar />);
      const roleElements = wrapper.find('.ms-MessageBar [role]');
      expect(roleElements.length).toBe(1);
    });

    it('is present only once when custom role attribute exists', () => {
      const role = 'none';
      const wrapper = mount(<MessageBar role={role} />);
      const roleElements = wrapper.find('.ms-MessageBar [role]');
      expect(roleElements.length).toBe(1);
      expect(roleElements.prop('role')).toBe(role);
    });

    it('uses correct default based on messageBarType', () => {
      const wrapper = mount(<MessageBar>content</MessageBar>);

      // Status messages
      for (const messageBarType of [MessageBarType.info, MessageBarType.success, MessageBarType.warning]) {
        const typeName = `MessageBarType.${MessageBarType[messageBarType]}`;
        wrapper.setProps({ messageBarType });
        wrapper.update();
        const roleElem = wrapper.find('[role]');
        expect(roleElem).toHaveLength(1);
        // include the MessageBarType in the assertion so it's clearer what failed
        expect([typeName, roleElem.prop('role')]).toEqual([typeName, 'status']);
        expect([typeName, roleElem.prop('aria-live')]).toEqual([typeName, 'polite']);
      }

      // Alert messages
      for (const messageBarType of [MessageBarType.error, MessageBarType.blocked, MessageBarType.severeWarning]) {
        const typeName = `MessageBarType.${MessageBarType[messageBarType]}`;
        wrapper.setProps({ messageBarType });
        wrapper.update();
        const roleElem = wrapper.find('[role]');
        expect(roleElem).toHaveLength(1);
        expect([typeName, roleElem.prop('role')]).toEqual([typeName, 'alert']);
        expect([typeName, roleElem.prop('aria-live')]).toEqual([typeName, 'assertive']);
      }
    });
  });
});
