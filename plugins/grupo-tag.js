
const handler = async (msg, { conn, isOwner }) => {
  try {
    const chatId = msg.key.remoteJid
    const sender = (msg.key.participant || msg.key.remoteJid).replace(/[^0-9]/g, '')
    const isGroup = chatId.endsWith('@g.us')
    const isBotMessage = msg.key.fromMe

    if (!isGroup) {
      await conn.sendMessage(chatId, { text: '⚠️ *Este comando solo se puede usar en grupos.*' }, { quoted: msg })
      return
    }

    const metadata = await conn.groupMetadata(chatId)
    const participant = metadata.participants.find(p => p.id.includes(sender))
    const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin'

    if (!isAdmin && !isOwner && !isBotMessage) {
      await conn.sendMessage(chatId, { text: '❌ *Este comando solo puede usarlo un administrador o el dueño del bot.*' }, { quoted: msg })
      return
    }

    const participants = metadata.participants
    const mentionIds = participants.map(p => p.id)

    let messageToSend = null

    // Si el mensaje es una respuesta a otro mensaje
    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
    if (quoted) {
      const type = Object.keys(quoted)[0]
      const content = quoted[type]

      if (type === 'conversation' || type === 'extendedTextMessage') {
        const text = quoted.conversation || quoted.extendedTextMessage?.text || ''
        if (!text.trim()) {
          await conn.sendMessage(chatId, { text: '⚠️ El mensaje al que respondes está vacío.' }, { quoted: msg })
          return
        }
        messageToSend = { text, mentions: mentionIds }
      } else if (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type === 'documentMessage' || type === 'stickerMessage') {
        messageToSend = { [type]: content, mentions: mentionIds }
        if (quoted[type].caption) messageToSend.caption = quoted[type].caption
      } else {
        messageToSend = { [type]: content, mentions: mentionIds }
      }
    } else {
      // Si el mensaje no es respuesta, pero tiene texto
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text
      if (!text || !text.trim()) {
        await conn.sendMessage(chatId, { text: '⚠️ Debes responder a un mensaje o escribir un texto para etiquetar.' }, { quoted: msg })
        return
      }
      messageToSend = { text, mentions: mentionIds }
    }

    await conn.sendMessage(chatId, messageToSend, { quoted: msg })

  } catch (error) {
    console.error('❌ Error en el comando tagall:', error)
    await conn.sendMessage(msg.key.remoteJid, { text: '❌ Ocurrió un error al ejecutar el comando tagall.' }, { quoted: msg })
  }
}

handler.tags = ['group']
handler.help = ['tagall']
handler.command = ['tagall', 'invocar', 'todos']
handler.group = true

export default handler
