const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5811338652:AAEmZAtZt_reEAeWqwZQWqUWdUxnAWigC-Q'

const bot = new TelegramApi(token, {polling:true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Зараз я загадаю цифру від 0 до 9, а вам потрібно її вгадати!')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Відгадайте!', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Привітання'},
        {command: '/info', description: 'Отримати інформацію користувача'},
        {command: '/game', description: 'Міні-гра'},
        
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId  = msg.chat.id;
        
        if (text === '/start') {
           await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/d97/c1e/d97c1e8a-943c-37c4-963f-8db69b18db05/1.webp')
           return bot.sendMessage(chatId, 'Ласкаво просимо до телеграм бота студента групи МД-192 Гетмана Віктора')
        }
        if (text === '/info'){
           return bot.sendMessage(chatId, `Вас звати ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game'){
            return startGame(chatId)
        }

        return bot.sendMessage(chatId, 'Я вас не розумію, будь ласка введіть команду!')
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Вітаю ви вгадали цифру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Нажаль ви не вгадали, бот загадав цифру ${chats[chatId]}`, againOptions)
        }
    })
}

start()