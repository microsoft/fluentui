import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const FormatIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg viewBox="8 8 16 16" role="presentation" focusable="false" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M15.702 19.727l.785-.785-3.515-10.106a.5.5 0 0 0-.944 0l-4 11.5a.5.5 0 1 0 .944.328L10.247 17h4.506l.95 2.727zM10.595 16l1.905-5.478L14.406 16h-3.811zm12.945-.54a1.578 1.578 0 0 0-2.23 0l-4.565 4.566A1.996 1.996 0 0 0 15 22c0 .551-.448 1-1 1h-2.5a.5.5 0 1 0 0 1H17a1.996 1.996 0 0 0 1.974-1.745l4.566-4.566c.297-.297.46-.692.46-1.114 0-.422-.163-.818-.46-1.115zM17 23h-1.278c.172-.295.278-.634.278-1 0-.551.449-1 1-1s1 .449 1 1-.448 1-1 1zm5.833-6.018l-4.078 4.078a2 2 0 0 0-.815-.815l4.078-4.078a.577.577 0 0 1 .815 0 .571.571 0 0 1 .167.408c0 .154-.06.3-.167.407z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M15.702 19.727l.785-.785-3.515-10.106a.5.5 0 0 0-.944 0l-4 11.5a.5.5 0 1 0 .944.328L10.247 17h4.506l.949 2.727zM10.595 16l1.905-5.478L14.406 16h-3.811zm12.945-.54a1.578 1.578 0 0 0-2.23 0l-3.576 3.577a3.061 3.061 0 0 1 2.229 2.229l3.577-3.577c.296-.297.46-.692.46-1.114 0-.422-.164-.818-.46-1.115zM17 20c-1.103 0-2 .897-2 2 0 .551-.448 1-1 1h-2.5a.5.5 0 1 0 0 1H17c1.103 0 2-.897 2-2s-.897-2-2-2z"
      />
    </svg>
  ),
  displayName: 'FormatIcon',
});
