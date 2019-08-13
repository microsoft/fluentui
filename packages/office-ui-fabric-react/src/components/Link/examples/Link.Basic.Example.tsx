import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';

// The Fabric site host (UHF) overrides link styles, so we need to re-assign them.
// For use of Links elsewhere, this shouldn't be necessary.
const theme = getTheme();
const rootClass = mergeStyles({
  selectors: {
    '.ms-Link': {
      color: theme.palette.themePrimary,
      margin: 0,
      padding: 0,
      overflow: 'inherit',
      textOverflow: 'inherit',
      selectors: {
        ':active, :hover, :active:hover': {
          color: theme.palette.themeDarker
        },
        ':focus': {
          color: theme.palette.themePrimary
        }
      }
    },
    '.ms-Link.is-disabled': {
      color: theme.palette.neutralTertiary,
      pointerEvents: 'none',
      cursor: 'default'
    }
  }
});

export const LinkBasicExample: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <p>
        When a link has an href, <Link href="http://dev.office.com/fabric/components/link">it renders as an anchor tag.</Link> Without an
        href, <Link>the link is rendered as a button</Link>. You can also use the disabled attribute to create a{' '}
        <Link disabled={true} href="http://dev.office.com/fabric/components/link">
          disabled link.
        </Link>{' '}
      </p>
      <p>
        It's not recommended to use Links with imgs because Links are meant to render textual inline content. Buttons are inline-block or in
        the case of imgs, block. However, it is possible to create a linked image button by making a button with an unstyled variant and
        adding the img content and href source to that.
      </p>
    </div>
  );
};
