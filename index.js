const { Bot } = require('messenbot.js')

const { getDef } = require('word-definition')

let client = new Bot({
        accessToken: process.env.accessToken,
        verifyToken: process.env.verifyToken,
        pageId: process.env.pageId
})

client.login() // Login to the page account
// also verifying the token

client.on('verified', () => {
        console.log('bot is verified')
})

client.on('ready', () => {
        console.log('server is up')
})

client.on('message', async(event) => {
        console.log('New message: '+JSON.stringify(event))

        await event.sendAction('typing_on')

        let text = event.message.text

        getDef(text, "en", null, async(data) => {
                if(!data) return await event.sendMessage('Cannot translate '+text)

                await event.sendMessage(`
                Category: ${data.category}
                Word: ${text}
                Definition: ${data.definition}
                `)
        })
})
