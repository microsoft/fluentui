ARG VARIANT=20-bookworm
# https://github.com/devcontainers/images/tree/main/src/typescript-node
FROM mcr.microsoft.com/devcontainers/typescript-node:1-${VARIANT}

# Cypress linux pre-requisites https://docs.cypress.io/guides/getting-started/installing-cypress#Linux-Prerequisites
RUN apt-get update && apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
