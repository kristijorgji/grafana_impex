#!/usr/bin/env bash

yarn build
npm login
npm publish --access public
