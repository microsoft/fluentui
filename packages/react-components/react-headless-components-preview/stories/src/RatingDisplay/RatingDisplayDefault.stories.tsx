import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-headless-components-preview';
import { StarFilled, StarHalfFilled } from '@fluentui/react-icons';

const RatingIcon = () => (
  <>
    <StarFilled className="absolute size-4 [[data-appearance=filled-half]_&]:invisible" />
    <StarHalfFilled className="absolute size-4 [[data-appearance=filled-half]_&]:visible invisible" />
    <StarFilled className="absolute text-gray-300 size-4 [[data-appearance=outline]_&]:visible invisible" />
  </>
);

export const Default = (): React.ReactNode => {
  return (
    <RatingDisplay
      icon={RatingIcon}
      className="flex items-center gap-1 [&>[data-appearance]]:size-4 [&>[data-appearance]]:relative"
      value={2.5}
      max={5}
      valueText={{ className: 'ms-3' }}
    />
  );
};
