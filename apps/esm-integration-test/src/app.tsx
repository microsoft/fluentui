import { tokens, webLightTheme } from '@fluentui/react-theme';

console.log({ webLightTheme });

const vars = Object.entries(tokens)
  .map(([key, value]) => {
    return `${value.replace('var(', '').replace(')', '')}: ${webLightTheme[key as keyof typeof webLightTheme]};`;
  })
  .join('\n');

export const App = () => {
  return (
    <main>
      <style>{`:root {
        ${vars}
      }`}</style>
      <h1>Hello</h1>
      <section>
        {Object.entries(tokens).map(([key, value]) => {
          return <div style={{ backgroundColor: value }}>{key}</div>;
        })}
      </section>
    </main>
  );
};
