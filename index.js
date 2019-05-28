const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const monk = require('monk')
const port = 5000
const cors = require('cors')
const url = 'mongodb://reidnate91:password1234@firstcluster-shard-00-00-yafaa.mongodb.net:27017,firstcluster-shard-00-01-yafaa.mongodb.net:27017,firstcluster-shard-00-02-yafaa.mongodb.net:27017/express-test?ssl=true&replicaSet=firstCluster-shard-0&authSource=admin&retryWrites=true';
const db = monk(url);
const user = db.get('user')
app.use(cors())
app.use(bodyParser.json())


app.get('/', async function (req, res) {
  const a = await user.find()
    res.send(a)
  })
  app.get('/profile/:id', async function (req, res) {
    const getOneUser = await user.findOne({"_id": req.params.id})
      res.send(getOneUser)
    })

  app.post('/user', async function (req, res) {
    const body = req.body
    const results = await user.insert(body)
    res.send(results)
  })

  app.delete('/user/:id', async function (req, res) {
    const result = await user.remove({"_id":req.params.id})
    res.send(result)
  })

  app.put('/user/:id', async function (req, res) {
      const result = await user.findOneAndUpdate(req.params.id, {$set: req.body})
    res.send(result)
  })


db.then(() => {
  console.log('Connected correctly to server')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))