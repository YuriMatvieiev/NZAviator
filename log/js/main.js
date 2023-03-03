function hideBlock(index) {
  blocks[index].style.display = "none";
}

function showBlock(index) {
  blocks[index].style.display = "block";
}

var blocks = document.getElementsByClassName("log__table-mobile");
var currentIndex = 0;

function nextBlocks() {
  if (blocks.length === 0) return;

  hideBlock(currentIndex);

  currentIndex++;
  if (currentIndex >= blocks.length) {
    currentIndex = 0;
  }

  showBlock(currentIndex);
}

function previousBlock() {
  if (blocks.length === 0) return;

  hideBlock(currentIndex);

  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = blocks.length - 1;
  }

  showBlock(currentIndex);
}

// Get a reference to the rows that you want to display
const allRows = document.querySelectorAll('.row-4, .row-5, .row-6, .row-7, .row-8, .row-9, .row-10, .row-11, .row-12');
const rows = [document.querySelectorAll('.row-4'), document.querySelectorAll('.row-5'), document.querySelectorAll('.row-6'), document.querySelectorAll('.row-7'), document.querySelectorAll('.row-8'), document.querySelectorAll('.row-9'), document.querySelectorAll('.row-10'), document.querySelectorAll('.row-11'), document.querySelectorAll('.row-12')];
let clickCounter = 0;

function addRows() {
  clickCounter++;
  if (clickCounter > 0 && clickCounter <= 9) {
    rows[clickCounter - 1].forEach(row => row.classList.add('show'));
  }
}

function clearRows() {
  allRows.forEach(row => row.classList.remove('show'));
  document.querySelectorAll('input').forEach(input => input.value = '');
  clickCounter = 0;
}


document.addEventListener("input", function () {
  const inputs = [];
  const maxRows = 24;

  for (let i = 1; i <= maxRows; i++) {
    inputs.push({
      cas: document.getElementsByClassName("cas" + i)[0],
      feet: document.getElementsByClassName("feet" + i)[0],
      tasKts: document.getElementsByClassName("tas_kts" + i)[0],
      trkT: document.getElementsByClassName("trk_t" + i)[0],
      windT: document.getElementsByClassName("wind_t" + i)[0],
      windKts: document.getElementsByClassName("wind_kts" + i)[0],
      varEW: document.getElementsByClassName("var_e_w" + i)[0],
      hdg: document.getElementsByClassName("hdg" + i)[0],
      gsKts: document.getElementsByClassName("gs_kts" + i)[0],
      distanceNM: document.getElementsByClassName("distance_nm" + i)[0],
      eet: document.getElementsByClassName("eet" + i)[0],
      legFuel: document.getElementsByClassName("leg_fuel" + i)[0],
      fuelBurn: document.getElementsByClassName("fuel_burn" + i)[0],
      fuelRemain: document.getElementsByClassName("fuel_remain" + i)[0],
      fuelOnBoard: document.getElementsByClassName("fuel_on_board" + i)[0],
    });

    // Add event listeners and input calculations for each input field

    if (inputs[i - 1].cas) {
      inputs[i - 1].cas.addEventListener("input", calculateTasKts);
      inputs[i - 1].cas.addEventListener("input", updateGSandHDG); // add event listener for 'CAS' input field
      inputs[i - 1].feet.addEventListener("input", calculateTasKts);
      inputs[i - 1].trkT.addEventListener("input", calculateHdg);
      calculateHdg(); // call calculateHdg() once here to set initial values
      calculateGsKts(); // call calculateGsKts() once here to set initial values
    }

    if (inputs[i - 1].windT) {
      inputs[i - 1].windT.addEventListener("input", calculateHdg);

      inputs[i - 1].windKts.addEventListener("input", calculateHdg);
      inputs[i - 1].varEW.addEventListener("input", calculateHdg);
    }
    if (inputs[i - 1].distanceNM) {
      inputs[i - 1].distanceNM.addEventListener("input", calculateEet);
    }
    if (inputs[i - 1].eet) {
      inputs[i - 1].eet.addEventListener("input", calculateLegFuel);
    }
    if (inputs[i - 1].fuelBurn) {
      inputs[i - 1].fuelBurn.addEventListener("input", calculateLegFuel);
    }


    if (inputs[i - 1].windT) {
      inputs[i - 1].windT.addEventListener("input", calculateGsKts);
      inputs[i - 1].tasKts.addEventListener("input", calculateGsKts);
      inputs[i - 1].trkT.addEventListener("input", calculateGsKts);
      inputs[i - 1].windKts.addEventListener("input", calculateGsKts);

    }
    if (inputs[i - 1].fuelOnBoard) {
      inputs[i - 1].fuelOnBoard.addEventListener("input", calculateLegFuel);

    }
  }



  function calculateTasKts() {
    const index = inputs.findIndex(input => input.cas === this || input.feet === this);
    const cas = parseFloat(inputs[index].cas.value);
    const feet = parseFloat(inputs[index].feet.value);
    if (!isNaN(cas) && !isNaN(feet)) {
      const tasKts = cas + (cas * ((feet / 1000) * 0.02));
      inputs[index].tasKts.value = tasKts.toFixed(1);
      calculateHdg(); // calculate hdg
      calculateGsKts();
    } else {
      inputs[index].tasKts.value = "";
    }
    const someInputsFilled = inputs.some(input =>
      input.trkT && input.windT && input.windKts && input.varEW &&
      input.trkT.value.trim() !== "" && input.windT.value.trim() !== "" &&
      input.windKts.value.trim() !== "" && input.varEW.value.trim() !== ""
    );
    if (someInputsFilled) {
      calculateHdg();
    }
  }

  function calculateHdg() {
    const index = inputs.findIndex(input =>
      (input.cas === this) ||
      (input.feet === this) || // add feet input here
      (input.trkT === this) ||
      (input.windT === this) ||
      (input.windKts === this) ||
      (input.varEW === this)
    );
    if (index === -1) {
      return;
    }
    const casInput = parseFloat(inputs[index]?.cas?.value);
    const feetInput = parseFloat(inputs[index]?.feet?.value);
    const tasKtsInput = Math.round(inputs[index].tasKts.value);
    const trkTInput = parseFloat(inputs[index]?.trkT?.value);
    const windTInput = parseFloat(inputs[index]?.windT?.value);
    const windKtsInput = parseFloat(inputs[index]?.windKts?.value);
    const varEWValInput = parseFloat(inputs[index]?.varEW?.value);
    if (!isNaN(casInput) && !isNaN(feetInput) && !isNaN(tasKtsInput) && !isNaN(trkTInput) && !isNaN(windTInput) && !isNaN(varEWValInput)) {
      const windAngle = (windKtsInput !== 0) ? Math.atan((windKtsInput * Math.sin((windTInput - trkTInput) * Math.PI / 180)) / tasKtsInput) : 0;
      const windAngleDeg = windAngle * 180 / Math.PI;
      const HDG = trkTInput + varEWValInput + windAngleDeg;

      if (HDG < 0) {
        let newHDG = 360 + HDG;
        inputs[index].hdg.value = newHDG.toFixed(0).padStart(3, '0');
      } else {
        inputs[index].hdg.value = HDG.toFixed(0).padStart(3, '0');
      }
      calculateGsKts();
      if (inputs[index].cas) {
        inputs[index].cas.addEventListener("input", calculateHdg);
      }
      if (inputs[index].feet) {
        inputs[index].feet.addEventListener("input", calculateHdg);
      }
    } else {
      inputs[index].hdg.value = "";
    }
  }

  function updateGSandHDG() {
    calculateGsKts();
    calculateHdg();
  }
  function calculateGsKts() {
    const index = inputs.findIndex(input =>
      (input.cas === this) ||
      (input.feet === this) || // add feet input here
      (input.trkT === this) ||
      (input.windT === this) ||
      (input.windKts === this) ||
      (input.tasKts === this)
    );
    if (index === -1) {
      return;
    }
    const tasKtsInput = Math.round(inputs[index].tasKts.value);
    const trkTInput = parseFloat(inputs[index]?.trkT?.value);
    const windTInput = parseFloat(inputs[index]?.windT?.value);
    const windKtsInput = parseFloat(inputs[index]?.windKts?.value);
    const feetInput = parseFloat(inputs[index]?.feet?.value);

    if (!isNaN(tasKtsInput) && !isNaN(trkTInput) && !isNaN(windTInput) && !isNaN(windKtsInput) && !isNaN(feetInput)) {
      const radians = Math.PI / 180;
      const term1 = tasKtsInput * Math.sqrt(1 - Math.pow((windKtsInput / tasKtsInput) * Math.sin((windTInput - trkTInput) * radians), 2));
      const term2 = windKtsInput * Math.cos((windTInput - trkTInput) * radians);
      inputs[index].gsKts.value = Math.round(term1 - term2);
    } else {
      inputs[index].gsKts.value = "";
    }
    calculateEet();
    if (inputs[index].cas) {
      inputs[index].cas.addEventListener("input", calculateGsKts);
    }
    if (inputs[index].feet) { // add event listener for feet input here
      inputs[index].feet.addEventListener("input", calculateGsKts);
    }
    if (inputs[index].windT) {
      inputs[index].windT.addEventListener("input", calculateGsKts);
    }
    if (inputs[index].windKts) {
      inputs[index].windKts.addEventListener("input", calculateGsKts);
    }
    if (inputs[index].tasKts) {
      inputs[index].tasKts.addEventListener("input", calculateGsKts);
    }
    if (inputs[index].trkT) {
      inputs[index].trkT.addEventListener("input", calculateGsKts);
    }
  }

  function calculateEet() {
    const index = inputs.findIndex(input =>
      (input.gsKts === this) ||
      (input.distanceNM === this)
    );
    if (index === -1) {
      return;
    }
    const gsKtsInput = parseFloat(inputs[index]?.gsKts?.value);
    const distanceNMInput = parseFloat(inputs[index]?.distanceNM?.value);
    if (!isNaN(gsKtsInput) && !isNaN(distanceNMInput) && gsKtsInput !== 0) {
      const eet = distanceNMInput / gsKtsInput * 60;
      inputs[index].eet.value = eet.toFixed(0);
    } else {
      inputs[index].eet.value = "";
    }
    calculateLegFuel();
  }

  function calculateLegFuel() {
    for (let i = 0; i < inputs.length; i++) {
      const eet = parseFloat(inputs[i]?.eet?.value);
      const fuelBurn = parseFloat(inputs[i]?.fuelBurn?.value);
      const fuelOnBoard = parseFloat(inputs[i]?.fuelOnBoard?.value);
      if (!isNaN(eet) && !isNaN(fuelBurn) && eet !== 0) {
        const legFuel = eet / 60 * fuelBurn;
        if (inputs[i].legFuel) {
          inputs[i].legFuel.value = legFuel.toFixed(1);
          if (!isNaN(fuelOnBoard)) {
            const fuelRemain = fuelOnBoard - legFuel;
            inputs[i].fuelRemain.value = fuelRemain.toFixed(1);
          }
        }
      } else {
        if (inputs[i].legFuel) {
          inputs[i].legFuel.value = "";
          inputs[i].fuelRemain.value = "";
        }
      }
    }
  }


});


const inputs = document.querySelectorAll('.from1, .from2, .from3,.from4, .from5, .from6,.from7, .from8, .from9,.from10, .from11, .from12,.from13, .from14, .from15,.from16, .from17, .from18, .to1, .to2, .to3,.to4, .to5, .to6,.to7, .to8, .to9,.to10, .to11, .to12,.to13, .to14, .to15,.to16, .to17, .to18');

inputs.forEach(input => {
  input.addEventListener('input', function (event) {
    const value = event.target.value;
    const onlyLetters = /^[a-zA-Z]*$/;
    if (!onlyLetters.test(value)) {
      event.target.value = value.replace(/[^a-zA-Z]/g, '');
    }
    if (value.length > 5) {
      event.target.value = value.slice(0, 5);
    }
  });
});

// Get the input field element
const sartimeInput = document.getElementById("sartime");

// Add an event listener to the input field for the "keypress" event
sartimeInput.addEventListener("keypress", function (event) {
  // Get the character code of the pressed key
  const charCode = event.which || event.keyCode;

  // Allow numbers (48-57), colon (58), dot (46), and comma (44)
  if (charCode >= 48 && charCode <= 57 || charCode === 58 || charCode === 46 || charCode === 44) {
    // Allow the character to be typed
    return true;
  }

  // Prevent the character from being typed
  event.preventDefault();
  return false;
});