import { Agent } from 'https'
import { parseStringPromise } from 'xml2js'
import { type PublicationApiJSONResponse } from './types'

const username = process.env?.API_USER
const password = process.env?.API_PASSWORD
const base64Credentials = Buffer.from(`${username}:${password}`).toString(
  'base64'
)

const fetchOptions = {
  headers: {
    Authorization: `Basic ${base64Credentials}`
  },
  agent: new Agent({
    rejectUnauthorized: false,
    maxCachedSessions: 0
  })
}

interface Paginate {
  limit: number
  offset: number
}

export async function findPublication(
  ou: string
): Promise<PublicationApiJSONResponse> {
  return await getRequestBody(`escenic/publication/${ou}`)
}

export type findProfilesType = (ou: string, paginate: Paginate) => Promise<any>

export const findAuthors: findProfilesType = async (
  ou: string,
  paginate: Paginate
) => {
  return await findUsers(ou, 'authorprofile', paginate)
}

export const findContributors: findProfilesType = async (
  ou: string,
  paginate: Paginate
) => {
  return await findUsers(ou, 'contributorprofile', paginate)
}

export async function findContent(id: number): Promise<any> {
  return await getRequestBody(`escenic/content/${id}`)
}

async function findUsers(
  ou: string,
  userTypeFilter: 'authorprofile' | 'contributorprofile',
  paginate: Paginate = {
    limit: 100,
    offset: 1
  }
): Promise<any> {
  const queryParams = {
    pw: paginate.offset.toString(),
    c: paginate.limit.toString(),
    tag: '',
    filters: `org_unit:${ou} ${process.env.API_URL}/escenic/publication/users/model/content-type/${userTypeFilter}`,
    'search-filter': 'main',
    'ece.facet': 'true',
    TZ: 'Asia/Singapore'
  }

  const queryString = new URLSearchParams(queryParams).toString()

  const url = `publication/users/search/((*)%20+meta-orderby:%22lastmodifieddate%20descending%22)/?${queryString}`

  const response = await getRequestBody(url)
  return response.feed.entry || []
}

async function xml2json(xml: string): Promise<any> {
  return await parseStringPromise(xml, {
    normalize: true,
    trim: true
  })
}

async function getRequestBody(baseUrl: string): Promise<any> {
  const response = await fetch(
    `${process.env.API_URL}/${baseUrl}`,
    fetchOptions
  )
  const body = await response.text()
  return await xml2json(body)
}
