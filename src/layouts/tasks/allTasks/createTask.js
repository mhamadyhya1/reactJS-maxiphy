/* eslint-disable no-const-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-return-assign */
/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Select from "react-select";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RequestEngine from "../../../core/RequestEngine";

function CreateTask() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [selecteUser, setSelecteUser] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const engine = new RequestEngine();
  const fetchUsers = async () => {
    const response = await engine.getUsers();
    setUsers(response.data);
  };
  const onSubmit = async () => {
    const data = {
      title: form.title,
      description: form.description,
      status: selectedStatus.value,
      userID: selecteUser.value,
    };
    const response = await engine.createTask(data);
    if (response.status === 201) {
      navigate("/task/all");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleChangeUser = (selectedOption) => {
    setSelecteUser(selectedOption);
  };
  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }
  function selectAssignee() {
    const arr = [];
    let z = {};
    users.map((e) => {
      z = {
        value: e.id,
        label: e.name,
      };
    });
    arr.push(z);
    return (
      <Select
        isSearchable
        placeholder="Please select Assignee"
        value={selecteUser}
        onChange={handleChangeUser}
        options={arr}
        openOnFocus
        autofocus
      />
    );
  }
  const handleChangeStatus = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };
  function selectStatus() {
    const arr = [
      { value: "pending", label: "Pending" },
      { value: "progress", label: "Progress" },
      { value: "complete", label: "Complete" },
    ];
    return (
      <Select
        isSearchable
        placeholder="Please select Status"
        value={selectedStatus}
        onChange={handleChangeStatus}
        options={arr}
      />
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create New Tasks
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <TextField
                type="text"
                label="Title"
                variant="standard"
                name="title"
                value={form.title}
                fullWidth
                onChange={(e) => onChange(e)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Description"
                variant="standard"
                name="description"
                value={form.description}
                fullWidth
                onChange={(e) => onChange(e)}
              />
            </MDBox>
            <MDBox mb={2}>{selectAssignee()}</MDBox>
            <MDBox mb={2}>{selectStatus()}</MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => onSubmit()}>
                Create New Task
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
export default CreateTask;
