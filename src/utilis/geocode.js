const request=require('request')

const geocode=(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=2bee9c41f7606413febef0180fdd5c08&query='+encodeURIComponent(address)+'&output=json&limit=1'

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connnect to location services',undefined)
        }
        else if(body.error){
            callback('Couldnt found the location',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.data[0].latitude,
                longitude :body.data[0].longitude,
                label:body.data[0].label
            })        
        }
    })
}
module.exports=geocode