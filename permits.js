<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <title>Wisconsin Plumbing Permit Lookup</title>  <style>    body {      font-family: Arial, sans-serif;      padding: 40px;      max-width: 700px;    }    input {      width: 100%;      padding: 10px;      font-size: 16px;      margin-bottom: 10px;    }    button {      padding: 10px 16px;      font-size: 16px;      cursor: pointer;    }    .result {      margin-top: 20px;      padding: 15px;      background: #f4f4f4;      white-space: pre-wrap;    }  </style></head><body>
<script>  // Simple password protection  const password = "plumbing2026"; // change to your paid-user password  const entered = prompt("Enter password to access the site:");  if (entered !== password) {    document.body.innerHTML = "<h2>Access denied</h2>";    throw "Access denied";  }</script>
<h2>Wisconsin Plumbing Permit Lookup</h2>
<input id="address" placeholder="Enter a Wisconsin address" /><button onclick="lookup()">Look it up</button>
<div class="result" id="result"></div>
<script>const API_KEY = "PASTE_YOUR_API_KEY_HERE"; // replace with your Google Maps Geocoding API key
// Permit offices list (expandable)const permitOffices = [  {    type: "city",    name: "City of Madison",    county: "Dane",    contact: "Building Inspection Division, 215 Martin Luther King Jr Blvd, Madison, WI 53703",    phone: "(608) 266-4551",    website: "https://www.cityofmadison.com/dpced/bi/"  },  {    type: "county",    name: "Dane County",    county: "Dane",    contact: "Dane County Department of Planning & Development, 210 Martin Luther King Jr Blvd, Madison, WI 53703",    phone: "(608) 266-4331",    website: "https://planning.countyofdane.com/"  },  {    type: "city",    name: "City of Milwaukee",    county: "Milwaukee",    contact: "Department of Neighborhood Services, 841 N Broadway, Milwaukee, WI 53202",    phone: "(414) 286-8210",    website: "https://city.milwaukee.gov/DNS"  },  {    type: "county",    name: "Milwaukee County",    county: "Milwaukee",    contact: "Milwaukee County Permit Office, 901 N 9th St, Milwaukee, WI 53233",    phone: "(414) 278-4200",    website: "https://county.milwaukee.gov/"  }];
// Find permit office by city first, then countyfunction findPermitOffice(city, town, county) {  let office = permitOffices.find(o => o.type === "city" && o.name.includes(city));  if (!office) {    office = permitOffices.find(o => o.type === "county" && o.county === county);  }  return office || null;}
async function lookup() {  const address = document.getElementById("address").value;  const resultBox = document.getElementById("result");
  if (!address) {    resultBox.textContent = "Enter an address.";    return;  }
  resultBox.textContent = "Looking up address...";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  try {    const res = await fetch(url);    const data = await res.json();
    if (!data.results.length) {      resultBox.textContent = "Address not found.";      return;    }
    const components = data.results[0].address_components;    const get = (type) =>      components.find(c => c.types.includes(type))?.long_name || "Not found";
    const city = get("locality");    const town = get("administrative_area_level_3");    const county = get("administrative_area_level_2").replace(" County", "");
    resultBox.textContent =`City: ${city}Town: ${town}County: ${county}`;
    const office = findPermitOffice(city, town, county);
    if (office) {      resultBox.textContent += `
Permit Office:Name: ${office.name}Contact: ${office.contact}Phone: ${office.phone}Website: ${office.website}`;    } else {      resultBox.textContent += `
Permit Office: Not found. Check with local authorities.`;    }
  } catch (err) {    console.error(err);    resultBox.textContent = "Error looking up address.";  }}</script>
<p style="font-size:0.9em;color:gray;">This tool helps locate Wisconsin plumbing permit offices. Always confirm requirements directly with the issuing authority. This site is not affiliated with the state government.</p>
</body></html>
