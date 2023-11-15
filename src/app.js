const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode = require('./utilis/geocode.js')
const forecast = require('./utilis/forecast.js')

// console.log(__dirname)
const app=express()

//Define paths for epress config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'andrew mead'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'andrew mead'
    })
})

app.get('/help',(req,res)=>{
        res.render('help',{
            helpText:'he he',
            title:'Help',
            name:'andrew'
        })
     })


// app.get('',(req,res)=>{
//     res.send('Hello Express!')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About us</h1>')
// })



app.get('/help/*',(req,res)=>{
    // res.send('help page not found')
    res.render('404page',{
        text:'Help article not found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address."
        })
       } 
    // res.send({
    //     // address:req.query.address
        
        
    // })
    geocode(req.query.address, (error, {latitude,longitude,label}={}) => {
        if (error) {
          return res.send({
            error:'error'
          })
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
                error:'error'
            })
          }
            res.send({
                location:label,
                foreCast:forecastData,
                address:req.query.address
                
            })
            // res.send({
            //     forecast:forecastData
            // })
        })
      })
    //   console.log(forecast)
})


app.get('*',(req,res)=>{
    // res.send('My 404 page')
    res.render('404page',{
        title:'404',
        text:'Page not found'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
     return res.send({
         error:"You must provide search."
     })
    }
    console.log(req.query)
    res.send({
     products:[]
    })
 })


app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
}) 