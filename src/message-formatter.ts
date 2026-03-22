import { type CTRFReport } from 'ctrf'
import { type Options } from './types/reporter'
import { buildDescription } from './description'
import { type JiraIssuePayload } from './client'

export const formatResultsMessage = (
  ctrf: CTRFReport,
  options?: Options
): JiraIssuePayload => {
  const { results } = ctrf
  const { summary } = results

  const title = options?.title ?? 'Test Results Summary'

  const projectKey = options?.project || process.env.JIRA_PROJECT_KEY
  if (!projectKey) {
    throw new Error(
      'Jira project key is required. Set it in options or JIRA_PROJECT_KEY environment variable'
    )
  }

  const issueType = options?.issueType || process.env.JIRA_ISSUE_TYPE || 'Bug'
  const issueTypeId = options?.issueTypeId

  const description = buildDescription(ctrf, options)

  // Append build name/number to the summary line when available in the CTRF environment block
  const env = results.environment
  const buildInfo =
    env?.buildName != null
      ? ` — ${env.buildName}${env.buildNumber != null ? ' #' + env.buildNumber : ''}`
      : ''

  const payload: JiraIssuePayload = {
    fields: {
      project: {
        key: projectKey,
      },
      summary: `${title}${buildInfo}: ${summary.failed} failed, ${summary.passed} passed, ${summary.tests} total`,
      description,
      issuetype: issueTypeId ? { id: issueTypeId } : { name: issueType },
    },
  }

  if (options?.labels && options.labels.length > 0) {
    payload.fields.labels = options.labels
  }

  if (options?.components && options.components.length > 0) {
    payload.fields.components = options.components.map((name) => ({ name }))
  }

  if (options?.assignee) {
    payload.fields.assignee = { name: options.assignee }
  }

  if (options?.priority) {
    payload.fields.priority = { name: options.priority }
  }

  if (options?.fixVersions && options.fixVersions.length > 0) {
    payload.fields.fixVersions = options.fixVersions.map((name) => ({ name }))
  }

  if (options?.affectsVersions && options.affectsVersions.length > 0) {
    payload.fields.versions = options.affectsVersions.map((name) => ({ name }))
  }

  if (options?.debug) {
    console.log('Jira payload:', JSON.stringify(payload, null, 2))
  }

  return payload
}

export const formatFlakyTestsMessage = (
  ctrf: CTRFReport,
  options?: Options
): JiraIssuePayload | null => {
  const { results } = ctrf
  const flakyTests = results.tests.filter((test) => test.flaky)

  if (flakyTests.length === 0) {
    return null
  }

  const projectKey = options?.project || process.env.JIRA_PROJECT_KEY
  if (!projectKey) {
    throw new Error(
      'Jira project key is required. Set it in options or JIRA_PROJECT_KEY environment variable'
    )
  }

  const issueType = options?.issueType || process.env.JIRA_ISSUE_TYPE || 'Bug'
  const issueTypeId = options?.issueTypeId

  const flakyOptions = { ...options, title: 'Flaky Tests Detected' }
  const description = buildDescription(ctrf, flakyOptions)

  const payload = {
    fields: {
      project: {
        key: projectKey,
      },
      summary: `Flaky Tests Detected: ${flakyTests.length} tests`,
      description,
      issuetype: issueTypeId ? { id: issueTypeId } : { name: issueType },
      labels: options?.labels || ['flaky-test'],
      components: options?.components?.map((name) => ({ name })),
      assignee: options?.assignee ? { name: options.assignee } : undefined,
      priority: options?.priority ? { name: options.priority } : undefined,
      fixVersions:
        options?.fixVersions && options.fixVersions.length > 0
          ? options.fixVersions.map((name) => ({ name }))
          : undefined,
      versions:
        options?.affectsVersions && options.affectsVersions.length > 0
          ? options.affectsVersions.map((name) => ({ name }))
          : undefined,
    },
  }

  if (options?.debug && options.debug) {
    console.log('Jira payload (flaky tests):', JSON.stringify(payload, null, 2))
  }

  return payload
}
