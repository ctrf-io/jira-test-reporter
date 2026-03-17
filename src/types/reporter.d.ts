export type TableHeader =
  | 'tests'
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'pending'
  | 'other'
  | 'flaky'
  | 'duration'

export interface Options {
  title?: string
  prefix?: string
  suffix?: string
  onFailOnly?: boolean
  project?: string
  issueType?: string
  issueTypeId?: string
  labels?: string[]
  components?: string[]
  assignee?: string
  priority?: string
  fixVersions?: string[]
  debug?: boolean
  tableHeaders?: TableHeader[]
  updateCtrf?: boolean
  updateIssue?: boolean
}
