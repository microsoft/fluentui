#!/usr/bin/env bash
set -x
sed -i "s/import.*Screener.*screener'/import { StoryWright, Steps } from 'storywright'/g" src/stories/*
sed -i "s/Screener.Steps/Steps/g" src/stories/*
sed -i "s/Screener/StoryWright/g" src/stories/*
