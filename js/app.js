
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
const createModalEmployeeInfo = (index, employees) => {
  const employee = employees[index];
  const img = document.createElement('img');
  img.src = employee.photo;
  img.alt = `A headshot of ${employee.name}`;
  img.className = "employee-photo";

  const basicInfo = document.createElement('div');
  basicInfo.className = "employee-basic-info";
  const name = document.createElement('h3');
  const email = document.createElement('p');
  const city = document.createElement('p');
  name.innerText = employee.name;
  email.innerText = employee.email;
  city.innerText = employee.city;
  basicInfo.appendChild(name);
  basicInfo.appendChild(email);
  basicInfo.appendChild(city);

  const hr = document.createElement('hr');

  const extraInfo = document.createElement('div');
  extraInfo.className = "employee-extra-info";
  const phone = document.createElement('p');
  const address = document.createElement('p');
  const birthday = document.createElement('p');
  phone.innerText = employee.phone;
  address.innerText = employee.address;
  birthday.innerText = employee.birthday;
  extraInfo.appendChild(phone);
  extraInfo.appendChild(address);
  extraInfo.appendChild(birthday);

  return {
    'img': img,
    'basicInfo': basicInfo,
    'hr': hr,
    'extraInfo': extraInfo,
  };
}


const removeModalEmployeeInfo = modalDiv => {
  const img = document.querySelector('.employee-modal img');
  const basicInfo = document.querySelector('.employee-basic-info');
  const hr = document.querySelector('hr');
  const extraInfo = document.querySelector('.employee-extra-info');
  const toRemove = [img, basicInfo, hr, extraInfo];

  toRemove.forEach(elmt => modalDiv.removeChild(elmt));
}


const createScrollButton = (direction, currIndex, modalDiv, employees) => {
  //Create scroll button
  const modalScrollBtn = document.createElement('button');
  modalScrollBtn.className = `scroll-btn`;
  modalScrollBtn.currIndex = currIndex;
  modalScrollBtn.innerText = (direction === "left") ? "<" : ">";

  //Give button functionality
  modalScrollBtn.addEventListener('click', () => {


    //New Index
    const indexChange = (direction === "left") ? (-1) : (1);
    const proposedIndex = modalScrollBtn.currIndex + indexChange;
    let newIndex = -1;
    if (proposedIndex >= 0 && proposedIndex < 12) {
      newIndex = proposedIndex;
    } else if (proposedIndex < 0) {
      newIndex = proposedIndex + 12;
    } else {
      newIndex = proposedIndex - 12;
    }

    //Change inner HTML
    const divInnerHTML = createModalEmployeeInfo(newIndex, employees)
    removeModalEmployeeInfo(modalDiv);
    const firstScrollBtn = document.querySelector('.scroll-btn');
    modalDiv.insertBefore(divInnerHTML.img, firstScrollBtn);
    modalDiv.insertBefore(divInnerHTML.basicInfo, firstScrollBtn);
    modalDiv.insertBefore(divInnerHTML.hr, firstScrollBtn);
    modalDiv.insertBefore(divInnerHTML.extraInfo, firstScrollBtn);

    //Update scroll buttons with index
    const scrollBtns = document.querySelectorAll('.scroll-btn');
    scrollBtns.forEach(btn => {
      btn.currIndex = newIndex;
    })

  })

  //Add scroll button to div
  modalDiv.appendChild(modalScrollBtn);
}


const createModalPopUp = (index, employees, overlay) => {
  //Create modal div
  const modalDiv = document.createElement('div');
  modalDiv.className = "employee-modal";

  //Create close button
  const modalCloseBtn = document.createElement('button');
  modalCloseBtn.className = 'end-modal-btn';
  modalCloseBtn.innerHTML = '<p>X</p>';
  modalCloseBtn.addEventListener('click', () => {
    let modalWindows = document.querySelectorAll('.employee-modal');
    modalWindows.forEach(modalWindow => overlay.removeChild(modalWindow));
    overlay.className = 'hidden';
    overlay.style.display = 'none';
  })

  //Inner HTML
  const divInnerHTML = createModalEmployeeInfo(index, employees);
  modalDiv.appendChild(divInnerHTML.img);
  modalDiv.appendChild(divInnerHTML.basicInfo);
  modalDiv.appendChild(divInnerHTML.hr);
  modalDiv.appendChild(divInnerHTML.extraInfo);


  //Add scroll buttons
  createScrollButton('left', index, modalDiv, employees);
  createScrollButton('right', index, modalDiv, employees);

  //Add div to DOM
  overlay.appendChild(modalDiv);

  //Add button to div
  const photo = document.querySelector('.employee-modal img');
  modalDiv.insertBefore(modalCloseBtn, photo);
}


const giveEmployeeDivListener = (employee, employeeDiv, overlay) => {
  employeeDiv.addEventListener('click', () => {
    overlay.className = '';
    overlay.style.display = 'flex';
    createModalPopUp(employee.id, employees, overlay);
  })
}


const addEmployeeToGrid = (employee, grid, overlay) => {
  const employeeDiv = document.createElement('div');
  employeeDiv.className = "employee-grid";

  employeeDiv.innerHTML = `
  <img src="${employee.photo}" alt="A headshot of ${employee.name}" class="employee-photo">
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
    employee.location.street.name + ", " + getStateCode(employee.location.state)
    + " " + employee.location.postcode;
  const birthday = `Birthday: ${birthdateToBDay(employee.dob.date)}`;

  //Make employee object
  const newEmployee = new Employee(index, photo, name, email, city, phone, streetAdress, birthday);
  //Append employee object to list of employees
  employees.push(newEmployee);
  //Make Div for grid
  addEmployeeToGrid(newEmployee, grid, overlay);
}


fetch(`https://randomuser.me/api/?nat=us&results=${numEmployees}`)
  .then(response => response.json())
  .then(data => data.results)
  .then(results => results.forEach((employee, index) => createEmployeeElements(employee, index, gridDiv, overlay)));

