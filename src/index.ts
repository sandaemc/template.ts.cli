import 'dotenv/config'
import 'reflect-metadata'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

await yargs(hideBin(process.argv))
  .command(
    'download <files...>',
    'download a list of files',
    (yargs: any) => {
      return yargs.positional('files', {
        describe: 'a list of files to do something with'
      })
    },
    (argv: unknown) => {
      console.info(argv)
    }
  )
  .strictCommands()
  .demandCommand()
  .parse()
