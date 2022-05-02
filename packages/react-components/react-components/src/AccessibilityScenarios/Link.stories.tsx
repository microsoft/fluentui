import * as React from 'react';

import { Link } from '@fluentui/react-link';

import { Scenario } from './utils';

export const SiteNavigationAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Site navigation links">
      <nav aria-label="Main menu">
        <ul>
          <li>
            <Link href="https://www.microsoft.com" target="_blank">
              Microsoft
            </Link>
          </li>
          <li>
            <Link href="https://www.office.com" target="_blank">
              Microsoft Office
            </Link>
          </li>
          <li>
            <Link href="https://www.github.com" target="_blank">
              GitHub
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com" target="_blank">
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href="https://www.skype.com" target="_blank" disabled>
              Skype
            </Link>
          </li>
          <li>
            <Link href="https://www.bing.com" target="_blank" disabledFocusable>
              Bing
            </Link>
          </li>
        </ul>
      </nav>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Site navigation links',
  id: 'link-accessibility-scenario',
};
