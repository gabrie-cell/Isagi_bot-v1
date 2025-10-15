// ♥ 𝙼𝚎𝚗𝚞 𝚍𝚎 𝚂𝚘𝚢𝙼𝚊𝚢𝚌𝚘𝚕 ♥
// ᵁˢᵃ ᵉˢᵗᵉ ᶜᵒᵈⁱᵍᵒ ˢⁱᵉᵐᵖʳᵉ ᶜᵒⁿ ᶜʳᵉᵈⁱᵗᵒˢ
import fs from 'fs'

let handler = async (m, { conn, args }) => {
  let userId = m.mentionedJid?.[0] || m.sender
  let user = global.db.data.users[userId]
  let name = conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users).length

  // Saludo decorado
  let hour = new Intl.DateTimeFormat('es-PE', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Lima'
  }).format(new Date())
  
  let saludo = hour < 4  ? "🌌 Aún es de madrugada... las almas rondan en isagi 👻" :
             hour < 7  ? "🌅 El amanecer despierta... buenos dias ✨" :
             hour < 12 ? "🌞 Buenos días, que la energía te acompañe 💫" :
             hour < 14 ? "🍽️ Hora del mediodía... ¡a recargar fuerzas! 🔋" :
             hour < 18 ? "🌄 Buenas tardes... sigue brillando como isagi 🌸" :
             hour < 20 ? "🌇 El atardecer pinta el cielo... momento mágico 🏮" :
             hour < 23 ? "🌃 Buenas noches... que los espíritus te cuiden 🌙" :
             "🌑 Es medianoche... los fantasmas susurran en la oscuridad 👀"

  // Agrupar comandos por categorías
  let categories = {}
  for (let plugin of Object.values(global.plugins)) {
    if (!plugin.help || !plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...plugin.help.map(cmd => `#${cmd}`))
    }
  }

  // Emojis random por categoría
  let decoEmojis = ['🌙', '👻', '🪄', '🏮', '📜', '💫', '😈', '🍡', '🔮', '🌸', '🪦', '✨']
  let emojiRandom = () => decoEmojis[Math.floor(Math.random() * decoEmojis.length)]

  let menuText = `
╔ 𖤐 ISAGI-BOT𖤐 ╗

[ ☾ ] Espíritu: @${userId.split('@')[0]}  
[ ☀︎ ] Tiempo observándote: ${uptime}  
[ ✦ ] Espíritus registrados: ${totalreg}

╚════════════╝

━━━━━━━━━━━━━━━

${saludo}
Creado con esencia por: *gabriel* <3
`.trim()

  for (let [tag, cmds] of Object.entries(categories)) {
    let tagName = tag.toUpperCase().replace(/_/g, ' ')
    let deco = emojiRandom()
    menuText += `

╭━ ${deco} ${tagName} ━╮
${cmds.map(cmd => `│ ▪️ ${cmd}`).join('\n')}
╰─━━━━━━━━━━━╯`
  }

  // Enviar menú con video estilo gif
  await conn.sendMessage(m.chat, {
      video: fs.readFileSync('./storage/videos/lv_0_1760554062167.mp4'),
    gifPlayback: true,
    caption: menuText,
    gifPlayback: true,
    contextInfo: {
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363420590235387@newsletter',
        newsletterName: '𝐒𝐨𝐲perri <𝟑 • Actualizaciones',
        serverMessageId: -1,
      },
      forwardingScore: 999
    }
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true;

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
    }
