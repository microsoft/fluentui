import * as React from 'react';
import { BaseComponent, memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles, IStyle } from 'office-ui-fabric-react/lib/Styling';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';

const leftRightBoxClassName =
  mergeStyles({
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap'
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
    backgroundColor
  }) as string;
});

interface IBoxWithLabelProps {
  label: string;
  backgroundColor: string;
}

interface ILeftRightBoxSetProps {
  leftCount: number;
  rightCount: number;
}

function renderBoxWithLabels(count: number, backgroundColor: string): JSX.Element[] {
  let result: JSX.Element[] = [];
  for (let i = 1; i <= count; i += 1) {
    result.push(<BoxWithLabel
      label={ `${i}` }
      backgroundColor={ backgroundColor } />);
  }
  return result;
}

const BoxWithLabel: React.StatelessComponent<IBoxWithLabelProps> =
  (props: IBoxWithLabelProps) => (<div className={ getNumberedBoxClassName(props.backgroundColor) } >{ props.label }</div >);

const LeftRightBoxSet: React.StatelessComponent<ILeftRightBoxSetProps> =
  (props: ILeftRightBoxSetProps) => (
    <div className={ leftRightBoxClassName }>
      <div>
        { renderBoxWithLabels(props.leftCount, 'orange') }
      </div>
      <div>
        { renderBoxWithLabels(props.rightCount, 'green') }
      </div>
    </div >
  );

function onReduceData(props: ILeftRightBoxSetProps): ILeftRightBoxSetProps | undefined {
  if (props.leftCount === 0 && props.rightCount === 0) {
    return undefined;
  }

  if (props.leftCount > props.rightCount) {
    return { ...props, leftCount: props.leftCount - 1 };
  }

  return { ...props, rightCount: props.rightCount - 1 };
}

export class FlexBoxResizeGroupExample extends BaseComponent<{}, {}> {
  public render() {
    let data: ILeftRightBoxSetProps = { leftCount: 10, rightCount: 10 };
    return (
      <ResizeGroup
        data={ data }
        onRenderData={ (scaledData: ILeftRightBoxSetProps) => <LeftRightBoxSet {...scaledData} /> }
        onReduceData={ onReduceData }
      />);
  }
}