import * as React from 'react';
import { VerticalDivider } from 'office-ui-fabric-react/lib/Divider';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

interface IBasicDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getExampleClassNames = memoizeFunction(
  (): IBasicDividerExampleClassNames => {
    const exampleHeight = 40;
    return mergeStyleSets({
      wrapper: {
        height: 40,
        backgroundColor: '#F4F4F4',
        padding: '0 10px'
      },
      text: {
        display: 'inline-block',
        padding: '0 8px',
        height: exampleHeight,
        lineHeight: exampleHeight,
        verticalAlign: 'top',
        margin: 'auto'
      }
    });
  }
);

export class VerticalDividerBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const classNames = getExampleClassNames();
    return (
      <div className={classNames.wrapper}>
        <p className={classNames.text}> Some text before the divider. </p>
        <VerticalDivider />
        <p className={classNames.text}>Some text after the divider. </p>
      </div>
    );
  }
}
