import {
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Age", width: 100 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function UsersPage() {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    `${row.firstName} ${row.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const cardStyle = {
    flex: 1,
    backgroundColor: "#ececec",
    borderRadius: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* HEADER */}
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Collective Users
        </Typography>
      </Box>

      {/* SUMMARY CARDS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1, color: "#253b80" }}>
              Total Users
            </Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1, color: "#253b80" }}>
              Average Age
            </Typography>
            <Typography variant="h4">
              {(
                rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                rows.filter((row) => row.age !== null).length
              ).toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* TABLE CARD */}
      <Card
        sx={{
          borderRadius: 3,
          backgroundColor: "#ececec",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          {/* SEARCH */}
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* DATAGRID */}
          <Box sx={{ height: 550 }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[9]}
              sx={{
                border: "none",
                backgroundColor: "#fff",
                borderRadius: 2,

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f7fb",
                  fontWeight: "bold",
                  color: "#253b80",
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f1f5ff",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
