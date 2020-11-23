const express = require("express");
const employee = require("../models/employee");
const router = express.Router();

const Employee = require("../models/employee");

router.get("/", (req, res) => {
  Employee.find({})
    .then((employees) => {
      res.render("index", { employees: employees });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
      console.log(err);
    });
});

router.get("/addnewemployee", (req, res) => {
  res.render("new");
});

router.get("/search", (req, res) => {
  res.render("search", { employee: "" });
});

router.get("/edit", (req, res) => {
  res.render("update");
});

router.get("/employee", (req, res) => {
  let searchQuery = { name: req.query.name };
  Employee.findOne(searchQuery)
    .then((employee) => {
      res.render("search", { employee: employee });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
      console.log(err);
    });
});

router.get("/edit/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };

  Employee.findOne(searchQuery)
    .then((employee) => {
      res.render("update", { employee: employee });
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
      console.log(err);
    });
});

router.post("/addnewemployee", (req, res) => {
  let newEmployee = {
    name: req.body.name,
    designation: req.body.designation,
    salary: req.body.salary,
  };

  Employee.create(newEmployee)
    .then((employee) => {
      req.flash("success_msg", "Employee Created Successfully");

      res.redirect("/");
      console.log("success");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
      console.log(err);
    });
});

router.put("/edit/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };
  console.log(req.body.designation, req.body.name, req.body.salary);

  Employee.updateOne(searchQuery, {
    $set: {
      name: req.body.name,
      designation: req.body.designation,
      salary: req.body.salary,
    },
  })
    .then((employee) => {
      req.flash("success_msg", "Employee Update Successfully");

      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");
      console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  let searchQuery = { _id: req.params.id };
  Employee.deleteOne(searchQuery)
    .then((employee) => {
      req.flash("success_msg", "Employee delete Successfully");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/");

      console.log(err);
    });
});

module.exports = router;
