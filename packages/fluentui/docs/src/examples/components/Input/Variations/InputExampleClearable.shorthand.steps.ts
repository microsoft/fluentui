import { inputClassName } from '@fluentui/react-northstar';
import { ScreenerTestsConfig } from '@uifabric/build/screener';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.setValue(`.${inputClassName} input`, 'Some text...').snapshot('Can be clearable')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
};

export default config;
