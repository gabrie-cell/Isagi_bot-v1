import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [['162406168797266', 'perri', true]]

global.mods = []
global.prems = []

global.namebot = 'Isagibot'
global.redes = 'https://chat.whatsapp.com/KDI7NNovzdwJayx1gI1cue?mode=ems_copy_t'
global.botname = 'isaginot'
global.banner = 'https://raw.githubusercontent.com/SoySapo6/tmp/refs/heads/main/Permanentes/images%20(8).jpeg'
global.packname = 'isagibot'
global.author = '𝙃𝙚𝙘𝙝𝙤 𝙥𝙤𝙧 Gabriel <3'
global.moneda = 'isagiCoins'
global.libreria = 'Baileys'
global.baileys = 'V 6.7.16'
global.vs = '2.2.0'
global.sessions = 'MayBot'
global.jadi = 'MayBots'
global.yukiJadibts = true

global.namecanal = 'isagi bot <𝟑 • oficial'
global.idcanal = '120363420590235387@newsletter'
global.idcanal2 = '120363420590235387@newsletter'
global.canal = '120363420590235387@newsletter'
global.canalreg = '120363420590235387@newsletter'

global.ch = {
  ch1: '120363420590235387@newsletter'
}

global.multiplier = 69
global.maxwarn = 2

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Se actualizo el 'config.js'"))
  import(`file://${file}?update=${Date.now()}`)
})
