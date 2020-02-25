import { Input } from '@fluentui/react';

const config: ScreenerTestsConfig = {
  steps: [builder => builder.setValue(`.${Input.className} input`, 'Some text...').snapshot('Can be clearable')],
  themes: ['teams', 'teamsDark', 'teamsHighContrast']
};

export default config;
