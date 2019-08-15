import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { MessageBar } from './MessageBar';
import { MessageBarType } from './MessageBar.types';

describe('MessageBar', () => {
  const noop = () => {
    /* no-op */
  };

  it('renders MessageBar correctly', () => {
    const component = renderer.create(<MessageBar>Message</MessageBar>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can reflect props changes', () => {
    const wrapper = mount(<MessageBar messageBarType={MessageBarType.success} />);

    expect(wrapper.find('.ms-MessageBar--success').length).toEqual(1);
    wrapper.setProps({ messageBarType: MessageBarType.error });

    expect(wrapper.find('.ms-MessageBar--success').length).toEqual(0);
    expect(wrapper.find('.ms-MessageBar--error').length).toEqual(1);
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

      it('mixes in native props to the inner text element, except className', () => {
        const wrapper = mount(
          <MessageBar aria-live={'polite'} isMultiline={false} className={'sampleClassName'}>
            Message
          </MessageBar>
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
          </MessageBar>
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
});
