import path from 'path';
import CircularDependencyPlugin from 'circular-dependency-plugin';

import config from '../../config';

export const isCycleToSkip = (proposedCycle: string[], benignCycles: string[][]) => {
  return benignCycles.some(benignCycle => {
    const fullBenignCycle = [...benignCycle, ...benignCycle];
    return fullBenignCycle.join(',').indexOf(proposedCycle.join(',')) >= 0;
  });
};

type PluginCallbackArgs = { compilation: any; paths: string[] };
type ProcessDetectedCycle = (arg: PluginCallbackArgs) => void;

export const configureCircularDependencyCheckPlugin = (onDetected: ProcessDetectedCycle = () => {}) => {
  return new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true,
    allowAsyncCycles: true,
    cwd: config.paths.base(),
    onDetected,
  });
};

type WebpackConfigOptions = {
  entryFilePath: string;
  outputFilePath: string;
  plugins: any[];
};

export const buildWebpackConfig = ({ entryFilePath, outputFilePath, plugins = [] }: WebpackConfigOptions) => {
  return {
    mode: 'development',
    entry: `${entryFilePath}`,
    output: {
      path: path.dirname(outputFilePath),
      filename: path.basename(outputFilePath),
    },
    plugins,
  };
};
