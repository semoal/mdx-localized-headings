import remark from 'remark'
import mdx from 'remark-mdx'
import { toVFile } from 'to-vfile'
import gfm from 'remark-gfm'
import frontMatter from 'remark-frontmatter'
import chalk from 'chalk'

const headings = [1,2,3,4,5]
const originalFileHeading = new Map();

async function transform(og, toMofify) {
  const [originalFile, localizedFile] = await Promise.all([toVFile.read(og), toVFile.read(toMofify)])

  await remark()
  .use(mdx)
  .use(gfm)
  .use(frontMatter)
    .use(() => tree => {
      tree.children.forEach((row, index) => {
        if (row.type === 'heading' && headings.includes(row.depth) && !row.children[0].value.includes("id: ")) {
          originalFileHeading.set(index, row)
        }
      })
      return tree
    }).process(originalFile)

    const localizedAdjusted = await remark()
    .use(mdx)
    .use(gfm)
    .use(frontMatter)
    .use(() => tree => {
      tree.children.forEach((row, index) => {
        if (originalFileHeading.has(index)) {
          const storedRow = originalFileHeading.get(index)
          if (storedRow.depth === row.depth && row.children[0].value !== storedRow.children[0].value) {
            const parsed = parseMarkdownHeadingId(storedRow.children[0].value)
            if (!parsed.id) {
              console.error(chalk.red(`${parsed.text} doesn't contain any id, check that header. eg: {#heading}`))
            } else {
              const r = `${row.children[0].value} {#${parsed.id}}`
              console.log(`Going to replace "${row.children[0].value}" with "${r}"`)
              row.children[0].value = r
            }
          }
        }
      })

      return tree
    }).process(localizedFile)

  return toVFile.write(localizedAdjusted)
}

/**
 * - Input: ## Some heading {#some-heading}
 * - Output: {text: "## Some heading", id: "some-heading"}
 * @param heading string
 * @returns { text: string; id?: string; }
 */
function parseMarkdownHeadingId(heading){
  const customHeadingIdRegex = /^(.*?)\s*\{#([\w-]+)\}$/;
  const matches = customHeadingIdRegex.exec(heading);
  if (matches) {
    return {
      text: matches[1],
      id: matches[2],
    };
  } else {
    return {text: heading, id: undefined};
  }
}

export {
  transform
}