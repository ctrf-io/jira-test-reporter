#!/usr/bin/env node
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { parseCtrfFile } from './ctrf-parser'
import { postFlakyTestsToJira, postResultsToJira } from './jira-reporter'

const checkRequiredEnvVars = () => {
  const requiredVars = ['JIRA_URL', 'JIRA_EMAIL', 'JIRA_API_TOKEN']
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.error(
      'Error: The following required environment variables are missing:'
    )
    missingVars.forEach((varName) => {
      console.error(`  - ${varName}`)
    })
    console.error(
      '\nPlease set these environment variables before running the command.'
    )
    process.exit(1)
  }
}

const sharedOptions = {
  title: {
    describe: 'Custom title for the Jira issue',
    type: 'string',
  },
  prefix: {
    describe: 'Text to add before the test results',
    type: 'string',
  },
  suffix: {
    describe: 'Text to add after the test results',
    type: 'string',
  },
  onFailOnly: {
    describe: 'Only create Jira issues when tests fail',
    type: 'boolean',
    default: false,
  },
  project: {
    describe: 'Jira project key',
    type: 'string',
  },
  issueType: {
    describe: 'Jira issue type',
    type: 'string',
    default: 'Bug',
  },
  issueTypeId: {
    describe:
      'Jira issue type ID (use this instead of jiraIssueType if you know the ID)',
    type: 'string',
  },
  labels: {
    describe: 'Comma-separated list of labels to add to the Jira issue',
    type: 'string',
  },
  components: {
    describe: 'Comma-separated list of components to add to the Jira issue',
    type: 'string',
  },
  assignee: {
    describe: 'Username of the person to assign the Jira issue to',
    type: 'string',
  },
  priority: {
    describe: 'Priority of the Jira issue',
    type: 'string',
  },
  fixVersions: {
    describe: 'Comma-separated list of fix versions to add to the Jira issue',
    type: 'string',
  },
  debug: {
    describe: 'Enable debug mode to see the payload being sent to Jira',
    type: 'boolean',
    default: false,
  },
  tableHeaders: {
    describe:
      'Comma-separated list of table headers to include (tests,passed,failed,skipped,pending,other,flaky,duration)',
    type: 'string',
  },
} as const

const argv = yargs(hideBin(process.argv))
  .command(
    'results <path>',
    'Send test results to Jira',
    (yargs) => {
      return yargs
        .positional('path', {
          describe: 'Path to the CTRF file',
          type: 'string',
          demandOption: true,
        })
        .options(sharedOptions)
    },
    async (argv) => {
      try {
        checkRequiredEnvVars()

        const report = parseCtrfFile(argv.path)

        const options = {
          title: argv.title,
          prefix: argv.prefix,
          suffix: argv.suffix,
          onFailOnly: argv.onFailOnly as boolean,
          project: argv.project,
          issueType: argv.issueType as string | undefined,
          issueTypeId: argv.issueTypeId,
          labels: argv.labels ? argv.labels.split(',') : undefined,
          components: argv.components ? argv.components.split(',') : undefined,
          assignee: argv.assignee,
          priority: argv.priority,
          fixVersions: argv.fixVersions ? argv.fixVersions.split(',') : undefined,
          debug: argv.debug as boolean,
          tableHeaders: argv.tableHeaders ? argv.tableHeaders.split(',') as any : undefined,
        }

        await postResultsToJira(report, options, true)
      } catch (error: any) {
        console.error('Error:', error.message)
        process.exit(1)
      }
    }
  )
  .epilogue(
    'Environment variables:\n' +
      '  JIRA_URL      URL of your Jira instance (e.g., https://your-domain.atlassian.net)\n' +
      '  JIRA_EMAIL        Email address associated with your Jira account\n' +
      '  JIRA_API_TOKEN    API token generated from your Atlassian account\n' +
      '  JIRA_ISSUE_TYPE   (Optional) Default issue type to create (defaults to "Bug")'
  )
  .command(
    'flaky <path>',
    'Send test results to Jira',
    (yargs) => {
      return yargs
        .positional('path', {
          describe: 'Path to the CTRF file',
          type: 'string',
          demandOption: true,
        })
        .options(sharedOptions)
    },
    async (argv) => {
      try {
        checkRequiredEnvVars()

        const report = parseCtrfFile(argv.path)

        const options = {
          title: argv.title,
          prefix: argv.prefix,
          suffix: argv.suffix,
          onFailOnly: argv.onFailOnly as boolean,
          project: argv.project,
          issueType: argv.issueType as string | undefined,
          issueTypeId: argv.issueTypeId,
          labels: argv.labels ? argv.labels.split(',') : undefined,
          components: argv.components ? argv.components.split(',') : undefined,
          assignee: argv.assignee,
          priority: argv.priority,
          fixVersions: argv.fixVersions ? argv.fixVersions.split(',') : undefined,
          debug: argv.debug as boolean,
          tableHeaders: argv.tableHeaders ? argv.tableHeaders.split(',') as any : undefined,
        }

        await postFlakyTestsToJira(report, options, true)
      } catch (error: any) {
        console.error('Error:', error.message)
        process.exit(1)
      }
    }
  )
  .epilogue(
    'Environment variables:\n' +
      '  JIRA_URL      URL of your Jira instance (e.g., https://your-domain.atlassian.net)\n' +
      '  JIRA_EMAIL        Email address associated with your Jira account\n' +
      '  JIRA_API_TOKEN    API token generated from your Atlassian account\n' +
      '  JIRA_ISSUE_TYPE   (Optional) Default issue type to create (defaults to "Bug")'
  )
  .help().argv
