#!/usr/bin/env node

const { runCLI } = require('../src/index');

const args = process.argv.slice(2);
const command = args[0] || 'scan';
const targetPath = args[1] || '.';

runCLI(command, targetPath);
