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

// Определяем массив объектов с информацией о таблицах и их шаблонах строк
/* const MAX_ROWS = 14;
const tableTemplates = {
  table1: `<tr>
  <td><input class="from1" type="text"></td>
  <td><input class="to1" type="text"></td>
  <td><input class="msa1" type="text"></td>
  <td><input class="cas1" type="text"></td>
  <td><input class="feet1" type="text"></td>
  <td><input class="temp1" type="text"></td>
  <td><input class="tas_kts1" readonly type="text"></td>
  <td><input class="trk_t1" type="text"></td>
  <td><input class="wind_t1" type="text"></td>
  <td><input class="wind_kts1" type="text"></td>
  <td><input class="var_e_w1" type="text"></td>
</tr>`,
  table2: '<tr><td><input id="hdg1" readonly type="text"></td><td><input id="distance_nm1" type="text"></td><td><input id="gs_kts1" readonly type="text"></td><td><input id="eet1" readonly type="text"></td><td><input id="eta1" type="text"></td><td><input id="revised_eta1" type="text"></td><td><input id="ata1" type="text"></td><td><input id="leg_fuel1" readonly type="text"></td><td><input id="fuel_burn1" type="text"></td><td><input id="fuel_remain1" readonly type="text"></td><td><input id="fuel_on_board1" type="text"></td></tr > ',
  table3: '<td><input id="start_taxi1" type="text"></td><td><input id="reserve_fuel1" type="text"></td>',
  table4: '<tr><td><input id="notes1" type="text"></td></tr>',
  mobile1: '<tr><td><input id="from11" type="text"></td><td><input id="to11" type="text"></td><td><input id="msa11" type="text"></td><td><input id="cas11" type="text"></td></tr > ',
  mobile2: '<tr><td><input id="feet11" type="text"></td><td><input id="temp11" type="text"></td><td><input id="tas_kts11" readonly type="text"></td><td><input id="trk_t11" type="text"></td></tr>',
  mobile3: '<tr><td><input id="wind_t11" type="text"></td><td td ><input id="wind_kts11" type="text"></td><td><input id="var_e_w11" type="text"></td><td><input id="hdg11" readonly type="text"></td></tr>',
  mobile4: '<tr><td><input id="distance_nm11" type="text"></td><td><input id="gs_kts11" readonly type="text"></td><td><input id="eet11" readonly type="text"></td><td><input id="eta11" type="text"></td></tr>',
  mobile5: '<tr><td><input id="revised_eta11" type="text"></td><td><input id="ata11" type="text"></td><td><input id="leg_fuel11" readonly type="text"></td><td><input id="fuel_burn11" type="text"></td></tr>',
  mobile6: '<tr><td><input id="fuel_remain11" readonly type="text"></td><td><input id="fuel_on_board11" type="text"></td><td><input id="start_taxi11" type="text"></td><td><input id="reserve_fuel11" type="text"></td></tr > ',
  mobile7: '<tr><td><input id="notes11" type="text"></td></tr>',
};

const addRowButton = document.querySelector('#addRowButton');
const removeRowsButton = document.querySelector('#clearButton');
const tables = document.querySelectorAll('table');

tables.forEach(table => {
  const template = tableTemplates[table.id];
  if (template) {
    table.template = template;
  }
});

function addRowToTable(table) {
  const tbody = table.querySelector('tbody');
  const rowCount = tbody.children.length;
  if (rowCount + 3 > MAX_ROWS) {
    return;
  }
  let indexIncrement = -1; // начальное значение индекса
  if (window.innerWidth < 768) {
    indexIncrement = 11; // если экран меньше 768 пикселей, увеличиваем индекс на 2
  }
  for (let i = 0; i < 3; i++) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = table.template;
    newRow.classList.add('added-row');
    // Loop through all input fields in the template and update their IDs
    newRow.querySelectorAll('input').forEach(input => {
      const id = input.className;
      if (id) {
        const newId = id.replace(/\d+/, rowCount + i + indexIncrement);
        input.className = newId;
      }
    });
    tbody.appendChild(newRow);
  }
}

function addRow() {
  tables.forEach(table => {
    if (table.template) {
      addRowToTable(table);
    }
  });
}

function removeRows() {
  tables.forEach(table => {
    const tbody = table.querySelector('tbody');
    const addedRows = tbody.querySelectorAll('.added-row');
    addedRows.forEach(row => row.remove());
  });
} */

// Get a reference to the rows that you want to display
const allRows = document.querySelectorAll('.row-4, .row-5, .row-6, .row-7, .row-8, .row-9');
const rows4to6 = document.querySelectorAll('.row-4, .row-5, .row-6');
const rows7to9 = document.querySelectorAll('.row-7, .row-8, .row-9');
let clickCounter = 0;

function addRows() {
  clickCounter++;
  switch (clickCounter) {
    case 1:
      rows4to6.forEach(row => row.classList.add('show'));
      break;
    case 2:
      rows7to9.forEach(row => row.classList.add('show'));
      break;
    default:
      break;
  }
}

function clearRows() {
  allRows.forEach(row => row.classList.remove('show'));
  const inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
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
      inputs[i - 1].feet.addEventListener("input", calculateTasKts);
      inputs[i - 1].trkT.addEventListener("input", calculateHdg);
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
      calculateHdg();
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
      (input.trkT === this) ||
      (input.windT === this) ||
      (input.windKts === this) ||
      (input.varEW === this)
    );
    if (index === -1) {
      return;
    }
    const tasKtsInput = Math.round(inputs[index].tasKts.value);
    const trkTInput = parseFloat(inputs[index]?.trkT?.value);
    const windTInput = parseFloat(inputs[index]?.windT?.value);
    const windKtsInput = parseFloat(inputs[index]?.windKts?.value);
    const varEWValInput = parseFloat(inputs[index]?.varEW?.value);
    if (!isNaN(tasKtsInput) && !isNaN(trkTInput) && !isNaN(windTInput) && !isNaN(windKtsInput) && !isNaN(varEWValInput) && windKtsInput !== 0) {
      const windAngle = Math.atan((windKtsInput * Math.sin((windTInput - trkTInput) * Math.PI / 180)) / tasKtsInput);
      const windAngleDeg = windAngle * 180 / Math.PI;
      const HDG = trkTInput + varEWValInput + windAngleDeg;
      inputs[index].hdg.value = Math.round(HDG);
    } else {
      inputs[index].hdg.value = "";
    }
  }
  function calculateGsKts() {
    const index = inputs.findIndex(input =>
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
    console.log(tasKtsInput);
    console.log(trkTInput);
    console.log(windTInput);
    console.log(windKtsInput);
    if (!isNaN(tasKtsInput) && !isNaN(trkTInput) && !isNaN(windTInput) && !isNaN(windKtsInput)) {
      const radians = Math.PI / 180;
      const term1 = tasKtsInput * Math.sqrt(1 - Math.pow((windKtsInput / tasKtsInput) * Math.sin((windTInput - trkTInput) * radians), 2));
      const term2 = windKtsInput * Math.cos((windTInput - trkTInput) * radians);
      inputs[index].gsKts.value = Math.round(term1 - term2);
    } else {
      inputs[index].gsKts.value = "";
    }
    calculateEet();
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

let sartime = document.getElementById("sartime");

sartime.addEventListener("keypress", function (event) {
  let char = event.which || event.keyCode;
  if (char !== 46 && char !== 44 && char !== 58 && char < 48 || char > 57) {
    event.preventDefault();
  }
});