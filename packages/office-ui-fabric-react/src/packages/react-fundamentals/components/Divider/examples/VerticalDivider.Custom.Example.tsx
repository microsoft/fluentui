import * as React from 'react';
import { VerticalDivider } from 'office-ui-fabric-react/lib/Divider';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

interface ICustomDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getExampleClassNames = memoizeFunction(
  (): ICustomDividerExampleClassNames => {
    const exampleHeight = 40;
    return mergeStyleSets({
      wrapper: {
        height: 40,
        backgroundColor: '#F4F4F4',
        padding: '0'
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

export class VerticalDividerCustomExample extends React.Component<any, any> {
  public render(): JSX.Element {
    const exampleClassNames = getExampleClassNames();
    return (
      <div className={exampleClassNames.wrapper}>
        <p className={exampleClassNames.text}> Some text before the divider. </p>
        <VerticalDivider
          styles={{
            wrapper: {
              height: 40,
              backgroundColor: '#F4F4F4',
              padding: 0
            },
            divider: {
              height: 28,
              backgroundColor: 'pink'
            }
          }}
        />
        <p className={exampleClassNames.text}>Some text after the divider. </p>
      </div>
    );
  }
}
