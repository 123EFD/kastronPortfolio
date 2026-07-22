import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeHighLight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import { customDirectives } from './src/components/Markdown/customDirectives.js';
import fm from 'front-matter';

const samples = {
  withSpan: `# Heading

This is normal text with :span[colored text]{color=red} inline.`,

  withoutSpan: `# Heading

This is normal text with [colored text]{color=red} inline.`,

  embeddedFrontmatter: `title: 'Testing Text Colors'
date: '2026-07-22'
description: Test blog post for text color rendering
---

# Heading with Colors

This is normal text with :span[colored text]{color=red} inline.`,
};

async function runPipeline(name, md) {
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkDirective)
      .use(customDirectives)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighLight)
      .use(rehypeKatex)
      .use(rehypeCitation)
      .use(rehypeStringify)
      .process(md);
    console.log(`\n=== ${name} ===`);
    console.log(result.toString());
  } catch (e) {
    console.log(`\n=== ${name} ERROR ===`);
    console.error(e.message);
  }
}

for (const [name, md] of Object.entries(samples)) {
  await runPipeline(name, md);
}

const parsed = fm(samples.embeddedFrontmatter);
console.log('\n=== front-matter parse ===');
console.log('attributes:', parsed.attributes);
console.log('body preview:', parsed.body.slice(0, 100));
