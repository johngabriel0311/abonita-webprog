import { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";

import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

import usersData from "../../data/users.json";

const colors = {
  bg: "#f9fafc",
  card: "#ffffff",
  primary: "#253b80",
  accent: "#cd45a1",
  text: "#111827",
  subtext: "#6b7280",
  border: "#e5e7eb",
};

const columns = [
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
  },

  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },

  {
    field: "username",
    headerName: "Username",
    width: 150,
  },

  {
    field: "email",
    headerName: "Email",
    width: 220,
  },

  {
    field: "role",
    headerName: "Role",
    width: 120,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
];

const rows = usersData;

const cardStyles = {
  bgcolor: colors.card,
  borderRadius: 4,
  color: colors.text,
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",

  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
};

const ReportsPage = () => {
  const printRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredRows = rows.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = !roleFilter || user.role === roleFilter;

    const matchesStatus =
      !statusFilter ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Print Report</title>

          ${headMarkup}

          <style>
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #f9fafc;
              color: #111827;
            }

            .report-shell {
              padding: 24px;
            }

            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 2px solid #253b80;
            }

            .report-header h1 {
              color: #cd45a1;
              margin: 0 0 6px;
            }

            .report-header p {
              margin: 0;
              color: #6b7280;
            }
          </style>
        </head>

        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Hardware Arena Reports</h1>

              <p>
                Generated on ${exportedAt}
              </p>
            </header>

            <section>
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.bg,
        minHeight: "100vh",
        p: 3,
        color: colors.text,
        width: "100%",
      }}
    >
      {/* HEADER */}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mb: 4,
          width: "100%",
        }}
      >
        {/* LEFT SIDE */}
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.primary,
            }}
          >
            Reports Summary
          </Typography>

          <Typography
            sx={{
              color: colors.subtext,
            }}
          >
            Analytics overview and data visualization insights.
          </Typography>
        </Box>

        {/* RIGHT SIDE BUTTONS */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginLeft: "auto",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: colors.primary,

              "&:hover": {
                bgcolor: "#1d2f66",
              },
            }}
          >
            Generate
          </Button>

          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{
              bgcolor: colors.accent,

              "&:hover": {
                bgcolor: "#a83884",
              },
            }}
          >
            Export PDF
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              px: 4,
              py: 1.5,
              borderRadius: 2,

              "&:hover": {
                borderColor: colors.accent,
                color: colors.accent,
                backgroundColor: "#fdf2f8",
              },
            }}
          >
            Filter
          </Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Card sx={cardStyles}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                color: colors.primary,
                mb: 2,
              }}
            >
              Activity Overview
            </Typography>

            <BarChart
              series={[
                {
                  data: [70, 88, 48, 68],
                  label: "Instructors",
                  color: "#68abec",
                },
                {
                  data: [100, 12, 98, 60],
                  label: "Students",
                  color: "#cd45a1",
                },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["Q1", "Q2", "Q3", "Q4"],
                  scaleType: "band",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          spacing={3}
        >
          <Card
            sx={{
              ...cardStyles,
              flex: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: colors.primary,
                  mb: 2,
                }}
              >
                User Distribution
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "Admins", color: "#4861d6" },
                        {
                          id: 1,
                          value: 15,
                          label: "Instructors",
                          color: colors.accent,
                        },
                        {
                          id: 2,
                          value: 20,
                          label: "Students",
                          color: "#68abec",
                        },
                      ],
                    },
                  ]}
                  width={250}
                  height={250}
                />
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              ...cardStyles,
              flex: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: colors.primary,
                }}
              >
                System Metrics
              </Typography>

              <Stack
                direction="row"
                spacing={6}
                justifyContent="center"
                alignItems="center"
                sx={{
                  minHeight: 240,
                  mx: "auto",
                  width: "fit-content",
                }}
              >
                {/* CPU */}
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Gauge
                    width={250}
                    height={250}
                    value={60}
                    sx={{
                      "& .MuiGauge-valueArc": {
                        fill: colors.primary,
                      },

                      "& .MuiGauge-referenceArc": {
                        fill: "#dbe4ff",
                      },

                      "& .MuiGauge-valueText": {
                        fill: colors.primary,
                        fontSize: 32,
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <Typography
                    sx={{
                      mt: 1,
                      color: colors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    CPU
                  </Typography>
                </Box>

                {/* MEMORY */}
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Gauge
                    width={250}
                    height={250}
                    value={70}
                    sx={{
                      "& .MuiGauge-valueArc": {
                        fill: colors.accent,
                      },

                      "& .MuiGauge-referenceArc": {
                        fill: "#dbe4ff",
                      },

                      "& .MuiGauge-valueText": {
                        fill: colors.accent,
                        fontSize: 32,
                        fontWeight: "bold",
                      },
                    }}
                  />

                  <Typography
                    sx={{
                      mt: 1,
                      color: colors.accent,
                      fontWeight: "bold",
                    }}
                  >
                    Memory
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Card sx={cardStyles}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                color: colors.primary,
                mb: 2,
              }}
            >
              Reports Database
            </Typography>

            <Box
              sx={{
                height: 470,
                backgroundColor: "#ffffff",
                borderRadius: 2,
              }}
            >
              <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row.username}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: "none",

                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f5f7fb",
                    color: colors.primary,
                    fontWeight: "bold",
                  },

                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f8e6f2",
                  },

                  "& .MuiCheckbox-root.Mui-checked": {
                    color: colors.accent,
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
