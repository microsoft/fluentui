import { createSvgIcon, svgIconClassName, SvgIconProps } from '@fluentui/react-bindings';
import { ThemeInput } from '@fluentui/styles';
import { mount } from 'enzyme';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

const testSvg = () => <svg />;

const createTheme = (): ThemeInput => ({
  componentStyles: {
    SvgIcon: { root: jest.fn() },
  },
  componentVariables: {},
});

const TestProvider: React.FC<{ theme: ThemeInput }> = props => {
  const { children, theme } = props;

  return (
    <ThemeContext.Provider
      value={{
        performance: {},
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

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
      wrappingComponent: TestProvider,
      wrappingComponentProps: { theme: createTheme() },
    });
    expect(wrapper.find(`.${svgIconClassName}`).props().id).toEqual('test-id');
  });

  it('provides all props on the svg function', () => {
    interface BookProps extends SvgIconProps {
      foo: boolean;
    }
    const svg = jest.fn();
    const BookIcon = createSvgIcon<BookProps>({
      svg,
      displayName: 'BookIcon',
      handledProps: ['foo'],
    });

    mount(<BookIcon foo outline />, {
      wrappingComponent: TestProvider,
      wrappingComponentProps: { theme: createTheme() },
    });

    expect(svg).toBeCalledWith(
      expect.objectContaining({
        props: { foo: true, outline: true },
      }),
    );
  });
});
