const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=79886fdf8813baae805b3bb3ca7e7245&query='+ latitude+','+longitude

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connnect to weather services',undefined)
        }
        else if(body.error){
            callback('Unable to find location!',undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions[0]+'.Its currently '+body.current.temperature+' and its feels like '+body.current.feelslike+'.The humdity is '+body.current.humidity+'%.' )
        }

    })
}
module.exports=forecast