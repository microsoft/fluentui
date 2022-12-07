#!/usr/bin/env bash

#!/usr/bin/env bash

find ./src -type f |while read fname; do
  impor=""
  if grep -q "screener-storybook" $fname; then
    echo "$fname"
    if grep -q "<Screener" $fname; then
      impor="${impor}StoryWright, "
    fi
    if grep -q "Steps(" $fname; then
      impor="${impor}Steps, "
    fi
    if grep "Step " $fname; then
      impor="${impor}Step , "
    fi
  fi
  impor="${impor%??}"
  sed -i "s/import.*screener'/import { ${impor} } from 'storywright'/g" $fname
done

find ./src -type f | xargs sed -i "s/Screener.Steps/Steps/g"
find ./src -type f | xargs sed -i "s/<Screener/<StoryWright/g"
find ./src -type f | xargs sed -i "s/Screener>/StoryWright>/g"

