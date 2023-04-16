import * as React from 'react';
import { hasOverflow, ITooltipHostProps, TooltipHost, TooltipOverflowMode } from '@fluentui/react';
import { getAccessibleDataObject } from './index';
import { IAccessibilityProps } from '../types/index';

interface IChartTitleProps {
  className?: ITooltipHostProps['hostClassName'];
  accessibilityData?: IAccessibilityProps;
  children?: ITooltipHostProps['content'];
}

interface IChartTitleState {
  textOverflow: boolean;
}

export class ChartTitle extends React.Component<IChartTitleProps, IChartTitleState> {
  private _titleRef = React.createRef<HTMLSpanElement>();
  private _reqId: number;

  constructor(props: IChartTitleProps) {
    super(props);

    this.state = {
      textOverflow: false,
    };
  }

  public render(): React.ReactNode {
    const { className, accessibilityData, children } = this.props;

    return (
      <TooltipHost overflowMode={TooltipOverflowMode.Self} hostClassName={className} content={children}>
        <span
          ref={this._titleRef}
          {...getAccessibleDataObject(accessibilityData, 'text', this.state.textOverflow)}
          tabIndex={this.state.textOverflow ? 0 : -1}
        >
          {children}
        </span>
      </TooltipHost>
    );
  }

  public componentDidMount(): void {
    this._reqId = requestAnimationFrame(this._checkTextOverflow);
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._reqId);
  }

  private _checkTextOverflow = (): void => {
    const overflowElement = this._getTargetElement();
    const textOverflow = !!overflowElement && hasOverflow(overflowElement);
    if (textOverflow !== this.state.textOverflow) {
      this.setState({ textOverflow });
    }

    this._reqId = requestAnimationFrame(this._checkTextOverflow);
  };

  private _getTargetElement = (): HTMLElement | undefined => {
    if (!this._titleRef.current || !this._titleRef.current.parentElement) {
      return undefined;
    }

    return this._titleRef.current.parentElement;
  };
}
