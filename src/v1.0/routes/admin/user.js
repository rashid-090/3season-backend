const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const userController = require("../../controllers/user");
const exceljs = require("exceljs");
const { getUsersByMatch } = require("../../services/internal/user");

// GET  : Get all User
router.get("/", makeCallback(userController.getUsersList));

// GET  : Get all applied jobs
router.get("/applied", makeCallback(userController.getAppliedList));

// GET  : Export user excel
router.post("/excel", async (req, res) => {
    try {
      // Fetch data from MongoDB or any other source
      const data = await getUsersByMatch({ _id: req?.body?.selectedEmployees });
  
      // Extract relevant fields from each item in the data
      const filteredData = data.map(item => ({
        name: item.fullName,
        email: item.email,
        webUrl: item.webUrl,
        companyName: item.companyName,
        address: item.address,
      }));
  
      // Create a new Excel workbook and worksheet
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');
  
      // Add columns to the worksheet
      worksheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Web URL', key: 'webUrl', width: 20 },
        { header: 'Company Name', key: 'companyName', width: 20 },
        { header: 'Address', key: 'address', width: 20 },
      ];
  
      // Add filtered data to the worksheet
      worksheet.addRows(filteredData);
  
      // Set the response headers
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
  
      // Send the workbook as a response
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  

  router.post("/excel-employee", async (req, res) => {
    try {
      // Fetch data from MongoDB or any other source
      const data = await getUsersByMatch({ _id: req?.body?.selectedEmployees });
      console.log(data);
  
      // Extract relevant fields from each item in the data
      const filteredData = data.map(item => ({
        fullName: item.fullName,
        email: item.email,
        workExperince: item.workExperince,
        address: item.address,
        language: item.language,
        Expectedsalary: item.Esalary,
        Currentsalary: item.Csalary,
        city: item.city,
        country: item.country,
        phoneNumber: item.phoneNumber,
        designation: item.designation,
        dob: item.dob,
      }));
  
      // Create a new Excel workbook and worksheet
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');
  
      // Add columns to the worksheet
      worksheet.columns = [
        { header: 'fullName', key: 'fullName', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Work Experince', key: 'workExperince', width: 20 },
        { header: 'Address', key: 'address', width: 20 },
        { header: 'Language', key: 'language', width: 20 },
        { header: 'Expected salary', key: 'Expectedsalary', width: 20 },
        { header: 'Current salary', key: 'Currentsalary', width: 20 },
        { header: 'city', key: 'city', width: 20 },
        { header: 'country', key: 'country', width: 20 },
        { header: 'Phone Number', key: 'phoneNumber', width: 20 },
        { header: 'Designation', key: 'designation', width: 20 },
        { header: 'DOB', key: 'dob', width: 20 },
      ];
  
      // Add filtered data to the worksheet
      worksheet.addRows(filteredData);
  
      // Set the response headers
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=exported_data.xlsx');
  
      // Send the workbook as a response
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// GET  : Get specified User
router.get("/:id", makeCallback(userController.getUser));


module.exports = router;
