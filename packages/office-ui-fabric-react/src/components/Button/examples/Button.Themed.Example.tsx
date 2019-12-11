import * as React from 'react';
import { mergeCss } from '@uifabric/merge-styles';
import { Provider } from './Provider';
import { FluentTheme, PlannerFluentTheme } from './fluent/FluentTheme';
import { FluentButton } from './fluent/FluentButton';

const oddRedBorder = mergeCss({ border: '10px solid red' });
const example = mergeCss({ margin: 20 });

const Icon: React.FunctionComponent<any> = props => <span {...props}>@</span>;
export const ButtonThemedExample: React.FunctionComponent<{}> = props => {
  const onClick = React.useCallback(() => console.log('clicked button'), []);
  const variants = () => {
    return (
      <>
        <div className={example}>
          <FluentButton tiny>tiny</FluentButton>
        </div>
        <div className={example}>
          <FluentButton large>large</FluentButton>
        </div>
        <div className={example}>
          <FluentButton size="s">small</FluentButton>
          <FluentButton size="m">medium</FluentButton>
          <FluentButton size="l">large</FluentButton>
        </div>

        <div className={example}>
          <FluentButton shadowed>shadowed</FluentButton>
        </div>
        <div className={example}>
          <FluentButton bigIcon={true} slots={{ icon: Icon, primaryText: () => <span>BigIcon</span> }} />
        </div>
        <div className={example}>
          <FluentButton id="sdasdas" shadowed tiny>
            shadowed & tiny
          </FluentButton>
        </div>
        <div className={example}>
          <FluentButton onClick={onClick}>A standard fluent button</FluentButton>
        </div>

        <div className={example}>
          <FluentButton onClick={onClick} className={oddRedBorder}>
            Fluent Button with an odd red border
          </FluentButton>
        </div>
      </>
    );
  };
  return (
    <div>
      <h1>Fluent Theme</h1>
      <Provider theme={FluentTheme}>{variants()}</Provider>

      <h1>Planner Fluent Theme</h1>
      <Provider theme={PlannerFluentTheme}>{variants()}</Provider>
    </div>
  );
};
