let handler = async (m, { conn }) => {
  let userId = m.mentionedJid?.[0] || m.sender
  let name = await conn.getName(userId)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let totalreg = Object.keys(global.db.data.users || {}).length

  let hour = new Intl.DateTimeFormat('es-PE', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Lima'
  }).format(new Date())

  let saludo = hour < 4  ? "🌌 Aún es de madrugada... las almas rondan 👻" :
               hour < 7  ? "🌅 El amanecer despierta... buenos inicios ✨" :
               hour < 12 ? "🌞 Buenos días, que la energía te acompañe 💫" :
               hour < 14 ? "🍽️ Hora del mediodía... ¡a recargar fuerzas! 🔋" :
               hour < 18 ? "🌄 Buenas tardes... sigue brillando como el sol 🌸" :
               hour < 20 ? "🌇 El atardecer pinta el cielo... momento mágico 🏮" :
               hour < 23 ? "🌃 Buenas noches... que los espíritus te cuiden 🌙" :
               "🌑 Es medianoche... los fantasmas susurran en la oscuridad 👀"

  let categories = {}
  for (let plugin of Object.values(global.plugins || {})) {
    if (!plugin.help || !plugin.tags) continue
    for (let tag of plugin.tags) {
      if (!categories[tag]) categories[tag] = []
      categories[tag].push(...plugin.help.map(cmd => `#${cmd}`))
    }
  }

  let decoEmojis = ['🌙', '👻', '🪄', '🏮', '📜', '💫', '😈', '🍡', '🔮', '🌸', '🪦', '✨']
  let emojiRandom = () => decoEmojis[Math.floor(Math.random() * decoEmojis.length)]

  let menuText = `▓▒­⡷ 𝐌𝐚𝐲𝐜𝐨𝐥ℙ𝕝𝕦𝕤 ⢾▒▓

[🌙] Espiritu: @${userId.split('@')[0]}        
[🏮] Tiempo mirandote: ${uptime}        
[📜] Espiritus: ${totalreg}
> *_${saludo}_*`.trim()

  for (let [tag, cmds] of Object.entries(categories)) {
    let tagName = tag.toUpperCase().replace(/_/g, ' ')
    let deco = emojiRandom()
    menuText += `

╭─━━━ ${deco} ${tagName} ${deco} ━━━╮
${cmds.map(cmd => `│ --> ${cmd}`).join('\n')}
╰─━━━━━━━━━━━━━━━━╯`
  }

  const template = {
    image: { url: 'https://files.catbox.moe/mk668t.jpeg' },
    caption: menuText,
    footer: 'Hecho por SoyMaycol <3',
    mentions: [userId],
    templateButtons: [
      { index: 1, urlButton: { displayText: '★ Canal del Creador', url: 'https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R' } },
      { index: 2, urlButton: { displayText: '★ Sobre mi Creador', url: 'https://soymaycol.is-a.dev' } }
    ]
  }

  try {
    await conn.sendMessage(m.chat, template, { quoted: m })
  } catch (e) {
    await conn.reply(m.chat, '❌ Ocurrió un error al enviar el menú con botones.', m)
    console.error(e)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'ayuda']
handler.register = true

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
