import * as React from 'react';
import { VerticalDivider, IVerticalDividerClassNames } from 'office-ui-fabric-react/lib/components/Divider';
import { getDividerClassNames } from 'office-ui-fabric-react/lib/components/Divider/VerticalDivider.classNames';
import { mergeStyleSets, ITheme } from 'office-ui-fabric-react/lib/Styling';
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

const getVerticalDividerClassNames = memoizeFunction((theme: ITheme): IVerticalDividerClassNames => {
  return mergeStyleSets(getDividerClassNames(theme), {
    divider: {
      height: 28
    }
  });
});

export class VerticalDividerCustomExample extends React.Component<any, any> {
  public render() {
    const exampleClassNames = getExampleClassNames();
    return (
      <div className={ exampleClassNames.wrapper }>
        <p className={ exampleClassNames.text }> Some text before the divider. </p>
        <VerticalDivider getClassNames={ getVerticalDividerClassNames } />
        <p className={ exampleClassNames.text }>Some text after the divider. </p>
      </div>);
  }
}
