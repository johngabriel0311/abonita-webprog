import React from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Gauge } from "@mui/x-charts/Gauge";
import { Typography, Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import usersData from "../../data/users.json";
import "leaflet/dist/leaflet.css";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = usersData;

function DashboardPage() {
  const location = useLocation();

  const cardStyle = {
    flex: 1,
    backgroundColor: "#ffffff",
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
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "#253b80" }}>
              Total Users
            </Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>

        {/* Average Age */}
        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" sx={{ color: "#253b80" }}>
              Average Age
            </Typography>
            <Typography variant="h4">
              {(
                rows.reduce((sum, row) => sum + Number(row.age || 0), 0) /
                rows.filter((row) => row.age !== null).length
              ).toFixed(1)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={cardStyle}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: "#253b80" }}>
              System Metrics
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                mx: "auto",
                width: "fit-content",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Gauge
                  width={110}
                  height={110}
                  value={60}
                  sx={{
                    "& .MuiGauge-valueArc": {
                      fill: "#253b80",
                    },
                    "& .MuiGauge-valueText": {
                      fontSize: 20,
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  CPU
                </Typography>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Gauge
                  width={110}
                  height={110}
                  value={70}
                  sx={{
                    "& .MuiGauge-valueArc": {
                      fill: "#cd45a1",
                    },
                    "& .MuiGauge-valueText": {
                      fontSize: 20,
                      fontWeight: "bold",
                    },
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1 }}>
                  Memory
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* CHARTS */}
      <Card sx={{ ...cardStyle, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: "#253b80" }}>
            Activity Overview
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="center"
          >
            <BarChart
              series={[
                {
                  data: [35, 44, 24, 34],
                  label: "Instructors",
                  color: "#68abec",
                },
                {
                  data: [51, 6, 49, 30],
                  label: "Students",
                  color: "#cd45a1",
                },
              ]}
              height={250}
              xAxis={[
                {
                  data: ["Q1", "Q2", "Q3", "Q4"],
                  scaleType: "band",
                },
              ]}
            />

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Admins", color: "#4861d6" },
                    {
                      id: 1,
                      value: 15,
                      label: "Instructors",
                      color: "#cd45a1",
                    },
                    { id: 2, value: 20, label: "Students", color: "#68abec" },
                  ],
                },
              ]}
              width={250}
              height={250}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card sx={{ ...cardStyle, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: "#253b80" }}>
            Users Overview
          </Typography>

          <Box
            sx={{
              height: 400,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.username}
              pageSizeOptions={[5]}
              checkboxSelection
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f7fb",
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* MAP */}
      <Card sx={cardStyle}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: "#253b80" }}>
            Location Map
          </Typography>

          <Box
            sx={{
              height: 300,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>National University - Manila</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
