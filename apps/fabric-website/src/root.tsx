import { registerIcons } from 'office-ui-fabric-react';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import { createSite } from './utilities/createSite';
import * as platformPickerStyles from '@uifabric/example-app-base/lib/components/PlatformPicker/PlatformPicker.module.scss';
import { SiteDefinition } from './SiteDefinition/index';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AndroidLogo, AppleLogo, WebLogo } from './utilities/index';

// TODO: handle redirects

initializeFileTypeIcons('https://static2.sharepointonline.com/files/fabric/assets/item-types-fluent/');

registerIcons({
  icons: {
    'AndroidLogo-platformPicker': AndroidLogo({
      className: platformPickerStyles.icon
    }),
    'AppleLogo-platformPicker': AppleLogo({
      className: platformPickerStyles.icon
    }),
    'WebLogo-platformPicker': WebLogo({
      className: platformPickerStyles.icon
    })
  }
});

createSite(SiteDefinition, [NotFoundPage, HomePage]);
