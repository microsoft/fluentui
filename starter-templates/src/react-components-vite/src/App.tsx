import { FluentProvider, webLightThemeClassName } from '@fluentui/react-components';
import { Example } from './Example';

const App = () => {
  return (
    <FluentProvider themeClassName={webLightThemeClassName}>
      <Example />
    </FluentProvider>
  );
};

export default App;
