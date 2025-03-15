import { type CtrfReport } from './types/ctrf'
import { mergeReports, readReportsFromGlobPattern } from 'ctrf'

export function parseCtrfFile(pattern: string): CtrfReport {
  console.log(`Reading CTRF reports from ${pattern}`)
  const reports: CtrfReport[] = readReportsFromGlobPattern(
    pattern
  ) as CtrfReport[]

  if (reports.length === 0) {
    throw new Error(`CTRF report not found at: ${pattern}`)
  }

  const report: CtrfReport =
    reports.length > 1 ? (mergeReports(reports) as CtrfReport) : reports[0]
  console.log(`Read ${reports.length} CTRF reports`)
  return report
}
