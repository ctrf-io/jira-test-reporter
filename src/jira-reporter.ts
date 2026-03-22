import {
  formatFlakyTestsMessage,
  formatResultsMessage,
} from './message-formatter'
import { type Options } from './types/reporter'
import { type CTRFReport } from 'ctrf'
import { postJiraIssue, updateJiraIssue } from './client'

export async function postResultsToJira(
  report: CTRFReport,
  options: Options = {},
  logs: boolean = false
): Promise<string | null> {
  try {
    if (
      !options.onFailOnly ||
      (options.onFailOnly && report.results.summary.failed > 0)
    ) {
      const resultsPayload = formatResultsMessage(report, options)
      const existingKey = (report.results.extra as Record<string, unknown>)?.jiraIssue as string | undefined
      const shouldUpdate = options.updateIssue !== false && !!existingKey
      if (shouldUpdate) {
        if (logs) {
          console.log(`Updating existing Jira issue ${existingKey}...`)
        }
        await updateJiraIssue(existingKey!, resultsPayload)
        if (logs) {
          console.log('Successfully posted test results to Jira')
        }
        return existingKey!
      } else {
        if (logs) {
          console.log('Creating new Jira issue...')
        }
        const issueKey = await postJiraIssue(resultsPayload)
        if (logs) {
          console.log('Successfully posted test results to Jira')
        }
        return issueKey
      }
    } else {
      if (logs) {
        console.log(
          'Skipping posting test results to Jira as onFailOnly is true and there are no failed tests'
        )
      }
      return null
    }
  } catch (error) {
    if (logs) {
      console.error('Error posting to Jira:', error)
    }
    throw error
  }
}

export async function postFlakyTestsToJira(
  report: CTRFReport,
  options: Options = {},
  logs: boolean = false
): Promise<string | null> {
  try {
    const flakyPayload = formatFlakyTestsMessage(report, options)
    if (flakyPayload) {
      const existingKey = (report.results.extra as Record<string, unknown>)?.jiraFlakyIssue as string | undefined
      const shouldUpdate = options.updateIssue !== false && !!existingKey
      if (shouldUpdate) {
        if (logs) {
          console.log(`Updating existing Jira issue ${existingKey}...`)
        }
        await updateJiraIssue(existingKey!, flakyPayload)
        if (logs) {
          console.log('Successfully posted flaky tests to Jira')
        }
        return existingKey!
      } else {
        if (logs) {
          console.log('Creating new Jira issue...')
        }
        const issueKey = await postJiraIssue(flakyPayload)
        if (logs) {
          console.log('Successfully posted flaky tests to Jira')
        }
        return issueKey
      }
    }
    return null
  } catch (error) {
    if (logs) {
      console.error('Error posting to Jira:', error)
    }
    throw error
  }
}
