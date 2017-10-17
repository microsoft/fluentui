import * as React from 'react';
import { VerticalDivider } from 'office-ui-fabric-react/lib/components/Divider';
import { IVerticalDividerClassNames } from 'office-ui-fabric-react/lib/components/Divider/VerticalDivider.classNames';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

interface ICustomDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getExampleClassNames = memoizeFunction((): ICustomDividerExampleClassNames => {
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
});

const getVerticalDividerClassNames = memoizeFunction((): IVerticalDividerClassNames => {
  return mergeStyleSets({
    divider: {
      height: 28
    }
  });
});

export class VerticalDividerCustomExample extends React.Component<any, any> {
  public render() {
    const exampleClassNames = getExampleClassNames();
    const dividerClassNames = getVerticalDividerClassNames();
    return (
      <div className={ exampleClassNames.wrapper }>
        <p className={ exampleClassNames.text }> Some text before the divider. </p>
        <VerticalDivider classNames={ dividerClassNames } />
        <p className={ exampleClassNames.text }>Some text after the divider. </p>
      </div>);
  }
}
