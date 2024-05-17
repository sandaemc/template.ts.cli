import { getLastPartOfUrl } from './util'
import { type PublicationApiJSONResponse } from './types'

export function getPublicationId(
  publication: PublicationApiJSONResponse
): string {
  const url = publication.entry.link.filter(
    (c) =>
      c.$.rel === 'http://www.escenic.com/types/relation/organizational-unit'
  )[0].$.href
  const id = getLastPartOfUrl(url)
  if (!id) {
    throw new Error('Publication ID not found')
  }

  return id
}
