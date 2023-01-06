/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Box, Tab } from "@mui/material";
import RequestEngine from "../../../core/RequestEngine";

function TaskTable() {
  const engine = new RequestEngine();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setisLoading] = useState(false);
  const handleDetails = (event, id) => {
    navigate("/admin/dashboard/applicant/" + `${id}`);
  };
  function handleDelete(params) {}
  const handleActions = (index, item) => (
    <div className="ml-2">
      <AiFillDelete title="delete" size={25} color="blue" onClick={() => handleDelete(item.id)} />
      <FaEye title="Details" size={25} color="gray" onClick={() => handleDetails(item)} />
    </div>
  );
  function callPage(page) {
    engine.getTasks(page, limit, (response) => {
      if (response.status === 200) {
        setPagination((pager) => ({ ...pager, count: response.data.count }));
        setisLoading(false);
        setUsers(
          response.data.data.map((item, key) => ({
            id: key,
            data: item,
            title: item.title,
            status: item.status,
            description: item.description,
            email: item.assignee.email,
            actions:
              // we've added some custom button actions
              handleActions(key, item),
          }))
        );
      }
    });
  }
  useEffect(() => {
    callPage();
  }, []);
  const columns = [
    { field: "title", title: "Title", width: 150 },
    { field: "email", title: "Email", width: 300 },
    { field: "description", title: "Description", width: 150 },
    { field: "status", title: "Status", width: 200 },
    {
      field: "action",
      title: "Actions",
      renderCell: (params) => (
        <div className="ml-2">
          <AiFillDelete
            title="delete"
            size={25}
            color="blue"
            onClick={() => handleDelete(params)}
          />
          <FaEye title="Details" size={25} color="gray" onClick={() => handleDetails()} />
        </div>
      ),
    },
  ];
  const userTableStyles = {
    height: "650px",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          sx={userTableStyles}
          getRowId={(row) => row.data.id}
        />
      </Box>
    </DashboardLayout>
  );
}

export default TaskTable;
