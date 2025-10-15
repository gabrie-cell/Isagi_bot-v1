      await conn.sendMessage(m.chat, {
        text: `${txtWelcome}\n\n${bienvenida}`,
        contextInfo: { mentionedJid: [userId], externalAdReply }
      })
    } else {
      const txtBye = '♡ ¡MATA NE~! ♡'
      const despedida = `
✧ ¡Ara ara~! El usuario ${userMention} ha salido de *${groupMetadata.subject}* ✧

♡ Quedamos *${groupSize}* miembros en este lugar magnético 
✧ Gracias por tu tiempo aquí y esperamos verte pronto~
♡ Recuerda que las camchas siempre están abiertas para ti
✧ ¡Que tengas un buen viaje!

～ Con cariño,isagi 👻 creado por gabriel ～
`.trim()
  
      await conn.sendMessage(m.chat, {
        text: `${txtBye}\n\n${despedida}`,
        contextInfo: { mentionedJid: [userId], externalAdReply }
      })
    }
  }
}

export default handler
