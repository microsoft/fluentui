#!/usr/bin/env bash
set -x
find ./src/stories/ -type f | xargs sed -i "s/import.*Screener.*screener'/import { StoryWright, Steps } from 'storywright'/g"
find ./src/stories/ -type f | xargs sed -i "s/Screener.Steps/Steps/g"
find ./src/stories/ -type f | xargs sed -i "s/Screener/StoryWright/g"
