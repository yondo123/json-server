const jsonServer = require('json-server')
const path = require('path')

const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname + '/data.json'))
const middlewares = jsonServer.defaults({ static: './build' })

router.db._.id = 'uuid'
app.db = router.db
const rules = auth.rewriter({
  users: 660,
  userSetting: 660,
  accounts: 660,
})

app.use(middlewares)
app.use(rules)
app.use(auth)
app.use(router)

app.listen(4000, () => {
  console.log('JSON Server is running...')
})
