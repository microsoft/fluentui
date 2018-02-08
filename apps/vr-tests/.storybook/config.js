/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as storybook from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

import { initializeRTL } from 'storybook-addon-rtl';

initializeRTL();

setOptions({
  name: 'Fabric'
});

const req = require.context('../src/stories', true, /Breadcrumb\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

storybook.configure(loadStories, module);

