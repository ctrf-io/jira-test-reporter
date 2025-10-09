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
  }
}

export const postJiraIssue = async (
  payload: JiraIssuePayload
): Promise<void> => {
  const jiraApiUrl = process.env.JIRA_URL
  const jiraApiToken = process.env.JIRA_API_TOKEN
  const jiraEmail = process.env.JIRA_EMAIL

  if (!jiraApiUrl) {
    await Promise.reject(
      new Error('JIRA_URL is not defined in the environment variables')
    )
    return
  }

  if (!jiraEmail || !jiraApiToken) {
    await Promise.reject(
      new Error(
        'JIRA_EMAIL and/or JIRA_API_TOKEN are not defined in the environment variables'
      )
    )
    return
  }

  await new Promise<void>((resolve, reject) => {
    const url = new URL(`${jiraApiUrl}/rest/api/3/issue`)
    const data = JSON.stringify(payload)
    const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
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
          console.log('Successfully created Jira issue')
          resolve()
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
