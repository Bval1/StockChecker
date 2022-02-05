import fetch from 'node-fetch'
import jsdom from 'jsdom'

const { JSDOM } = jsdom;
const url = 
    'https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&qp=gpusv_facet%3DGraphics%20Processing%20Unit%20(GPU)~NVIDIA%20GeForce%20RTX%203070&sp=%2Bcurrentprice%20skuidsaas&st=rtx+3070';

const url2 = 
    'https://www.bestbuy.com/site/searchpage.jsp?id=pcat17071&sp=%2Bcurrentprice%20skuidsaas&st=rtx+3060+ti'


var t = 0

console.log("Refreshing...");
const response = await fetch(url);
const data = await response.text();
const response2 = await fetch(url2);
const data2 = await response2.text();

const dom = new JSDOM(data);
const dom2 = new JSDOM(data2);

/*
var gpu = dom.window.document.querySelector(".sku-item-list .shop-sku-list-item .sku-title h4 a")
var price = dom.window.document.querySelector(".sku-item-list .shop-sku-list-item .priceView-hero-price.priceView-customer-price").firstChild
var stock = dom.window.document.querySelector(".sku-item-list .shop-sku-list-item .c-button")

console.log(gpu.textContent);
console.log(price.innerHTML);
if (!stock.disabled)
    console.log("IN STOCK");
else
    console.log("OUT OF STOCK");*/


const gpuList = Array.from(
    dom.window.document.querySelectorAll(".sku-item-list .shop-sku-list-item .sku-title h4 a")
);

const priceList = Array.from(
    dom.window.document.querySelectorAll(".sku-item-list .shop-sku-list-item .priceView-hero-price.priceView-customer-price")
);

const stockList = Array.from(
    dom.window.document.querySelectorAll(".sku-item-list .shop-sku-list-item .c-button")
);

const gpuList2 = Array.from(
    dom2.window.document.querySelectorAll(".sku-item-list .shop-sku-list-item .sku-title h4 a")
);

const priceList2 = Array.from(
    dom2.window.document.querySelectorAll(".sku-item-list .shop-sku-list-item .priceView-hero-price.priceView-customer-price")
);

const stockList2 = Array.from(
    dom2.window.document.querySelectorAll(".sku-item-list .shop-sku-list-item .c-button")
);

const currentdate = new Date();
const options = { year: '2-digit', month: '2-digit', day: '2-digit', 
                hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'};
const dateTimeFormat = new Intl.DateTimeFormat('en-US', options).format;
console.log(dateTimeFormat(currentdate));

const sorted = gpuList.slice().sort((a, b) => b.textContent.length - a.textContent.length);
var maxStrLength = sorted[0].textContent.length
const sorted2 = gpuList2.slice().sort((a, b) => b.textContent.length - a.textContent.length);
var maxStrLength2 = sorted2[0].textContent.length
var maxStrLength = maxStrLength > maxStrLength2 ? maxStrLength : maxStrLength2;

//const platform = navigator.userAgent;
//if (platform.includes("Win"))

const inStock = "\x1b[32m [IN STOCK] \x1b[0m";
const outOfStock = "\x1b[31m [OUT OF STOCK] \x1b[0m"


// 
//const inStock = "[IN STOCK]";
// const outOfStock = "[OUT OF STOCK]";
// 

console.log("--------------------RTX 3070-----------------------")
for (let i = 0; i < gpuList.length; i++)
{
    let name = gpuList[i].textContent;
    let price = priceList[i].firstChild.innerHTML;
    let nameLen = name.length;
    if (!(stockList[i].disabled))
        console.log(`${name} ${price} ${inStock.padStart((maxStrLength - nameLen) + inStock.length)}`);
    else
        console.log(`${name} ${price} ${outOfStock.padStart((maxStrLength - nameLen) + outOfStock.length)}`);
}

console.log("\n--------------------RTX 3060TI-----------------------")
for (let i = 0; i < gpuList2.length; i++)
{
    let name = gpuList2[i].textContent;
    let price = priceList2[i].firstChild.innerHTML;
    let nameLen = name.length;
    if (!(stockList2[i].disabled))
        console.log(`${name} ${price} ${inStock.padStart((maxStrLength - nameLen) + inStock.length)}`);
    else
        console.log(`${name} ${price} ${outOfStock.padStart((maxStrLength - nameLen) + outOfStock.length)}`);
}
