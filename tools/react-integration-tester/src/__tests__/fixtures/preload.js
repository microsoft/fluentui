/* eslint-disable no-empty */

// Preload hook for e2e tests: stub child_process to avoid real installs/command runs
// and make git root resolution deterministic to the TempFs folder
const fs = require('node:fs');
const { EventEmitter } = require('node:events');
const cp = require('node:child_process');
const origExecSync = cp.execSync.bind(cp);

const CMD_LOG = process.env.RIT_CMD_LOG; // file to append JSON lines: {command,cwd}
const GIT_ROOT = process.env.RIT_MOCK_GIT_ROOT; // absolute path to use for `git rev-parse --show-toplevel`

function logCommand(command, cwd) {
  if (!CMD_LOG) {return;}
  try {
    fs.appendFileSync(CMD_LOG, JSON.stringify({ command, cwd }) + '\n');
  } catch {}
}

function fakeSpawn(command, options) {
  logCommand(command, options?.cwd);
  const emitter = new EventEmitter();
  // Mimic async child exit success
  process.nextTick(() => emitter.emit('exit', 0));
  return emitter;
}

function fakeExecSync(command, options) {
  if (/^git\s+rev-parse\s+--show-toplevel/.test(String(command)) && GIT_ROOT) {
    return Buffer.from(GIT_ROOT);
  }
  // Fallback to real execSync for everything else
  return origExecSync(command, options);
}

// Patch both node:child_process and child_process export objects
try {
  cp.spawn = fakeSpawn;
  cp.execSync = fakeExecSync;
} catch {}

try {
  const legacy = require('child_process');
  const lOrigExecSync = legacy.execSync?.bind(legacy) ?? origExecSync;
  legacy.spawn = fakeSpawn;
  legacy.execSync = function (command, options) {
    if (/^git\s+rev-parse\s+--show-toplevel/.test(String(command)) && GIT_ROOT) {
      return Buffer.from(GIT_ROOT);
    }
    return lOrigExecSync(command, options);
  };
} catch {}
