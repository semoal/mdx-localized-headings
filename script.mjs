#!/usr/bin/env node

import { transform } from './index.mjs'
import chalk from 'chalk'
const [originalFile, translatedFile] = process.argv.splice(2);
if (!originalFile || !translatedFile) {
  console.error(chalk.red('ERROR: \n'))
  console.error(chalk.red('You must pass as first argument the original file, and second argument the translated file'))
  console.log(chalk.blueBright('eg. mdx-localized-headings ./original.mdx ./translated.mdx'))
  process.exit(0)
}
await transform(originalFile, translatedFile)
console.log(chalk.greenBright('Correctly transformed'))
