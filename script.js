
let previousUrl = window.location.href;
let tried = 0
const refreshTimer = 1500

// observer
const observer = new MutationObserver(function () {
  if (window.location.href !== previousUrl) {
    previousUrl = window.location.href;
    runScript();
  }
});

const config = { subtree: true, childList: true };

window.addEventListener('load',runScript)
observer.observe(document, config);



async function runScript(){
  const urlPattern = /https:\/\/reservecalifornia.com\/Web\/.+\/.+\/.+/;
  const urlMatched = urlPattern.test(window.location.href);
  if (urlMatched) {
    loadColors()
    await sleep(refreshTimer)
    return runScript() 
  } 
  else console.log("URL no match")
}

async function loadColors(){
  console.log("URL Match")
  await sleep(refreshTimer)
  const tableColumn = document.querySelector(`td[data-wg-notranslate="manual"]`);
  if (!tableColumn) {
    console.log("No column")
    loadColors()
    return
  }
  const url = window.location.href
  const facilityId = url.split("/").pop()
  const facData = await pingReserveCAServer(facilityId)

  if (!facData.success) {
    await sleep(refreshTimer)
    loadColors()
    return
  }

  const popups = Object.values(facData.Units).map(unit=>{
    const {UnitId,Name,ShortName,RecentPopups} = unit
    return {UnitId,Name,ShortName,RecentPopups}
  })


  
  document.querySelectorAll(`td[data-wg-notranslate="manual"]`).forEach(unit=>{
    
    const popup = popups.filter(campsite=>campsite.Name==unit.textContent.split("-")[0])
    
    const addNumber = popup[0]["RecentPopups"]
    unit.innerHTML = unit.innerHTML.split("<sup>")[0] + `<sup>-${addNumber}</sup>`
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

  async function pingReserveCAServer(facilityId){
    const options = {dateStyle: "short",timeStyle: "long", timeZone: "America/Los_Angeles"}
    const runTime = new Date().toLocaleString("en-us",options)

    try {
    const today = new Date().toISOString().split("T")[0]
    const lastDayStamp = new Date().setDate(new Date().getDate()+180)
    const lastDay = new Date(lastDayStamp).toISOString().split("T")[0]
    let i =0
  
    const body = `{"IsADA":false,"MinVehicleLength":0,"UnitCategoryId":0,"StartDate":"${today}","WebOnly":true,"UnitTypesGroupIds":[],"SleepingUnitId":0,"EndDate":"${lastDay}","UnitSort":"orderby","InSeasonOnly":true,"FacilityId":"${facilityId}","RestrictADA":false}`
      
    
    
    const res = await fetch("https://calirdr.usedirect.com/RDR/rdr/search/grid", {
      "headers": {
        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      referrer: "https://reservecalifornia.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body ,
      method: "POST",
      mode: "cors",
      credentials: "omit"})
      
      const response = await res.json()

      if (!response.Facility.Units) {
        return {success:false,runTime, message: `${facilityId} failed`}
      } 
    
      const {Facility:{AvailableUnitCount,UnitCount,AvailableSliceCount,SliceCount,Units}} = response
  
      return { success: true,runTime, data: {AvailableUnitCount,UnitCount,AvailableSliceCount,SliceCount},Units}

    } catch(e) {
      console.log("Error: ",e.message)
      return {success:false,runTime, message: e.message}
    }
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
