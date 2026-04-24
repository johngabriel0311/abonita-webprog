import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

function ReportsPage() {
  const cardStyle = {
    borderRadius: 3,
    backgroundColor: "#ececec",
    height: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "10px 8px 20px rgba(0,0,0,0.1)",
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Reports & Analytics
      </Typography>

      {/* GRID */}
      <Grid container spacing={3}>
        {/* BAR CHART */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#253b80" }}>
                User Growth
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Quarterly increase of users
              </Typography>

              <Box sx={{ width: 525, height: 300 }}>
                <BarChart
                  width={undefined} // ✅ responsive
                  height={250}
                  series={[
                    {
                      data: [35, 44, 24, 34],
                      label: "Instructors",
                      color: "#68abec",
                    },
                    {
                      data: [51, 6, 49, 30],
                      label: "Students",
                      color: "#ff91f2",
                    },
                  ]}
                  xAxis={[
                    {
                      data: ["Q1", "Q2", "Q3", "Q4"],
                      scaleType: "band",
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* LINE CHART */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#253b80" }}>
                Activity Trends
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Monthly engagement trends
              </Typography>

              <Box sx={{ width: 525, height: 300 }}>
                <LineChart
                  width={undefined}
                  height={250}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      label: "Sessions",
                      color: "#4861d6",
                    },
                  ]}
                  xAxis={[
                    {
                      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      scaleType: "point",
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* PIE CHART */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#253b80" }}>
                User Distribution
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Breakdown of system roles
              </Typography>

              <Box
                sx={{
                  width: 525,
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <PieChart
                  width={250}
                  height={250}
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: 10,
                          label: "Admins",
                          color: "#4861d6",
                        },
                        {
                          id: 1,
                          value: 15,
                          label: "Instructors",
                          color: "#ff91f2",
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
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;
