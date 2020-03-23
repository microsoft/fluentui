import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M19.902.373c-.498-.53-1.349-.413-3.22-.152a72.41 72.41 0 0 1-4.408.505.5.5 0 0 0 .082.997c1.919-.156 3.39-.362 4.465-.512.49-.068.984-.135 1.396-.176-1.307 1.808-7.948 10.28-17.73 10.54a.5.5 0 0 0 .013 1h.013c10.743-.286 17.834-9.974 18.69-11.203-.023.417-.178 1.152-.33 1.872a61.638 61.638 0 0 0-.938 5.41.5.5 0 0 0 .992.124c.3-2.377.661-4.082.924-5.327.37-1.753.54-2.553.05-3.078z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
