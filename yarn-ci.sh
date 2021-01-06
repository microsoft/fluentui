#!/bin/bash

# Shell script (Linux only) to run yarn with a timeout and retries.
# This is to address the issue where sometimes postinstall hangs forever.
attempt=1
MAX_TIME=5
MAX_RETRIES=3
# `timeout` is in GNU coreutils. These are installed by default on Linux but not on Mac.
# https://www.gnu.org/software/coreutils/manual/html_node/timeout-invocation.html#index-timeout
while timeout -k "$((MAX_TIME+1))m" "${MAX_TIME}m" npx midgard-yarn install; [ $? = 124 ]; do
  if [ $attempt -lt $MAX_RETRIES ]; then
    printf "\nyarn took more than $MAX_TIME minutes. Retrying (attempt $((++attempt)))...\n"
  else
    printf "\n##vso[task.logissue type=error]yarn failed to complete in $MAX_TIME minutes after $MAX_RETRIES attempts\n"
    exit 1
  fi
done
