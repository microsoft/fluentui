import { registerIcons, on, KeyCodes, setRTL } from '@fluentui/react';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
import { createSite } from './utilities/createSite';
import * as platformPickerStyles from '@fluentui/react-docsite-components/lib/components/PlatformPicker/PlatformPicker.module.scss';
import { SiteDefinition } from './SiteDefinition/index';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { androidLogo, appleLogo, webLogo, macLogo, windowsLogo, crossPlatformLogo, cdnUrl } from './utilities/index';

// TODO: handle redirects

// Remove MWF stylesheet as it is unused by the site and causes conflicts with our styles
for (const tag of Array.from(document.getElementsByTagName('link'))) {
  if (tag.href.includes('mwf-main')) {
    tag.remove();
  }
}

initializeFileTypeIcons(cdnUrl + '/assets/item-types/');

setRTL(false);

registerIcons({
  icons: {
    'AndroidLogo-platformPicker': androidLogo({
      className: platformPickerStyles.icon,
    }),
    'AppleLogo-platformPicker': appleLogo({
      className: platformPickerStyles.icon,
    }),
    'WebLogo-platformPicker': webLogo({
      className: platformPickerStyles.icon,
    }),
    'MacLogo-platformPicker': macLogo({
      className: platformPickerStyles.icon,
    }),
    'WinLogo-platformPicker': windowsLogo({
      className: platformPickerStyles.icon,
    }),
    'CrossPlatformLogo-platformPicker': crossPlatformLogo({
      className: platformPickerStyles.icon,
    }),
  },
});

const skipToMain = document.getElementById('uhfSkipToMain') as HTMLAnchorElement;
if (skipToMain) {
  // This link points to #mainContent by default, which would be interpreted as a route in our app.
  // Handle focusing the main content manually instead.
  const focusMainContent = (ev: Event) => {
    ev.preventDefault(); // don't navigate

    // focus content root
    const mainContent = document.querySelector('[data-app-content-div="true"]') as HTMLDivElement | null;
    if (mainContent) {
      mainContent.focus();
    }
  };

  on(skipToMain, 'click', focusMainContent);
  on(skipToMain, 'keydown', (ev: KeyboardEvent) => {
    if (ev.which === KeyCodes.enter) {
      focusMainContent(ev);
    }
  });
}

createSite(SiteDefinition, [NotFoundPage, HomePage]);
