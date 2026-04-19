import * as React from 'react';
import { Link } from '@fluentui/react-headless-components-preview';

const linkClass =
  'text-gray-900 underline underline-offset-4 hover:text-gray-600 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:no-underline';

export const Default = (): React.ReactNode => (
  <div className="flex flex-col gap-4 text-sm max-w-sm">
    <Link href="#" className={linkClass}>
      View documentation
    </Link>

    <p className="text-gray-700 leading-relaxed">
      By continuing you agree to our{' '}
      <Link href="#" inline className={linkClass}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="#" inline className={linkClass}>
        Privacy Policy
      </Link>
      .
    </p>

    <Link href="#" disabled className={linkClass}>
      Disabled link
    </Link>
  </div>
);
