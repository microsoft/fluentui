import * as React from 'react';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { ResizeGroup } from '@fluentui/react/lib/ResizeGroup';

const leftRightBoxClassName = mergeStyles({
  display: 'flex',
  justifyContent: 'space-between',
  whiteSpace: 'nowrap',
}) as string;

const getNumberedBoxClassName = memoizeFunction((backgroundColor: string) => {
  return mergeStyles({
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '20px',
    lineHeight: '50px',
    height: '50px',
    width: '50px',
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor,
  }) as string;
});

interface IBoxWithLabelProps {
  label: string;
  backgroundColor: string;
}

interface ILeftRightBoxSetProps {
  leftCount: number;
  rightCount: number;
  cacheKey: string;
}

const BoxWithLabel: React.FunctionComponent<IBoxWithLabelProps> = (props: IBoxWithLabelProps) => (
  <div className={getNumberedBoxClassName(props.backgroundColor)}>{props.label}</div>
);

function renderBoxWithLabels(count: number, backgroundColor: string): JSX.Element[] {
  const result: JSX.Element[] = [];
  for (let i = 1; i <= count; i += 1) {
    result.push(<BoxWithLabel label={`${i}`} backgroundColor={backgroundColor} key={`${backgroundColor}-${i}`} />);
  }
  return result;
}

const LeftRightBoxSet: React.FunctionComponent<ILeftRightBoxSetProps> = (props: ILeftRightBoxSetProps) => (
  <div className={leftRightBoxClassName}>
    <div>{renderBoxWithLabels(props.leftCount, 'orange')}</div>
    <div>{renderBoxWithLabels(props.rightCount, 'green')}</div>
  </div>
);

function onReduceData(props: ILeftRightBoxSetProps): ILeftRightBoxSetProps | undefined {
  if (props.leftCount === 0 && props.rightCount === 0) {
    return undefined;
  }

  let result: ILeftRightBoxSetProps;
  if (props.leftCount > props.rightCount) {
    result = { ...props, leftCount: props.leftCount - 1 };
  } else {
    result = { ...props, rightCount: props.rightCount - 1 };
  }

  // Update the cache key
  return { ...result, cacheKey: `${result.leftCount + result.rightCount}` };
}

export const FlexBoxResizeGroupExample: React.FunctionComponent<{}> = () => {
  const data: ILeftRightBoxSetProps = { leftCount: 5, rightCount: 5, cacheKey: '10' };
  return (
    <ResizeGroup
      data={data}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderData={(scaledData: ILeftRightBoxSetProps) => <LeftRightBoxSet {...scaledData} />}
      onReduceData={onReduceData}
    />
  );
};
