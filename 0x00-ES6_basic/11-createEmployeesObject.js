export default function createReportObject(employeesList) {
  // Initialize an object to store department-wise employees
  const allEmployees = {};

  // Iterate over each department in employeesList
  for (const department in employeesList) {
    // Assign employees to the respective department
    allEmployees[department] = [...employeesList[department]];
  }

  // Define the getNumberOfDepartments method using ES6 method syntax
  const getNumberOfDepartments = () => Object.keys(allEmployees).length;

  // Return the report object containing allEmployees and getNumberOfDepartments method
  return {
    allEmployees,
    getNumberOfDepartments,
  };
}
