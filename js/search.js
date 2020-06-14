const setupSearch = () => {

  const searchBar = document.querySelector('.search-bar');
  const employeeDivs = document.querySelectorAll('.employee-grid');

  searchBar.addEventListener('keyup', () => {
    const searchTerm = searchBar.value.toLowerCase();
    employeeDivs.forEach(employeeDiv => {
      const employeeName = employeeDiv.querySelector('.employee-info h3').innerText.toLowerCase();

      if (!employeeName.includes(searchTerm)) {
        employeeDiv.style.display = "none";
      } else {
        employeeDiv.style.display = "flex";
      }

    })
  })
}