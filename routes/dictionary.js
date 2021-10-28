const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    res.render('main', {
        data: null,
         audio: null,
    })
})

router.post('/', async (req, res) => {
    const word = req.body.word
    const api_url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    try {
      await fetch(api_url)
        .then(res => res.json())
        .then(data => {
            if(data.title === 'No Definitions Found'){
                res.render('main', {
                    data: data.title,
                    audio: null
                })
            }else{
                const audio = data[0].phonetics[0].audio
        
                res.render('main',{data: data[0], audio})
            }
        })
    } catch (err) {
        res.render('main', {
            data: 'Something went wrong!!!',
            audio: null,
        })
    }
})

module.exports = router