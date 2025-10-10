import { proto } from "@whiskeysockets/baileys"

let handler = async (m, { conn }) => {
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

    let saludo = hour < 4  ? "🌌 Aún es de madrugada... las almas rondan 👻" :
                  hour < 7  ? "🌅 El amanecer despierta... buenos inicios ✨" :
                  hour < 12 ? "🌞 Buenos días, que la energía te acompañe 💫" :
                  hour < 14 ? "🍽️ Hora del mediodía... ¡a recargar fuerzas! 🔋" :
                  hour < 18 ? "🌄 Buenas tardes... sigue brillando como el sol 🌸" :
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

    // Crear secciones de lista
    let sections = []
    for (let [tag, cmds] of Object.entries(categories)) {
        let title = tag.toUpperCase().replace(/_/g, ' ')
        let rows = cmds.map(cmd => ({
            title: cmd,
            description: `[ ★ ] [ † ] [ ★ ] [ † ] [ ★ ] [ † ] `,
            rowId: `#${cmd}`
        }))
        sections.push({ title: `♥ ${title} ♠`, rows })
    }

    // Lista final
    let listMessage = {
        text: `${saludo}\n\n👤 Usuario: @${userId.split('@')[0]}\n⏳ Tiempo activo: ${uptime}\n📜 Total usuarios: ${totalreg}`,
        footer: "Hecho por SoyMaycol <3",
        title: "▓▒⡷ 𝐌𝐚𝐲𝐜𝐨𝐥Plus ⢾▒▓",
        buttonText: "[ ★ ] Comandos",
        sections
    }

    await conn.sendMessage(m.chat, listMessage, { quoted: m, contextInfo: { mentionedJid: [m.sender, userId] } })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','menú','help','ayuda']
handler.register = true

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return `${h}h ${m}m ${s}s`
}
