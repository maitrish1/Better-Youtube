let form=document.querySelector('form')
let searchQuery=document.querySelector('#search-query')
let listVideos=document.querySelector('.show-data')

document.addEventListener('DOMContentLoaded',e=>{
    defaultDOM()
})

async function defaultDOM(){
    console.log('domloaded')
    let regionCodes=["AU","IN","FI","GB","NL","US"]
    let regionCode=regionCodes[Math.floor(Math.random()*regionCodes.length)]
    console.log(regionCode)
    let value=await fetch(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyA3ziI0mxma1plXanZEp1LNAsId_A-iLKo&part=snippet&maxResults=80&regionCode=${regionCode}`)
    const data=await value.json()
    console.log(data)
    for(let item of data.items){
        let newDate=new Date(item.snippet.publishedAt)
        newDate=newDate.toISOString().substring(0,10)
        // console.log(newDate)
        listVideos.innerHTML+=`<div class='card'>
        <a href="https://www.youtube.com/watch?v=${item.id}">
        <img src="${item.snippet.thumbnails.medium.url}">
        <h5 id='card-title'>${item.snippet.title}</h5>
        <h5>${newDate}</h5>
        <h5>${item.snippet.channelTitle}</h5></a></div>`
        console.log(item.id)

}
}
form.addEventListener('submit', e=>{
    let searchQueryValue=searchQuery.value
   
    e.preventDefault()
    getData(searchQueryValue)
})

async function getData(searchQueryValue){
    listVideos.innerHTML=''
    form.reset() // Resets the form to blank
    console.log('From getData  '+searchQueryValue)
    let value=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQueryValue}&key=AIzaSyA3ziI0mxma1plXanZEp1LNAsId_A-iLKo&maxResults=50`)
    const data=await value.json()
    // console.log(data)
    for(let item of data.items){
        let newDate=new Date(item.snippet.publishedAt)
        newDate=newDate.toISOString().substring(0,10)
        console.log(newDate)
        listVideos.innerHTML+=`<div class='card'>
        <a href="https://www.youtube.com/watch?v=${item.id.videoId}">
        <img src="${item.snippet.thumbnails.medium.url}">
        <h5 id='card-title'>${item.snippet.title}</h5>
        <h5>${newDate}</h5>
        <h5>${item.snippet.channelTitle}</h5></a></div>`
        console.log(item)
       
    }
}