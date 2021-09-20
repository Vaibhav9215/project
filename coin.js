const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs');
//const xlsx = require("xlsx");
const path = require("path")
let sheetName, total;
async function getPrice(){
    try{
        const surl = 'https://coinmarketcap.com/'
        const {data} = await axios({
            metohd: "GEt",
            url: surl,
        })
        const $ = cheerio.load(data)
        const elemSelector ='#__next > div.bywovg-1.sXmSU > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        const keys= [
            'rank',
            'name' ,
            'price' ,
            'hr' ,
            'day',
            'marketCap' ,
            'volume' ,
            'circulatingSupply'
        ]
        $(elemSelector).each((parentIdx, parentElem)=> {
            let keyIdx= 0;
            const coinObj ={}
            if(parentIdx < 10){
                $(parentElem).children().each((childIdx, childElem) =>{
                    let tdValue = $(childElem).text()
                    if(keyIdx == 1 || keyIdx ==6){
                        tdValue= $('p:first-child' ,$(childElem).html()).text()
                    }
                if(tdValue){   
                    coinObj[keys[keyIdx]] = tdValue
                    
                    keyIdx++;
                    }
                })
                console.log(coinObj) 
             }
        })
       } catch (err){
     console.log(err)
 }
}
getPrice()