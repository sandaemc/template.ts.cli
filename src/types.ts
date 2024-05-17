export interface PublicationApiJSONResponse {
  entry: {
    $: {
      xmlns: string
      'xmlns:dcterms': string
      'xmlns:metadata': string
    }
    id: string[]
    link: Array<{
      $: {
        rel: string
        href: string
        type: string
        xmlns?: string
        pub?: string
        'content-descriptor'?: string
        title?: string
      }
      accept?: string[]
    }>
    'dcterms:identifier': string[]
    'metadata:publication': Array<{
      $: {
        href: string
        title: string
        label: string
      }
    }>
    content?: Array<{
      $: {
        type: string
      }
      'vdf:payload': Array<{
        $: {
          'xmlns:vdf': string
          model: string
        }
        'vdf:field': Array<{
          $: {
            name: string
          }
          'vdf:value': string[]
        }>
      }>
    }>
    'metadata:icon': string[]
    title: Array<{
      _: string
      $: {
        type: string
      }
    }>
  }
}
