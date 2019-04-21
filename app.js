const express = require('express')
const app = express()
const port = 3000


// require express-handlebars
const exphbs = require('express-handlebars')

const restaurantList = require('./restaurants.json')

// routes setting
app.get('/', (req, res) => {

  // past the movie data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: restaurant[0] })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})