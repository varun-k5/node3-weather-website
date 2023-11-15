//console.log('client side javascript is loaded')

//practise
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
//})//this one is working fine


// fetch('http://localhost:3000/weather?address=boston').then((response)=>{       
//         response.json().then((data)=>{
//             if(data.error)
//              console.log(data.error);
//             else{
//                 console.log(data.foreCast)
//                 console.log(data.location)
//             }
//         })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent='From Javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    // console.log('testing!')
    // console.log(location)
    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{       
        response.json().then((data)=>{
            if(data.error)
            //  console.log(data.error);
            messageOne.textContent=data.error
            else{
                // console.log(data.foreCast)
                // console.log(data.location)
                messageOne.textContent=data.foreCast
                messageTwo.textContent=data.location
            }
        })
    })
})