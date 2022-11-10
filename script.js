
const urlPattern = /https:\/\/reservecalifornia.com\/Web\/#!park\/.+\/.+/;
const urlMatched = urlPattern.test(window.location.href);


if (urlMatched) console.log("Hello from campsite watcher")
else console.log("hello but url didn't match")



// console.log("hello");
// let urlPattern = /https:\/\/reservecalifornia.com\/Web\/#!park\/.+\/.+/;
// let urlMatched = urlPattern.test(window.location.href);
// console.log(urlMatched);
// let tried = 0



// window.addEventListener("load", runScript);

// async function runScript() {

//   if (!urlMatched) return;

//   await sleep(1500)
//   const tableColumn = document.querySelector(`td[data-wg-notranslate="manual"]`);

//   if (!tableColumn) {
//     if (tried < 3) {
//       tried++
//       runScript()

//     }
//     return
//   }
//   const url = window.location.href;
//   // get the last number in the url using split
//   const parkId = url.split("/").pop();
//   tableColumn.innerHTML += parkId;
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
