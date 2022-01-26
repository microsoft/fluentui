import { Accessibility, keyboardKey } from '@fluentui/accessibility';
import { useAccessibility } from '@fluentui/react-bindings';
import { mount, shallow } from 'enzyme';
import * as React from 'react';

type TestBehaviorProps = {
  disabled: boolean;
};

type ChildBehaviorProps = {
  pressed: boolean;
};

const testBehavior: Accessibility<TestBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: 1,
    },
    img: {
      'aria-label': 'Pixel',
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      click: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
});

const conditionalBehavior: Accessibility<{ disabled: boolean }> = props => ({
  attributes: {
    root: {
      'aria-label': 'Noop behavior',
    },
  },
  keyActions: {
    root: {
      ...((!props.disabled && {
        click: {
          keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
        },
      }) as any),
    },
    img: {
      click: {
        keyCombinations: [props.disabled ? { keyCode: keyboardKey.ArrowDown } : { keyCode: keyboardKey.ArrowUp }],
      },
    },
  },
});

const focusZoneBehavior: Accessibility<never> = () => ({
  focusZone: {
    props: {
      disabled: true,
      shouldFocusOnMount: true,
    },
  },
});

const childOverriddenBehavior: Accessibility<ChildBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-pressed': props.pressed,
      'aria-label': 'overridden',
    },
  },
});

const childBehavior: Accessibility<ChildBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-pressed': props.pressed,
    },
  },
});

const overriddenChildBehavior: Accessibility<TestBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
      tabIndex: 1,
    },
    img: {
      'aria-label': 'Pixel',
      role: 'presentation',
    },
  },
  keyActions: {
    root: {
      click: {
        keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
      },
    },
  },
  childBehaviors: {
    child: childOverriddenBehavior,
  },
});

type TestComponentProps = {
  accessibility?: Accessibility<TestBehaviorProps>;
  disabled?: boolean;
  onClick?: (e: React.KeyboardEvent<HTMLDivElement>, slotName: string) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

type ChildComponentProps = {
  accessibility?: Accessibility<ChildBehaviorProps>;
  pressed?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
};

const TestComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { accessibility = testBehavior, disabled, onClick, onKeyDown, ...rest } = props;
  const getA11Props = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      disabled,
    }),
    actionHandlers: {
      click: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick) onClick(e, 'root');
      },
    },
  });

  return getA11Props.unstable_wrapWithFocusZone(
    <div {...getA11Props('root', { onKeyDown, ...rest })}>
      <img
        {...getA11Props('img', {
          src: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        })}
      />
      <ChildComponent {...getA11Props('child', {})} />
    </div>,
  );
};

const ChildComponent: React.FunctionComponent<ChildComponentProps> = props => {
  const { accessibility = childBehavior, pressed, onKeyDown, ...rest } = props;
  const getA11Props = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      pressed,
    }),
  });

  return <button {...getA11Props('root', { onKeyDown, ...rest })} />;
};

type FocusZoneComponentProps = {
  as?: React.ElementType;
  rtl?: boolean;
};

const FocusZoneComponent: React.FunctionComponent<FocusZoneComponentProps> = props => {
  const { as: ElementType = 'div', children, rtl = false } = props;
  const getA11Props = useAccessibility(focusZoneBehavior, { rtl });

  return getA11Props.unstable_wrapWithFocusZone(<ElementType {...getA11Props('root', {})}>{children}</ElementType>);
};

const UnstableBehaviorDefinitionComponent: React.FunctionComponent<TestComponentProps> = props => {
  const { accessibility = testBehavior } = props;
  const getA11Props = useAccessibility(accessibility, {
    mapPropsToBehavior: () => ({
      disabled: false,
    }),
  });

  return <div {...getA11Props.unstable_behaviorDefinition().attributes.root} />;
};

describe('useAccessibility', () => {
  it('sets attributes', () => {
    const wrapper = shallow(<TestComponent />);

    expect(wrapper.find('div').prop('tabIndex')).toBe(1);
    expect(wrapper.find('img').prop('role')).toBe('presentation');
    expect(wrapper.find('ChildComponent').prop('accessibility')).toBe(undefined);
  });

  it('attributes can be conditional', () => {
    expect(
      shallow(<TestComponent disabled />)
        .find('div')
        .prop('aria-disabled'),
    ).toBe(true);
    expect(
      shallow(<TestComponent disabled={false} />)
        .find('div')
        .prop('aria-disabled'),
    ).toBe(false);
  });

  it('attributes can be overridden', () => {
    expect(
      shallow(<TestComponent tabIndex={-1} />)
        .find('div')
        .prop('tabIndex'),
    ).toBe(-1);
  });

  it('child behaviors can be overridden', () => {
    expect(
      shallow(<TestComponent accessibility={overriddenChildBehavior} />)
        .find('ChildComponent')
        .prop('accessibility'),
    ).toBe(childOverriddenBehavior);
  });

  it('it shoult return current definition from unstable_behaviorDefinition', () => {
    expect(
      shallow(<UnstableBehaviorDefinitionComponent />)
        .find('div')
        .prop('aria-disabled'),
    ).toBe(false);
    expect(
      shallow(<UnstableBehaviorDefinitionComponent />)
        .find('div')
        .prop('tabIndex'),
    ).toBe(1);
  });

  it('adds event handlers', () => {
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(<TestComponent onClick={onClick} onKeyDown={onKeyDown} />);

    wrapper.find('div').simulate('click').simulate('keydown', {
      keyCode: keyboardKey.ArrowDown,
    });

    expect(onKeyDown).toBeCalledTimes(1);
    expect(onKeyDown).toBeCalledWith(
      expect.objectContaining({
        keyCode: keyboardKey.ArrowDown,
      }),
    );

    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(
      expect.objectContaining({
        keyCode: keyboardKey.ArrowDown,
      }),
      'root',
    );
  });

  it("adds user's keydown handler", () => {
    const onKeyDown = jest.fn();
    const wrapper = mount(<TestComponent accessibility={conditionalBehavior} onKeyDown={onKeyDown} />);

    wrapper.find('div').simulate('keydown');
    expect(onKeyDown).toBeCalledTimes(1);
  });

  it('do not add any handlers by default', () => {
    const wrapper = mount(<TestComponent accessibility={conditionalBehavior} disabled />);

    expect(wrapper.find('div').prop('onKeyDown')).toBeUndefined();
  });

  it('handles conditional adding of handlers', () => {
    const wrapper = mount(<TestComponent accessibility={conditionalBehavior} disabled />);
    expect(wrapper.find('div').prop('onKeyDown')).toBeUndefined();

    wrapper.setProps({ disabled: false });
    expect(wrapper.find('div').prop('onKeyDown')).toBeDefined();

    wrapper.setProps({ disabled: true });
    expect(wrapper.find('div').prop('onKeyDown')).toBeUndefined();
  });

  it('handles conditional key combinations', () => {
    const onClick = jest.fn();
    const wrapper = mount(<TestComponent accessibility={conditionalBehavior} onClick={onClick} />);

    wrapper.find('img').simulate('keydown', {
      keyCode: keyboardKey.ArrowUp,
    });

    wrapper.setProps({ disabled: true });
    wrapper.find('img').simulate('keydown', {
      keyCode: keyboardKey.ArrowUp, // Noop, will not call handler
    });
    wrapper.find('img').simulate('keydown', {
      keyCode: keyboardKey.ArrowDown,
    });

    expect(onClick).toBeCalledTimes(2);
  });

  it('handlers are referentially stable', () => {
    const wrapper = shallow(<TestComponent />);
    const handler = wrapper.find('div').prop('onKeyDown');

    wrapper.setProps({});
    expect(Object.is(handler, wrapper.find('div').prop('onKeyDown'))).toBe(true);
  });

  it('callbacks are referentially stable', () => {
    const prevOnKeyDown = jest.fn();
    const nextOnKeyDown = jest.fn();

    const wrapper = shallow(<TestComponent onKeyDown={prevOnKeyDown} />);
    wrapper.find('div').simulate('keydown');

    wrapper.setProps({ onKeyDown: nextOnKeyDown });
    wrapper.find('div').simulate('keydown');

    wrapper.setProps({ onKeyDown: undefined });
    wrapper.find('div').simulate('keydown');

    expect(prevOnKeyDown).toBeCalledTimes(1);
    expect(nextOnKeyDown).toBeCalledTimes(1);
  });

  describe('FocusZone', () => {
    it('do not render FocusZone without the definition in a behavior', () => {
      expect(shallow(<TestComponent />).find('FocusZone')).toHaveLength(0);
    });

    it('renders FocusZone with the definition in a behavior', () => {
      expect(shallow(<FocusZoneComponent />).find('FocusZone')).toHaveLength(1);
    });

    it('applies props from the behavior to a FocusZone component', () => {
      expect(
        shallow(<FocusZoneComponent />)
          .find('FocusZone')
          .props(),
      ).toEqual(
        expect.objectContaining({
          disabled: true,
          shouldFocusOnMount: true,
        }),
      );
    });

    it('applies default props for FocusZone', () => {
      expect(
        shallow(<FocusZoneComponent />)
          .find('FocusZone')
          .props(),
      ).toEqual(
        expect.objectContaining({
          preventFocusRestoration: true,
          shouldRaiseClicks: false,
        }),
      );
    });

    it('passes "rtl" value', () => {
      expect(
        shallow(<FocusZoneComponent />)
          .find('FocusZone')
          .prop('isRtl'),
      ).toBe(false);
      expect(
        shallow(<FocusZoneComponent rtl />)
          .find('FocusZone')
          .prop('isRtl'),
      ).toBe(true);
    });
  });
});
