import https from 'https'

export interface AdfNode {
  type: string
  attrs?: Record<string, any>
  content?: AdfNode[]
  text?: string
}

export interface AdfDocument {
  version: number
  type: string
  content: AdfNode[]
}

export interface JiraIssuePayload {
  fields: {
    project: {
      key: string
    }
    summary: string
    description: AdfDocument | string
    issuetype: {
      id?: string
      name?: string
    }
    labels?: string[]
    components?: Array<{ name: string }>
    assignee?: {
      name: string
    }
    priority?: {
      name: string
    }
    fixVersions?: Array<{ name: string }>
    versions?: Array<{ name: string }>
  }
}

export const updateJiraIssue = async (
  issueIdOrKey: string,
  payload: JiraIssuePayload
): Promise<void> => {
  const jiraApiUrl = process.env.JIRA_URL
  const jiraApiToken = process.env.JIRA_API_TOKEN
  const jiraEmail = process.env.JIRA_EMAIL

  if (!jiraApiUrl) {
    throw new Error('JIRA_URL is not defined in the environment variables')
  }

  if (!jiraEmail || !jiraApiToken) {
    throw new Error(
      'JIRA_EMAIL and/or JIRA_API_TOKEN are not defined in the environment variables'
    )
  }

  await new Promise<void>((resolve, reject) => {
    const url = new URL(`${jiraApiUrl}/rest/api/3/issue/${encodeURIComponent(issueIdOrKey)}`)

    // Build update-safe payload: omit project and issuetype which cannot be changed via update
    const updateFields: Record<string, unknown> = {}
    if (payload.fields.summary !== undefined) updateFields.summary = payload.fields.summary
    if (payload.fields.description !== undefined) updateFields.description = payload.fields.description
    if (payload.fields.labels !== undefined) updateFields.labels = payload.fields.labels
    if (payload.fields.components !== undefined) updateFields.components = payload.fields.components
    if (payload.fields.assignee !== undefined) updateFields.assignee = payload.fields.assignee
    if (payload.fields.priority !== undefined) updateFields.priority = payload.fields.priority
    if (payload.fields.fixVersions !== undefined) updateFields.fixVersions = payload.fields.fixVersions

    const data = JSON.stringify({ fields: updateFields })
    const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        Authorization: `Basic ${auth}`,
      },
    }

    const req = https.request(options, (res) => {
      let response = ''
      res.on('data', (chunk) => {
        response += chunk
      })
      res.on('end', () => {
        if (res.statusCode === 204) {
          console.log(`Successfully updated Jira issue ${issueIdOrKey}`)
          resolve()
        } else {
          reject(
            new Error(
              `Failed to update Jira issue ${issueIdOrKey}, status code: ${res.statusCode}, response: ${response}`
            )
          )
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(data)
    req.end()
  })
}

export const postJiraIssue = async (
  payload: JiraIssuePayload
): Promise<string> => {
  const jiraApiUrl = process.env.JIRA_URL
  const jiraApiToken = process.env.JIRA_API_TOKEN
  const jiraEmail = process.env.JIRA_EMAIL

  if (!jiraApiUrl) {
    throw new Error('JIRA_URL is not defined in the environment variables')
  }

  if (!jiraEmail || !jiraApiToken) {
    throw new Error(
      'JIRA_EMAIL and/or JIRA_API_TOKEN are not defined in the environment variables'
    )
  }

  return await new Promise<string>((resolve, reject) => {
    const url = new URL(`${jiraApiUrl}/rest/api/3/issue`)
    const data = JSON.stringify(payload)
    const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        Authorization: `Basic ${auth}`,
      },
    }

    const req = https.request(options, (res) => {
      let response = ''
      res.on('data', (chunk) => {
        response += chunk
      })
      res.on('end', () => {
        if (res.statusCode === 201) {
          const parsed = JSON.parse(response) as { key: string }
          console.log(`Successfully created Jira issue: ${parsed.key}`)
          resolve(parsed.key)
        } else {
          reject(
            new Error(
              `Failed to create Jira issue, status code: ${res.statusCode}, response: ${response}`
            )
          )
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(data)
    req.end()
  })
}
