export const babelConfig = (options: { extraPlugins: Array<string> }) => {
  return {
    plugins: [...options.extraPlugins, 'annotate-pure-calls', '@babel/transform-react-pure-annotations'],
  };
};
