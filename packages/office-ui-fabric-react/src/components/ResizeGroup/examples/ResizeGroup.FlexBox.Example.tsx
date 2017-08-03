import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles, IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IFlexBoxResizeGroupExampleStyles {
  root: IStyle;
  numberedBox: IStyle;
}

const styles: IFlexBoxResizeGroupExampleStyles = {
  root: mergeStyles({
    display: 'flex',
    justifyContent: 'space-between'
  }),
  numberedBox: mergeStyles({
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '20px',
    lineHeight: '50px',
    height: '50px',
    width: '50px',
    backgroundColor: 'green',
    marginLeft: '10px',
    marginRight: '10px'
  })
};

interface IBoxWithLabelProps {
  label: string;
}

interface ILeftRightBoxSetProps {
  leftCount: number;
  rightCount: number;
}

function renderBoxWithLabels(count: number): JSX.Element[] {
  let result: JSX.Element[] = [];
  for (let i = 1; i <= count; i += 1) {
    result.push(<BoxWithLabel
      label={ `${i}` } />);
  }
  return result;
}

const BoxWithLabel: React.StatelessComponent<IBoxWithLabelProps> =
  (props: IBoxWithLabelProps) => (<div className={ styles.numberedBox as string } >{ props.label }</div>);

const LeftRightBoxSet: React.StatelessComponent<ILeftRightBoxSetProps> =
  (props: ILeftRightBoxSetProps) => (
    <div className={ styles.root as string }>
      <div>
        { renderBoxWithLabels(props.leftCount) }
      </div>
      <div>
        { renderBoxWithLabels(props.rightCount) }
      </div>
    </div >
  );

export class FlexBoxResizeGroupExample extends BaseComponent<{}, {}> {
  public render() {
    return (
      <LeftRightBoxSet
        leftCount={ 10 }
        rightCount={ 10 } />
    );
  }
}