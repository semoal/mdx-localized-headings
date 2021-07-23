import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { transform } from "../index.mjs"
import { promises as fsp } from "fs"
import temp from 'fs-temp/promise.js'

test('Correctly transform localized headings, to original headings', async () => {
  const og = await temp.writeFile(await fsp.readFile('./tests/original.mdx', 'utf-8'))
  const localizedFile = await temp.writeFile(await fsp.readFile('./tests/localized.mdx', 'utf-8'))

  await transform(og, localizedFile)

  const fileTransformed = await fsp.readFile(localizedFile, 'utf-8')
  const expected = await fsp.readFile('./tests/expectedLocalized.mdx', 'utf-8')
  assert.equal(fileTransformed, expected)
});

test.run();
