#!/bin/sh
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.

COMMAND=node scripts/node_modules/lint-staged/index.js

echo --------------------------------------------
echo Starting Git hook: pre-commit

if [ -f $COMMAND ]; then
  echo Invoking $COMMAND
  $COMMAND
else
  echo Command not installed: $COMMAND
fi

echo Finished Git hook: pre-commit
echo --------------------------------------------