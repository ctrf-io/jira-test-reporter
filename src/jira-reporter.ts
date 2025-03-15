import {
  formatFlakyTestsMessage,
  formatResultsMessage,
} from './message-formatter'
import { type Options } from './types/reporter'
import { type CtrfReport } from './types/ctrf'
import { postJiraIssue } from './client'

export async function postResultsToJira(
  report: CtrfReport,
  options: Options = {},
  logs: boolean = false
): Promise<void> {
  try {
    if (
      !options.onFailOnly ||
      (options.onFailOnly && report.results.summary.failed > 0)
    ) {
      const resultsPayload = formatResultsMessage(report, options)
      if (logs) {
        console.log('Posting test results to Jira...')
      }
      await postJiraIssue(resultsPayload)
      if (logs) {
        console.log('Successfully posted test results to Jira')
      }
    } else {
      if (logs) {
        console.log(
          'Skipping posting test results to Jira as onFailOnly is true and there are no failed tests'
        )
      }
    }
  } catch (error) {
    if (logs) {
      console.error('Error posting to Jira:', error)
    }
    throw error
  }
}

export async function postFlakyTestsToJira(
  report: CtrfReport,
  options: Options = {},
  logs: boolean = false
): Promise<void> {
  try {
    const flakyPayload = formatFlakyTestsMessage(report, options)
    if (flakyPayload) {
      if (logs) {
        console.log('Posting flaky tests to Jira...')
      }
      await postJiraIssue(flakyPayload)
      if (logs) {
        console.log('Successfully posted flaky tests to Jira')
      }
    }
  } catch (error) {
    if (logs) {
      console.error('Error posting to Jira:', error)
    }
    throw error
  }
}
