We recommend using `nvm` (Node Version Manager) to manage and switch Node versions. This is useful if you're developing in multiple repos and/or branches that have different Node version requirements.

## Setup steps

First, **uninstall your globally-installed version of Node**.

The next steps vary by platform.

### Windows

1. Install [`nvm-windows`](https://github.com/coreybutler/nvm-windows)
2. Redo setup for normal development:
   1. Install the latest **LTS** Node version. Unfortunately with `nvm-windows` you must manually specify the full version number.
      1. Run `nvm list available`
      2. Take note of the newest version in the `LTS` column -- for demo purposes we'll call it `x.y.z` (you'll need to use the real version number instead)
      3. Install that version: `nvm install x.y.z`
   2. Reinstall yarn: `npm install -g yarn@1`
   3. Optional: reinstall any other npm packages you previously had globally installed
3. _(Only if developing on an old branch)_ Install an old Node version for legacy branch development:
   1. Find the full 10.x or 8.x version number to install. One way is to look at the version number in the filenames on [this page for 10.x](https://nodejs.org/download/release/latest-v10.x/) or [this page for 8.x](https://nodejs.org/download/release/latest-v8.x/). For demo purposes we'll call it `x.y.z` (you'll need to use the real version number instead).
   2. Install that version: `nvm install x.y.z`
4. To switch between the Node versions later, run `nvm use x.y.z` where `x.y.z` is the full version number.
   - The selected version will remain the default until you select another version.
   - If you forget which versions are installed, run `nvm list installed`.

### Mac/Linux

1. Install [`nvm`](https://github.com/nvm-sh/nvm)
2. Redo setup for normal development:
   1. Install the latest **LTS** Node version: `nvm install lts` (or `nvm install 14` if you prefer to stay on 14 for now)
   2. Set that version as your default: `nvm alias default lts`
   3. Reinstall yarn: `npm install -g yarn@1`
   4. Optional: Reinstall any other packages you previously had globally installed
3. _(Only if developing on an old branch)_ Install an old Node version for legacy branch development: either `nvm install 10` or `nvm install 8`
4. When working in the old branch, run `nvm use 10` (or `nvm use 8`) _each time you open a new terminal_ (or you can temporarily change the default by running `nvm alias default 10` then changing it back later)
