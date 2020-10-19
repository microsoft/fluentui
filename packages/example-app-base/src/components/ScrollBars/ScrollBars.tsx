import * as React from 'react';
import { mergeStyleSets } from '@fluentui/react';
import CustomScrollBars from 'react-custom-scrollbars';
import { IScrollBarsProps } from './ScrollBars.types';
import { NeutralColors } from '@fluentui/theme';

const styles = mergeStyleSets({
  thumb: { background: NeutralColors.gray60 },
  trackVertical: {
    right: 5,
    height: '100%',
  },
  trackHorizontal: {
    bottom: 5,
    height: '100%',
  },
});

export interface IScrollBarsState {
  scrollViewHovered?: boolean;
}

export class ScrollBars extends React.Component<IScrollBarsProps, IScrollBarsState> {
  public static defaultProps = {
    autoHide: true,
    size: 6,
  };

  public constructor(props: IScrollBarsProps) {
    super(props);

    this.state = {
      scrollViewHovered: false,
    };
  }

  public render() {
    const { viewClassName, ref, ...rest } = this.props;

    return (
      <CustomScrollBars
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        renderView={this._renderView}
        renderThumbVertical={this._renderScrollThumb}
        renderThumbHorizontal={this._renderScrollThumb}
        renderTrackVertical={this._renderScrollTrackVertical}
        renderTrackHorizontal={this._renderScrollTrackHorizontal}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        {...rest}
      >
        {this.props.children}
      </CustomScrollBars>
    );
  }

  private _handleMouseEnter = () => {
    this.setState({ scrollViewHovered: true });
  };

  private _handleMouseLeave = () => {
    this.setState({ scrollViewHovered: false });
  };

  private _renderView = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
    return (
      <div {...props} className={this.props.viewClassName}>
        {this.props.children}
      </div>
    );
  };

  private _renderScrollThumb = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const thumbStyle = {
      borderRadius: this.props.size,
    };
    return <div {...props} style={{ ...(props.style || {}), ...thumbStyle }} className={styles.thumb} />;
  };

  private _renderScrollTrackVertical = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const trackStyle = {
      width: this.props.size,
    };
    return (
      <div
        {...props}
        style={{ ...(props.style || {}), ...trackStyle, opacity: this.state.scrollViewHovered ? 1 : 0 }}
        className={styles.trackVertical}
      />
    );
  };

  private _renderScrollTrackHorizontal = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const trackStyle = {
      height: this.props.size,
    };
    return (
      <div
        {...props}
        style={{ ...(props.style || {}), ...trackStyle, opacity: this.state.scrollViewHovered ? 1 : 0 }}
        className={styles.trackHorizontal}
      />
    );
  };
}
