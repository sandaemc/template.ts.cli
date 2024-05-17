import { inspect } from 'util'
import fs from 'fs'

export const dump = (obj: any) => {
  console.log(inspect(obj, false, null, true))
}

export function getLastPartOfUrl(url: string): string {
  const match = url.match(/\/([^\/]+)\/?$/)
  if (match) {
    return match[1]
  } else {
    throw new Error('Could not extract last part of URL')
  }
}

export function dumpJsonToFile(jsonData: any, filePath: string): void {
  try {
    console.log('Dumping JSON to file:', filePath)
    const jsonString = JSON.stringify(jsonData, null, 2)
    fs.writeFileSync(filePath, jsonString, 'utf-8')
  } catch (error) {
    console.error('Error dumping JSON to file:', error)
  }
}
