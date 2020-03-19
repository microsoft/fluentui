import * as _ from 'lodash';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AutoControlledComponent } from 'src/utils';
import { consoleUtil } from 'test/utils';
import { Props } from 'src/types';

let TestClass;

const createTestClass = (options = {} as any) =>
  class Test extends AutoControlledComponent {
    static autoControlledProps = options.autoControlledProps;
    static defaultProps = options.defaultProps;
    getInitialAutoControlledState() {
      return options.state;
    }
    render() {
      return <div />;
    }
  };

const toDefaultName = prop => `default${prop.slice(0, 1).toUpperCase() + prop.slice(1)}`;

const makeProps = () => ({
  computer: 'hardware',
  flux: 'capacitor',
  ion: 'belt',
});

const makeDefaultProps = (props: Props): Props =>
  _.transform(props, (res, val, key) => {
    res[toDefaultName(key)] = val;
  });

const getAutoControlledInstance = (wrapper: ShallowWrapper = shallow(<TestClass />)) =>
  wrapper.instance() as AutoControlledComponent;

describe('extending AutoControlledComponent', () => {
  beforeEach(() => {
    TestClass = createTestClass({ autoControlledProps: [], state: {} });
  });

  test('does not throw with a `null` state', () => {
    TestClass = createTestClass({ autoControlledProps: [], state: null });
    shallow(<TestClass />);
  });

  test('getAutoControlledStateFromProps', () => {
    consoleUtil.disableOnce();

    TestClass = createTestClass({
      autoControlledProps: ['open'],
      defaultProps: ['defaultOpen'],
      state: { open: false, value: 'initial' },
    });
    TestClass.getAutoControlledStateFromProps = (props, state) => {
      return {
        openProp: props.open,
        openState: state.open,
        modifiedValue: `${state.value} + auto`,
      };
    };
    const wrapper = shallow(<TestClass open />);

    expect(wrapper.state('open')).toBe(true);
    expect(wrapper.state('openProp')).toBe(true);

    // will be "true" because logic of ACC was executed before
    expect(wrapper.state('openState')).toBe(true);

    // "getAutoControlledStateFromProps" has access to whole state
    expect(wrapper.state('modifiedValue')).toBe('initial + auto');
    // original "value" will be kept
    expect(wrapper.state('value')).toBe('initial');
  });

  describe('trySetState', () => {
    test('sets state for autoControlledProps', () => {
      consoleUtil.disableOnce();

      const autoControlledProps = _.keys(makeProps());
      const randomProp = _.sample(autoControlledProps);
      const randomValue = 'transmit';

      TestClass = createTestClass({ autoControlledProps });
      const wrapper = shallow(<TestClass />);

      getAutoControlledInstance(wrapper).setState({ [randomProp]: randomValue });

      expect(wrapper.state()).toHaveProperty(randomProp, randomValue);
    });

    test('does not set state for props defined by the parent', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);

      const randomProp = _.sample(autoControlledProps);
      const randomValue = "You can't calculate the alarm without synthesizing the auxiliary CSS port!";

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...props} />);

      getAutoControlledInstance(wrapper).setState({ [randomProp]: randomValue });

      // not updated
      expect(wrapper.state()).not.toHaveProperty(randomProp, randomValue);

      // is original value
      expect(wrapper.state()).toHaveProperty(randomProp, props[randomProp]);
    });

    test('sets state for props passed as undefined by the parent', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);

      const randomProp = _.sample(autoControlledProps);
      const randomValue = "hacking the system won't do anything, we need to back up the optical IB bandwidth!";

      props[randomProp] = undefined;

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...props} />);

      getAutoControlledInstance(wrapper).setState({ [randomProp]: randomValue });

      expect(wrapper.state()).toHaveProperty(randomProp, randomValue);
    });

    test('does not set state for props passed as null by the parent', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);

      const randomProp = _.sample(autoControlledProps);
      const randomValue = 'Try to synthesize the TCP bandwidth, maybe it will reboot the auxiliary panel!';

      props[randomProp] = null;

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...props} />);

      getAutoControlledInstance(wrapper).setState({ [randomProp]: randomValue });

      // not updated
      expect(wrapper.state()).not.toHaveProperty(randomProp, randomValue);

      // is original value
      expect(wrapper.state()).toHaveProperty(randomProp, props[randomProp]);
    });
  });

  describe('initial state', () => {
    test('is derived from autoControlledProps in props', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);

      TestClass = createTestClass({ autoControlledProps, state: {} });
      expect(shallow(<TestClass {...props} />).state()).toEqual(
        expect.objectContaining({ autoControlledProps, ...props }),
      );
    });

    test('does not include non autoControlledProps', () => {
      const props = makeProps();
      const wrapper = shallow(<TestClass {...props} />);

      _.each(props, (val, key) => {
        expect(wrapper.state()).not.toHaveProperty(key, val);
      });
    });

    test('includes non autoControlled state', () => {
      const props = makeProps();

      TestClass = createTestClass({ autoControlledProps: [], state: { foo: 'bar' } });
      expect(shallow(<TestClass {...props} />).state()).toHaveProperty('foo', 'bar');
    });

    test('uses the initial state if default and regular props are undefined', () => {
      consoleUtil.disableOnce();

      const defaultProps = { defaultFoo: undefined };
      const autoControlledProps = ['foo'];

      TestClass = createTestClass({ autoControlledProps, defaultProps, state: { foo: 'bar' } });

      expect(shallow(<TestClass foo={undefined} />).state()).toHaveProperty('foo', 'bar');
    });

    test('uses the default prop if the regular prop is undefined', () => {
      consoleUtil.disableOnce();

      const defaultProps = { defaultFoo: 'default' };
      const autoControlledProps = ['foo'];

      TestClass = createTestClass({ autoControlledProps, defaultProps, state: {} });

      expect(shallow(<TestClass foo={undefined} />).state()).toHaveProperty('foo', 'default');
    });

    test('uses the regular prop when a default is also defined', () => {
      consoleUtil.disableOnce();

      const defaultProps = { defaultFoo: 'default' };
      const autoControlledProps = ['foo'];

      TestClass = createTestClass({ autoControlledProps, defaultProps, state: {} });

      expect(shallow(<TestClass foo="initial" />).state()).toHaveProperty('foo', 'initial');
    });

    test('defaults "checked" to false if not present', () => {
      consoleUtil.disableOnce();
      TestClass.autoControlledProps.push('checked');

      expect(shallow(<TestClass />).state()).toHaveProperty('checked', false);
    });

    test('defaults "value" to an empty string if not present', () => {
      consoleUtil.disableOnce();
      TestClass.autoControlledProps.push('value');

      expect(shallow(<TestClass />).state()).toHaveProperty('value', '');
    });

    test('defaults "value" to an empty array if "multiple"', () => {
      consoleUtil.disableOnce();
      TestClass.autoControlledProps.push('value');

      expect(shallow(<TestClass multiple />).state()).toHaveProperty('value', []);
    });
  });

  describe('default props', () => {
    test('are applied to state for props in autoControlledProps', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);
      const defaultProps = makeDefaultProps(props);

      TestClass = createTestClass({ autoControlledProps, state: {} });
      expect(shallow(<TestClass {...defaultProps} />).state()).toEqual(expect.objectContaining(props));
    });

    test('are not applied to state for normal props', () => {
      const props = makeProps();
      const defaultProps = makeDefaultProps(props);

      const wrapper = shallow(<TestClass {...defaultProps} />);

      _.each(props, (val, key) => {
        expect(wrapper.state()).not.toHaveProperty(key, val);
      });
    });

    test('allows trySetState to work on non-default autoControlledProps', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);
      const defaultProps = makeDefaultProps(props);

      const randomProp = _.sample(autoControlledProps);
      const randomValue = "You can't program the system without synthesizing the virtual AGP circuit!";

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...defaultProps} />);

      getAutoControlledInstance(wrapper).setState({ [randomProp]: randomValue });

      expect(wrapper.state()).toHaveProperty(randomProp, randomValue);
    });
  });

  describe('changing props', () => {
    test('sets state for props in autoControlledProps', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);

      const randomProp = _.sample(autoControlledProps);
      const randomValue = 'Try to synthesize the PNG protocol, maybe it will transmit the auxiliary firewall!';

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...props} />);

      wrapper.setProps({ [randomProp]: randomValue });

      expect(wrapper.state()).toHaveProperty(randomProp, randomValue);
    });

    test('does not set state for props not in autoControlledProps', () => {
      consoleUtil.disableOnce();
      const props = makeProps();

      const randomProp = _.sample(_.keys(props));
      const randomValue = 'We need to navigate the mobile GB bandwidth!';

      TestClass = createTestClass({ autoControlledProps: [], state: {} });
      const wrapper = shallow(<TestClass {...props} />);

      wrapper.setProps({ [randomProp]: randomValue });

      expect(wrapper.state()).not.toHaveProperty(randomProp, randomValue);
    });

    test('does not set state for default props when changed', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);
      const defaultProps = makeDefaultProps(props);

      const randomDefaultProp = _.sample(defaultProps);
      const randomValue = 'We need to compress the solid state XML port!';

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...defaultProps} />);

      wrapper.setProps({ [randomDefaultProp]: randomValue });

      expect(wrapper.state()).not.toHaveProperty(randomDefaultProp, randomValue);
    });

    test('keeps current state value when setting props undefined', () => {
      consoleUtil.disableOnce();

      const autoControlledProps = ['foo'];
      const defaultProps = { defaultFoo: 'default' };

      TestClass = createTestClass({ autoControlledProps, defaultProps, state: {} });
      const wrapper = shallow(<TestClass foo="initial" />);

      // default value
      expect(wrapper.state()).toHaveProperty('foo', 'initial');

      wrapper.setProps({ foo: undefined });
      expect(wrapper.state()).toHaveProperty('foo', 'initial');
    });

    test('does not set state for props passed as null by the parent', () => {
      consoleUtil.disableOnce();

      const props = makeProps();
      const autoControlledProps = _.keys(props);

      const randomProp = _.sample(autoControlledProps);

      TestClass = createTestClass({ autoControlledProps, state: {} });
      const wrapper = shallow(<TestClass {...props} />);

      wrapper.setProps({ [randomProp]: null });

      expect(wrapper.state(randomProp)).toBe(null);
    });
  });
});
