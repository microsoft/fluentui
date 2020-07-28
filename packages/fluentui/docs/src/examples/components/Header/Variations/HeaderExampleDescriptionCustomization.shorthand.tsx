import * as React from 'react';
import { Header } from '@fluentui/react-northstar';

const HeaderExampleDescriptionCustomizationShorthand = () => (
  <Header
    as="h2"
    content="Account Settings"
    description={{ content: 'Manage your account settings and set email preferences', as: 'span' }}
  />
);

export default HeaderExampleDescriptionCustomizationShorthand;
