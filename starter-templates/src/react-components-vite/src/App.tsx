import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Example } from './Example';

const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Example />
    </FluentProvider>
  );
};

export default App;
