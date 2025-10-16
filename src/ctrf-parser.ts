import { type Report, mergeReports, readReportsFromGlobPattern } from 'ctrf'

export function parseCtrfFile(pattern: string): Report {
  console.log(`Reading CTRF reports from ${pattern}`)
  const reports: Report[] = readReportsFromGlobPattern(pattern)

  if (reports.length === 0) {
    throw new Error(`CTRF report not found at: ${pattern}`)
  }

  const report: Report = reports.length > 1 ? mergeReports(reports) : reports[0]
  console.log(`Read ${reports.length} CTRF reports`)
  return report
}
