
const numEmployees = 12;
const gridDiv = document.getElementById('grid');
const overlay = document.getElementById('overlay');
let employees = [];


// Utility Functions
const getStateCode = stateName => {
  const states = {
    'Arizona': 'AZ',
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  };
  return states[stateName];
}

const birthdateToBDay = birthdate => {
  birthdate = birthdate.slice(0, 10);
  const yearAbbrev = birthdate.slice(2, 4);
  const month = birthdate.slice(5, 7);
  const day = birthdate.slice(8);
  return `${month}/${day}/${yearAbbrev}`;
}

//SOMETHING ELSE
const createModalPopUp = (employee, overlay) => {
  const modalDiv = document.createElement('div');
  modalDiv.className = "employee-modal";

  modalDiv.innerHTML = `
  <img src="${employee.photo}" alt="A headshot of ${employee.name}">
  <div class="employee-basic-info">
  <h3>${employee.name}</h3>
  <p>${employee.email}</p>
  <p>${employee.city}</p>
  </div>
  <br>
  <div class="employee-extra-info">
  <p>${employee.phone}</p>
  <p>${employee.address}</p>
  <p>${employee.birthday}</p>
  </div>
  `;

  overlay.appendChild(modalDiv);
}


const giveEmployeeDivListener = (employee, employeeDiv, overlay) => {
  employeeDiv.addEventListener('click', () => {
    overlay.className = '';
    createModalPopUp(employee, overlay);
  })
}


const addEmployeeToGrid = (employee, grid, overlay) => {
  const employeeDiv = document.createElement('div');
  employeeDiv.className = "employee-grid";

  employeeDiv.innerHTML = `
  <img src="${employee.photo}" alt="A headshot of ${employee.name}">
  <div class="employee-info">
  <h3>${employee.name}</h3>
  <p>${employee.email}</p>
  <p>${employee.city}</p>
  </div>
  `;

  grid.appendChild(employeeDiv);

  giveEmployeeDivListener(employee, employeeDiv, overlay);
}


const createEmployeeElements = (employee, index, grid, overlay) => {
  const photo = employee.picture.large;
  const name = employee.name.first + " " + employee.name.last;
  const email = employee.email;
  const city = employee.location.city;
  const phone = employee.cell;
  const streetAdress = employee.location.street.number + " " +
    employee.location.street.name + ", " + getStateCode(employee.location.state + " " +
      employee.location.postcode);
  const birthday = `Birthday: ${birthdateToBDay(employee.dob.date)}`;

  //Make employee object
  const newEmployee = new Employee(index, photo, name, email, city, phone, streetAdress, birthday);
  //Append employee object to list of employees
  employees.push(newEmployee);
  //Make Div for grid
  addEmployeeToGrid(newEmployee, grid, overlay);
}


fetch(`https://randomuser.me/api/?nat=us&results=12`)
  .then(response => response.json())
  .then(data => data.results)
  .then(results => results.forEach((employee, index) => createEmployeeElements(employee, index, gridDiv, overlay)));