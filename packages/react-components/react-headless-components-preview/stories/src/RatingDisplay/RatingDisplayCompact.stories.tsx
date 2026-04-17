import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-headless-components-preview';
import { StarFilled, StarHalfFilled } from '@fluentui/react-icons';

const RatingIcon = () => (
  <>
    <StarFilled className="absolute flex size-4 [[data-appearance=filled-half]_&]:invisible [[data-appearance=outline]_&]:text-gray-300 " />
    <StarHalfFilled className="absolute flex size-4 [[data-appearance=filled-half]_&]:visible invisible" />
  </>
);

export const Compact = (): React.ReactNode => {
  return (
    <RatingDisplay
      className="flex items-center gap-1 [&>[data-appearance]]:size-4 [&>[data-appearance]]:relative"
      compact
      value={3}
      icon={RatingIcon}
    />
  );
};
