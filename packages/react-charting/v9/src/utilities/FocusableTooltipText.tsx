import * as React from 'react';
import { hasOverflow, ITooltipHostProps, TooltipHost, TooltipOverflowMode } from '@fluentui/react';
import { getAccessibleDataObject } from './index';
import { IAccessibilityProps } from '../types/index';
import { Async } from '../Utilities';

interface IFocusableTooltipTextProps {
  className?: ITooltipHostProps['hostClassName'];
  content?: ITooltipHostProps['content'];
  accessibilityData?: IAccessibilityProps;
}

interface IFocusableTooltipTextState {
  textOverflow: boolean;
}

/**
 * Component to make the text focusable when the overflowed content is clipped
 * because of the CSS text-overflow property.
 */
export class FocusableTooltipText extends React.Component<IFocusableTooltipTextProps, IFocusableTooltipTextState> {
  private _tooltipChild = React.createRef<HTMLSpanElement>();
  private _resizeObserver?: ResizeObserver;
  private _async: Async;

  constructor(props: IFocusableTooltipTextProps) {
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
