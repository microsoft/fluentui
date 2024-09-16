Components in Fluent UI React (Fabric) 7+ use the Fluent theme by default, but you can also use the Fluent theme in Fabric 6.

The Fluent theme and component updates are included in the Fluent theme package:

```
npm install @uifabric/fluent-theme
```

Once the theme is installed, the Customizer component can be used to wrap portions of your app to apply the Fluent styles. You can even wrap your entire app:

```jsx
import { Customizer } from 'office-ui-fabric-react';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { AppCode } from 'myApp/AppCode';

<Customizer {...FluentCustomizations}>
  <AppCode />
</Customizer>;
```
