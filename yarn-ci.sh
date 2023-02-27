#!/bin/bash

# Shell script (Linux only) to run yarn with a timeout and retries.
# This is to address the issue where sometimes postinstall hangs forever.
attempt=1
MAX_TIME=5
MAX_RETRIES=3
LOG_ERROR="##vso[task.logissue type=error]"
LOG_WARNING="##vso[task.logissue type=warning]"

# In .devops/templates/tools.yml we enable errexit and errtrace to ensure that the whole task fails
# if any line of a multi-line script fails. However, that's not desirable here since the `timeout`
# command below is intended to exit non-zero if a timeout occurs. (+o means turn option off)
set +o errexit
set +o errtrace

while [ $attempt -le $MAX_RETRIES ]; do
  printf "\n\nRunning yarn (attempt $attempt)...\n\n"

  # `timeout` is in GNU coreutils. These are installed by default on Linux but not on Mac.
  # https://www.gnu.org/software/coreutils/manual/html_node/timeout-invocation.html#index-timeout
  timeout -k "$((MAX_TIME+1))m" "${MAX_TIME}m" yarn install --frozen-lockfile
  result=$?

  if [ $result = 0 ]; then
    exit 0
  elif [ $result = 124 ]; then # special timeout exit code
    printf "\n\n$LOG_WARNING yarn took more than $MAX_TIME minutes"
  else # other error exit code
    printf "\n\n$LOG_WARNING yarn exited with code $result"
  fi

  ((attempt++))
done

printf "\n\n$LOG_ERROR yarn failed to complete successfully in $MAX_TIME minutes after $MAX_RETRIES attempts\n"
exit 1
