const express = require('express')

const app = express()

app.listen(8000, () => {
    console.log('Server started!')
  })

app.route('/api/game').get((req, res) => {
    res.send({
      //TODO: create new game
    })
  })


app.route('/api/game/:gameid').get((req, res) => {
    res.send({
      //TODO: join game
    })
  })

