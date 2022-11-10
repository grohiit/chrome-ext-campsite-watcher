
let previousUrl = window.location.href;
let tried = 0

// observer
const observer = new MutationObserver(function () {
  if (window.location.href !== previousUrl) {
    previousUrl = window.location.href;
    runScript();
  }
});

// window.addEventListener('load',runScript)
// observer.observe(document, config);

const config = { subtree: true, childList: true };


window.addEventListener("load", function () {
  observer.observe(document.body, config);
});


async function runScript(){
  const urlPattern = /https:\/\/reservecalifornia.com\/Web\/.+\/.+\/.+/;
  const urlMatched = urlPattern.test(window.location.href);
  if (urlMatched) loadColors()
  else console.log("URL no match: Load")
  await sleep(5000)
  runScript()
}

async function loadColors(){
    const tableColumn = document.querySelector(`td[data-wg-notranslate="manual"]`);
    if (!tableColumn) {
      await sleep(1500)
      loadColors()
      return
    }
    document.querySelectorAll(`td[data-wg-notranslate="manual"]`).forEach(unit=>{
      const addNumber = randBetween(0,10)
      unit.innerHTML = unit.innerHTML.split("<sup>")[0] + `<sup>${addNumber} people</sup>`
      if (addNumber<3) unit.style.backgroundColor = "#84fa6a"
      else if (addNumber<6) unit.style.backgroundColor = "#efff42"
      else unit.style.backgroundColor = "#f66"

      unit.style.paddingLeft="10px"
      unit.style.borderTop = "2px solid white"
    })
}

function randBetween (min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




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
