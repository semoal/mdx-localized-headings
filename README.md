# MDX/MD Localized Headings Transformation

## Inspiration

The inspiration to create this tool is basically that Docusaurus V2, introduces some heading id's to headers.

You can write an id for a heading, in that way it can be localized but the id will keep the same:
```
## Heading-1 {#heading-1}
```
They offered a tool to create these ids but what happens when you already have your documentation headings translated? Basically it creates the id based on the translated document, and not in the original.

This tool can pick an original `markdown.mdx|md`, save their headings ids and add them to the translated ones.

## Usage

You can run it through a CLI:
```bash
npm install -g mdx-localized-headings
mdx-localized-headings ./docs/base.mdx ./docs/translated.mdx
```

or run it through Node:
```bash
npm install -g mdx-localized-headings
```

```js
import { transform } from "mdx-localized-headings"

await transform(path1, path2)
```

## Contributing

Tests are implemented with [uvu](https://github.com/lukeed/uvu), and we use yarn as package manager:
```
yarn
yarn test
```