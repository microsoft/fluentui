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

const BoxWithLabel: React.StatelessComponent<IBoxWithLabelProps> =
  (props: IBoxWithLabelProps) => (<div className={ styles.numberedBox as string } >{ props.label }</div>);

export class FlexBoxResizeGroupExample extends BaseComponent<{}, {}> {

  public render() {
    return (
      <div className={ styles.root as string }>
        <div>
          <BoxWithLabel
            label='1' />
          <BoxWithLabel
            label='2' />
        </div>
        <span>Right </span>
      </div >
    );
  }
}