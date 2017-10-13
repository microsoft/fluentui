import * as React from 'react';
import { Divider } from 'office-ui-fabric-react/lib/Divider';
import { mergeStyleSets, getTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';

interface IBasicDividerExampleClassNames {
  wrapper: string;
  text: string;
}

const getClassNames = memoizeFunction((theme: ITheme): IBasicDividerExampleClassNames => {
  const exampleHeight = 40;
  return mergeStyleSets({
    wrapper: {
      height: 40,
      backgroundColor: theme.palette.neutralLight,
    },
    text: {
      display: 'inline-block',
      padding: '0 10px'
    }
  });
});

export class DividerBasicExample extends React.Component<any, any> {
  public render() {
    const theme = getTheme();
    const classNames = getClassNames(theme);
    return (
      <div className={ classNames.wrapper }>
        <p className={ classNames.text }> Some text before the divider. </p>
        <Divider />
        <p className={ classNames.text }>Some text after the divider. </p>
      </div>);
  }
}
