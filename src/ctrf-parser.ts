import { Report } from 'ctrf'
import { mergeReports, readReportsFromGlobPattern } from 'ctrf'

export function parseCtrfFile(pattern: string): Report {
  console.log(`Reading CTRF reports from ${pattern}`)
  const reports: Report[] = readReportsFromGlobPattern(
    pattern
  ) as Report[]

  if (reports.length === 0) {
    throw new Error(`CTRF report not found at: ${pattern}`)
  }

  const report: Report =
    reports.length > 1 ? (mergeReports(reports) as Report) : reports[0]
  console.log(`Read ${reports.length} CTRF reports`)
  return report
}
