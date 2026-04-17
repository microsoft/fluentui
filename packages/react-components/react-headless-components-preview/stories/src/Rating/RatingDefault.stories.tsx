import * as React from 'react';
import { Rating, RatingItem } from '@fluentui/react-headless-components-preview';
import { StarFilled, StarRegular } from '@fluentui/react-icons';

export const Default = (): React.ReactNode => {
  const [value, setValue] = React.useState(3);
  const max = 5;

  return (
    <div className="flex flex-col gap-3">
      <Rating
        max={max}
        value={value}
        onChange={(_, data) => setValue(data.value)}
        className="flex items-center gap-0.5 text-gray-900 cursor-pointer"
      >
        {Array.from({ length: max }, (_, i) => (
          <RatingItem
            key={i}
            value={i + 1}
            className="relative has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2"
            selectedIcon={<StarFilled className="size-5" />}
            unselectedIcon={<StarRegular className="size-5" />}
            fullValueInput={{
              className: 'peer absolute inset-0 opacity-0 focus:outline-none cursor-pointer',
            }}
          />
        ))}
      </Rating>
      <p className="text-sm text-gray-600">
        Rating: <span className="font-medium">{value}</span> out of {max}
      </p>
    </div>
  );
};
