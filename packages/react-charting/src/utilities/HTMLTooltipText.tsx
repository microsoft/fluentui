import * as React from 'react';
import { hasOverflow, ITooltipHostProps, TooltipHost, TooltipOverflowMode } from '@fluentui/react';
import { getAccessibleDataObject } from './index';
import { IAccessibilityProps } from '../types/index';
import { Async } from '../Utilities';

interface IHTMLTooltipTextProps {
  className?: ITooltipHostProps['hostClassName'];
  content?: ITooltipHostProps['content'];
  accessibilityData?: IAccessibilityProps;
}

interface IHTMLTooltipTextState {
  textOverflow: boolean;
}

export class HTMLTooltipText extends React.Component<IHTMLTooltipTextProps, IHTMLTooltipTextState> {
  private _tooltipChild = React.createRef<HTMLSpanElement>();
  private _resizeObserver?: ResizeObserver;
  private _async: Async;

  constructor(props: IHTMLTooltipTextProps) {
    super(props);

    this.state = {
      textOverflow: false,
    };

    this._async = new Async(this);
  }

  public render(): React.ReactNode {
    const { className, content, accessibilityData } = this.props;

    return (
      <TooltipHost overflowMode={TooltipOverflowMode.Self} hostClassName={className} content={content}>
        <span
          {...getAccessibleDataObject(accessibilityData)}
          ref={this._tooltipChild}
          data-is-focusable={this.state.textOverflow}
          tabIndex={this.state.textOverflow ? 0 : -1}
        >
          {content}
        </span>
      </TooltipHost>
    );
  }

  public componentDidMount(): void {
    const overflowElement = this._getTargetElement();
    if (window.ResizeObserver && overflowElement) {
      this._resizeObserver = new ResizeObserver(this._async.debounce(this._checkTextOverflow, 500));
      this._resizeObserver.observe(overflowElement);
    }
  }

  public componentWillUnmount(): void {
    this._resizeObserver?.disconnect();
    this._async.dispose();
  }

  private _checkTextOverflow = (): void => {
    const overflowElement = this._getTargetElement();
    const textOverflow = !!overflowElement && hasOverflow(overflowElement);
    if (textOverflow !== this.state.textOverflow) {
      this.setState({ textOverflow });
    }
  };

  private _getTargetElement = (): HTMLElement | undefined => {
    if (!this._tooltipChild.current || !this._tooltipChild.current.parentElement) {
      return undefined;
    }

    return this._tooltipChild.current.parentElement;
  };
}
