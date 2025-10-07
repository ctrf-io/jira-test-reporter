import { type CtrfReport } from './types/ctrf'
import { type AdfDocument } from './client'
import { type Options } from './types/reporter'

const baseTable = {
  type: 'table',
  attrs: {
    isNumberColumnEnabled: false,
    layout: 'default',
    localId: '79158a8a-8c3c-4b2c-915d-f3423772f4be',
    width: 760,
  },
  content: [
    {
      type: 'tableRow',
      content: [
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Tests ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':test_tube:',
                    id: '1f9ea',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Passed ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':check_mark:',
                    id: 'atlassian-check_mark',
                    text: ':check_mark:',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Failed ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':cross_mark:',
                    id: 'atlassian-cross_mark',
                    text: ':cross_mark:',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Skip ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':fast_forward:',
                    id: '23e9',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Pending ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':hourglass_flowing_sand:',
                    id: '23f3',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Other',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':question:',
                    id: '2753',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Flaky ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':fallen_leaf:',
                    id: '1f342',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
        {
          type: 'tableHeader',
          attrs: {},
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Duration ',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
                },
                {
                  type: 'emoji',
                  attrs: {
                    shortName: ':timer:',
                    id: '23f2',
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

/**
 * Creates a text node with the given text
 */
const createTextNode = (text: string) => ({
  type: 'text',
  text,
})

/**
 * Creates a paragraph node with the given content
 */
const createParagraphNode = (content: any[]) => ({
  type: 'paragraph',
  content,
})

/**
 * Creates a table cell with the given text
 */
const createTableCell = (text: string) => ({
  type: 'tableCell',
  attrs: {},
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text,
        },
      ],
    },
  ],
})

/**
 * Creates a heading node with the given text and level
 */
const createHeadingNode = (text: string, level: number) => ({
  type: 'heading',
  attrs: { level },
  content: [{ type: 'text', text }],
})

/**
 * Creates a bullet list item with the given text
 */
const createBulletListItem = (text: string) => ({
  type: 'listItem',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text,
        },
      ],
    },
  ],
})

/**
 * Creates a bullet list with the given items
 */
const createBulletList = (items: any[]) => ({
  type: 'bulletList',
  content: items,
})

/**
 * Creates a code block with the given text and language
 */
const createCodeBlock = (text: string, language: string = 'text') => ({
  type: 'codeBlock',
  attrs: { language },
  content: [
    {
      type: 'text',
      text,
    },
  ],
})

/**
 * Builds a dynamic ADF description using the CTRF report data
 */
export const buildDescription = (
  ctrf: CtrfReport,
  options?: Options
): AdfDocument => {
  const { results } = ctrf
  const { summary, environment } = results
  const title = options?.title || 'Test Results Summary'
  const prefix = options?.prefix || ''
  const suffix = options?.suffix || ''
  const isFlaky = title.includes('Flaky Tests Detected')

  const tableClone = JSON.parse(JSON.stringify(baseTable))

  const dataRow = {
    type: 'tableRow',
    content: [
      createTableCell(summary.tests.toString()),
      createTableCell(summary.passed.toString()),
      createTableCell(summary.failed.toString()),
      createTableCell(summary.skipped.toString()),
      createTableCell(summary.pending.toString()),
      createTableCell(summary.other.toString()),
      createTableCell(
        results.tests.filter((test) => test.flaky).length.toString()
      ),
      createTableCell(`${Math.round((summary.stop - summary.start) / 1000)}s`),
    ],
  }

  tableClone.content.push(dataRow)

  const content = []

  if (prefix) {
    content.push(createParagraphNode([createTextNode(prefix)]))
  }

  content.push(createHeadingNode(title, 2))

  content.push(tableClone)

  // Check for missing environment properties
  const missingEnvProperties = []
  if (!environment?.buildName && !environment?.buildNumber) {
    missingEnvProperties.push('buildName/buildNumber')
  }
  if (!environment?.buildUrl) {
    missingEnvProperties.push('buildUrl')
  }

  // Add build information as heading 3 with only the build name/number as a link
  if (
    environment &&
    (environment.buildName || environment.buildNumber) &&
    environment.buildUrl
  ) {
    // Create a linked build name/number
    content.push({
      type: 'heading',
      attrs: { level: 3 },
      content: [
        { type: 'text', text: 'Build: ' },
        {
          type: 'text',
          text: environment.buildName +  ' #' + environment.buildNumber,
          marks: [
            {
              type: 'link',
              attrs: {
                href: environment.buildUrl,
              },
            },
          ],
        },
      ],
    })
  } else if (missingEnvProperties.length > 0) {
    content.push(
      createParagraphNode([
        {
          type: 'emoji',
          attrs: {
            shortName: ':warning:',
            id: '26a0',
          },
        },
        {
          type: 'text',
          text: ` Missing environment properties: ${missingEnvProperties.join(', ')}. Add these to your CTRF report for a better experience.`,
        },
      ])
    )
  }

  if (!isFlaky && summary.failed > 0) {
    content.push(createHeadingNode('Failed Tests', 3))

    const failedTests = results.tests.filter((test) => test.status === 'failed')
    const failedItems = failedTests.map((test) =>
      createBulletListItem(
        `${test.name}${test.suite ? ` (${test.suite})` : ''}`
      )
    )

    content.push(createBulletList(failedItems))
  }

  const flakyTests = results.tests.filter((test) => test.flaky)
  if (flakyTests.length > 0) {
    content.push(createHeadingNode('Flaky Tests', 3))

    const flakyItems = flakyTests.map((test) =>
      createBulletListItem(`${test.name} (${test.retries || 0} retries)`)
    )

    content.push(createBulletList(flakyItems))
  }

  if (suffix) {
    content.push(createParagraphNode([createTextNode(suffix)]))
  }

  content.push(
    createParagraphNode([
      {
        type: 'text',
        text: 'Jira Test Reporter',
        marks: [
          {
            type: 'link',
            attrs: {
              href: 'https://github.com/ctrf-io/jira-test-reporter',
            },
          },
        ],
      },
      { type: 'text', text: ' by ' },
      {
        type: 'text',
        text: 'CTRF',
        marks: [
          {
            type: 'link',
            attrs: {
              href: 'https://ctrf.io',
            },
          },
        ],
      },
      { type: 'text', text: ' ' },
      {
        type: 'emoji',
        attrs: {
          shortName: ':green_heart:',
          id: '1f49a',
        },
      },
    ])
  )

  return {
    version: 1,
    type: 'doc',
    content,
  }
}

export const description = {
  version: 1,
  type: 'doc',
  content: [baseTable],
}
