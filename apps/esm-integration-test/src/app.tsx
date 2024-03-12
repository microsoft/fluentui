import { tokens, webLightTheme } from '@fluentui/react-theme';
import { makeStyles, shorthands } from '@griffel/react';

const vars = Object.entries(tokens)
  .map(([key, value]) => {
    return `${value.replace('var(', '').replace(')', '')}: ${webLightTheme[key as keyof typeof webLightTheme]};`;
  })
  .join('\n');

const style = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    height: '80%',
    overflowY: 'scroll',
    ...shorthands.margin('auto'),
  },
  item: {
    ...shorthands.padding('10px'),
  },
});

export const App = () => {
  const classes = style();
  return (
    <main>
      <style>{`:root {
        ${vars}
      }`}</style>
      <h1>Hello</h1>
      <section className={classes.root}>
        {Object.entries(tokens).map(([key, value]) => {
          return (
            <div key={key} className={classes.item} style={{ backgroundColor: value }}>
              {key}
            </div>
          );
        })}
      </section>
    </main>
  );
};
