# Example markdown file

```tsx
import * as React from 'react';
import { Link, ILinkProps } from '@fluentui/react/lib/Link';
import { removeAnchorLink } from '../../utilities/index2';

export const MarkdownLink: React.FunctionComponent<ILinkProps> = props => {
  let href = props.href;
  if (href && href[0] === '#' && href.indexOf('/') === -1) {
    // This is an anchor link within this page. We need to prepend the current route.
    href = removeAnchorLink(location.hash) + href;
  }

  return <Link {...props} href={href} />;
};
```

```shell
git clone https://github.com/microsoft/create-react-app-uifabric.git my-app
cd my-app

# with npm (default)
npm install
npm start

# with yarn (optional)
yarn
yarn start
```

```scss
html,
body {
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  background: $ms-color-gray10; // Match header/footer color for browsers with momentum scroll
  background: linear-gradient(
    to right,
    $ms-color-white 0%,
    $ms-color-white 50%,
    $ms-color-gray10 50%,
    $ms-color-gray10 100%
  );
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;

  @include high-contrast {
    // The gradient doesn't behave well in high contrast, so get rid of it.
    background: transparent;
  }
}

// Border box everywhere
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

// Buttons
button {
  background: transparent;
  border: none;
}

// Example card headers
.ExampleCard-title {
  @include ms-fontSize-20;
  @include ms-fontWeight-semibold;
  @include ms-fontColor-gray130;
}
```
