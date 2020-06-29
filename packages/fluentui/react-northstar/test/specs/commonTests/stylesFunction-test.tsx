import { Extendable, ICSSInJSStyle } from '@fluentui/styles';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { UIComponent } from 'src/utils';
import { mountWithProviderAndGetComponent } from 'test/utils';

type AttrValue = 'props' | 'state';

interface Props {
  propsAttr?: AttrValue;
  commonAttr?: AttrValue;
}

interface State {
  commonAttr?: AttrValue;
  stateAttr?: AttrValue;
}

type PropsAndState = Props & State;

const testClassName = 'ui-test-component';

const testStylesForComponent = ({
  props,
  state,
  expected,
}: { props?: Props; state?: State; expected?: PropsAndState } = {}) => {
  class TestComponent extends UIComponent<Extendable<Props>, State> {
    static deprecated_className = testClassName;
    static propTypes = {
      propsAttr: PropTypes.any,
      commonAttr: PropTypes.any,
      styles: PropTypes.any,
    };

    state = state;

    renderComponent({ ElementType, classes, unhandledProps }): React.ReactNode {
      return <ElementType {...unhandledProps} className={classes.root} />;
    }
  }

  const TestStylesComponent = (props: Extendable<Props>) => (
    <TestComponent
      {...props}
      styles={({ props }: { props: PropsAndState }): ICSSInJSStyle => {
        expect(_.mapValues(expected, (val, key) => props[key])).toEqual(expected);
        return {};
      }}
    />
  );

  mountWithProviderAndGetComponent(TestStylesComponent, <TestStylesComponent {...props} />);
};

describe('styles function', () => {
  it('receives as argument only props object if state is not set', () => {
    testStylesForComponent({ expected: {} });

    testStylesForComponent({
      props: { propsAttr: 'props' },
      expected: { propsAttr: 'props' },
    });

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      expected: { propsAttr: 'props', commonAttr: 'props' },
    });
  });

  it('receives as argument a simple merge of props and state objects if both are set but there are no overlapping properties', () => {
    testStylesForComponent({
      props: { propsAttr: 'props' },
      state: { stateAttr: 'state' },
      expected: { propsAttr: 'props', stateAttr: 'state' },
    });

    testStylesForComponent({
      props: { propsAttr: 'props' },
      state: { commonAttr: 'state', stateAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'state', stateAttr: 'state' },
    });

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      state: { stateAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'props', stateAttr: 'state' },
    });
  });

  it('receives as argument a merge of props and state objects where props have priority over state when we have overlapping properties', () => {
    testStylesForComponent({
      props: { commonAttr: 'props' },
      state: { commonAttr: 'state' },
      expected: { commonAttr: 'props' },
    });

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      state: { commonAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'props' },
    });

    testStylesForComponent({
      props: { commonAttr: 'props' },
      state: { commonAttr: 'state', stateAttr: 'state' },
      expected: { commonAttr: 'props', stateAttr: 'state' },
    });

    testStylesForComponent({
      props: { propsAttr: 'props', commonAttr: 'props' },
      state: { commonAttr: 'state', stateAttr: 'state' },
      expected: { propsAttr: 'props', commonAttr: 'props', stateAttr: 'state' },
    });
  });
});
