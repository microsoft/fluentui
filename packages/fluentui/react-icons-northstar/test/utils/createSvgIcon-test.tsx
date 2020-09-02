import { createSvgIcon, svgIconClassName } from '@fluentui/react-icons-northstar';
import { Unstable_FluentContextProvider } from '@fluentui/react-bindings';
import { ThemeInput } from '@fluentui/styles';
import { mount } from 'enzyme';
import * as React from 'react';

const testSvg = () => <svg />;

const createTheme = (): ThemeInput => ({
  componentStyles: {
    SvgIcon: { root: jest.fn() },
  },
  componentVariables: {},
});

describe('createSvgIcon', () => {
  it('returns a valid React component', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });
    expect(React.isValidElement(<TestIcon />)).toEqual(true);
  });

  it('sets displayName to the created Component', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });
    expect(TestIcon.displayName).toEqual('TestIcon');
  });

  it('spreads unhandled props on the root element', () => {
    const TestIcon = createSvgIcon({ svg: testSvg, displayName: 'TestIcon' });

    const wrapper = mount(<TestIcon id="test-id" />, {
      wrappingComponent: Unstable_FluentContextProvider,
      wrappingComponentProps: { value: { performance: {}, theme: createTheme() } },
    });
    expect(wrapper.find(`.${svgIconClassName}`).props().id).toEqual('test-id');
  });

  it('provides all props on the svg function', () => {
    interface BookProps {
      foo: boolean;
    }

    const BookIcon = createSvgIcon<BookProps>({
      svg: ({ props }) => <svg data-foo={props.foo.toString()} data-outline={props.outline?.toString()} />,
      displayName: 'BookIcon',
      handledProps: ['foo'],
    });

    const wrapper = mount(<BookIcon foo outline />, {
      wrappingComponent: Unstable_FluentContextProvider,
      wrappingComponentProps: { value: { performance: {}, theme: createTheme() } },
    });

    expect(wrapper.find('svg').prop('data-foo')).toEqual('true');
    expect(wrapper.find('svg').prop('data-outline')).toEqual('true');
  });
});
