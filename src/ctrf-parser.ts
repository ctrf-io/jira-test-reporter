import { type CTRFReport, merge, parse } from 'ctrf'
import { globSync } from 'glob'
import fs from 'fs'

export function parseCtrfFile(pattern: string): CTRFReport {
  console.log(`Reading CTRF reports from ${pattern}`)
  const files = globSync(pattern)

  if (files.length === 0) {
    throw new Error(`CTRF report not found at: ${pattern}`)
  }

  const reports: CTRFReport[] = files
    .map(file => {
      try {
        const content = fs.readFileSync(file, 'utf8')
        return parse(content)
      } catch (error) {
        console.warn(`Failed to read or parse file '${file}':`, error)
        return null
      }
    })
    .filter((report): report is CTRFReport => report !== null)

  if (reports.length === 0) {
    throw new Error(`No valid CTRF reports found matching: ${pattern}`)
  }

  const report: CTRFReport = reports.length > 1 ? merge(reports) : reports[0]
  console.log(`Read ${reports.length} CTRF reports`)
  return report
}
