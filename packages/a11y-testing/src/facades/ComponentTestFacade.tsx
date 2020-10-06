import * as React from 'react';
import { Props, PropValue, TestFacade } from '../types';
import { emptyTheme, ThemePrepared } from '@fluentui/styles';
import { Renderer, noopRenderer } from '@fluentui/react-northstar-styles-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { Telemetry, Unstable_FluentContextProvider, ProviderContextPrepared } from '@fluentui/react-bindings';

const EmptyThemeProvider: React.FunctionComponent<{
  disableAnimations?: boolean;
  telemetry?: Telemetry;
  renderer?: Renderer;
  theme?: ThemePrepared;
  rtl?: boolean;
}> = ({ children, disableAnimations = true, renderer = noopRenderer, telemetry, theme = emptyTheme, rtl = false }) => {
  const value: ProviderContextPrepared = {
    renderer,
    target: document,
    disableAnimations,
    rtl,
    theme,
    telemetry,
    performance: {} as any,
  };
  return <Unstable_FluentContextProvider value={value}>{children}</Unstable_FluentContextProvider>;
};

export class ComponentTestFacade implements TestFacade {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private actual: any;
  private renderedComponent: ReactWrapper<
    {
      children?: React.ReactNode;
    },
    never,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.Component<{}, {}, any>
  >;
  private onClickExecuted: boolean;

  constructor(private Component: React.FC, private props: Props = {}) {
    props.onClick = () => {
      this.onClickExecuted = true;
    };

    // reset body
    document.body.innerHTML = '';
    const container = document.createElement('div');
    document.body.appendChild(container);

    // we need to render it in this way because some component liek popup use context from wrapper component
    this.renderedComponent = mount(<Component {...props} />, {
      attachTo: container,
      wrappingComponent: EmptyThemeProvider,
    });

    this.actual = container.firstChild;
  }

  public slotExists(selector: string) {
    return selector === 'root' || !!document.getElementById(selector);
  }

  public attributeExists(selector: string, attributeName: string) {
    if (this.slotExists(selector) && selector === 'root') {
      return this.actual.getAttribute(attributeName) !== undefined && this.actual.getAttribute(attributeName) !== null;
    }

    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) !== undefined && element.getAttribute(attributeName) !== null;
    }
    return false;
  }

  public attributeHasValue(selector: string, attributeName: string, value: PropValue) {
    if (this.attributeExists(selector, attributeName) && selector === 'root') {
      return this.actual.getAttribute(attributeName) === value;
    }

    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) === value;
    }

    return false;
  }

  public getAttributeValue = (selector: string, attributeName: string) => {
    if (selector === 'root') {
      return this.actual.getAttribute(attributeName) as PropValue;
    }
    const element = document.getElementById(selector);
    if (element) {
      return element.getAttribute(attributeName) as PropValue;
    }

    return null;
  };

  public verifyOnclickExecution = (selector: string) => {
    const previousValue = this.onClickExecuted;
    this.onClickExecuted = false;
    return previousValue;
  };

  public afterClick(selector: string) {
    if (selector === 'root') {
      this.renderedComponent.simulate('click');
      return;
    }
    console.log(`selector is: ${selector}`);
    console.log(selector);
    const test = this.renderedComponent.find(selector);

    test.simulate('click');
  }

  public pressSpaceKey(selector: string) {
    if (selector === 'root') {
      this.renderedComponent.simulate('keydown', { keyCode: 32 });
      return;
    }
    this.renderedComponent.find(selector).simulate('keydown', { keyCode: 32 });
  }

  public pressEnterKey(selector: string) {
    if (selector === 'root') {
      this.renderedComponent.simulate('keydown', { keyCode: 13 });
      return;
    }
    this.renderedComponent.find(selector).simulate('keydown', { keyCode: 13 });
  }

  public forProps = (props: Props): TestFacade => {
    return new ComponentTestFacade(this.Component, { ...this.props, ...props });
  };
}
