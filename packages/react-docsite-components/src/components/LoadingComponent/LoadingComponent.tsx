import * as React from 'react';
import { Async, css, memoizeFunction, Shimmer, ShimmerElementType as ElementType, mergeStyles } from '@fluentui/react';
import { Page, IPageSectionProps } from '../Page/index';
import { ILoadingComponentProps } from './LoadingComponent.types';

const rootClass = mergeStyles({
  minHeight: '100vh',
});
const shimmerSectionClass = mergeStyles({
  transition: 'transform .3s cubic-bezier(0.1, 0.9, 0.2, 1), opacity .3s cubic-bezier(0.1, 0.9, 0.2, 1) .05s',
});
const pastDelayClass = mergeStyles({
  selectors: {
    [`.${shimmerSectionClass}`]: {
      opacity: 0,
      transform: 'translateY(40px)',
    },
  },
});
const pastOffsetClass = mergeStyles({
  selectors: {
    [`.${shimmerSectionClass}`]: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

// Only show shimmer if it takes more than DELAY_SHIMMER ms to load page component.
const DELAY_SHIMMER = 200;

const randomInt = (max: number, min: number = 0): number => Math.floor(Math.random() * (max - min) + min);

/** Generate single "paragraph" with 2-5 shimmer lines of 80-100% width with the last line being half that range. */
const generateParagraph = (): JSX.Element => {
  const lineWidths = [80, 85, 90, 95, 100];

  const lines: JSX.Element[] = [];

  // Make first longer lines.
  for (let i = 0; i <= randomInt(4); i++) {
    const lineWidth = lineWidths[randomInt(lineWidths.length)] + '%';
    lines.push(
      <Shimmer
        key={`line-${lineWidth}-${i}`}
        width={lineWidth}
        shimmerElements={[{ type: ElementType.line, height: 16 }]}
        style={{ marginBottom: 12 }}
      />,
    );
  }

  // Add last shorter line.
  const lastLineWidth = lineWidths[randomInt(lineWidths.length)] / 2 + '%';
  lines.push(
    <Shimmer
      key={`lastLine-${lineWidths}`}
      width={lastLineWidth}
      shimmerElements={[{ type: ElementType.line, height: 16 }]}
      style={{ marginBottom: 24 }}
    />,
  );

  return <div>{lines}</div>;
};

/** Generates 2-4 shimmer "paragraphs". */
const generateParagraphs = (): JSX.Element => {
  const paragraphs: JSX.Element[] = [];

  for (let i = 0; i <= 2; i++) {
    paragraphs.push(<div key={'p' + i}>{generateParagraph()}</div>);
  }

  return <>{paragraphs}</>;
};

const shimmerSections = memoizeFunction((): IPageSectionProps[] => {
  const sections: IPageSectionProps[] = [];

  for (let i = 0; i <= 1; i++) {
    sections.push({
      className: shimmerSectionClass,
      content: (
        <>
          <Shimmer
            width="25%"
            shimmerElements={[{ type: ElementType.line, height: 28 }]}
            style={{ marginBottom: 24 }}
          />
          {generateParagraphs()}
        </>
      ),
    });
  }

  return sections;
});

export interface ILoadingComponentState {
  pastDelay: boolean;
  pastOffset: boolean;
}

export class LoadingComponent extends React.PureComponent<ILoadingComponentProps, ILoadingComponentState> {
  public static defaultProps = {
    title: 'Loading Page',
    shimmer: true,
  };

  public readonly state = {
    pastDelay: false,
    pastOffset: false,
  };

  private readonly _async: Async = new Async();

  public componentDidMount(): void {
    this.props.shimmer &&
      // Delay showing shimmer.
      this._async.setTimeout(() => {
        this.setState({ pastDelay: true }, () => {
          this._async.setTimeout(() => {
            this.setState({ pastOffset: true });
          }, 50);
        });
      }, DELAY_SHIMMER);
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { pastDelay, pastOffset } = this.state;
    const { title, versionSwitcherDefinition } = this.props;

    return (
      <Page
        title={title}
        otherSections={pastDelay ? shimmerSections() : undefined}
        sectionWrapperClassName={css(pastDelay && pastDelayClass, pastOffset && pastOffsetClass)}
        showSideRail={false}
        className={rootClass}
        versionSwitcherDefinition={versionSwitcherDefinition}
      />
    );
  }
}
