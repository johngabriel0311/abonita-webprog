import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { DataGrid } from "@mui/x-data-grid";

import { Navigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const roles = ["admin", "editor", "viewer"];

const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const UsersPage = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const storedUser = localStorage.getItem("user");

  const currentUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  if (currentUser?.type === "editor") {
    return <Navigate to="/dashboard" />;
  }

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState({
    ...blankForm,
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [genderFilter, setGenderFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { data } = await fetchUsers();

      setUsers(data.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openModal = (user) => {
    setModal({
      open: true,
      id: user?._id ?? null,
    });

    setForm(
      user
        ? {
            ...blankForm,
            ...user,
          }
        : {
            ...blankForm,
          },
    );
  };

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    setForm({
      ...blankForm,
    });

    setErrors({});

    setShowPassword(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (form.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = "Contact number must be 11 digits";
    }

    if (!/^\d+$/.test(form.age)) {
      nextErrors.age = "Age must contain numbers only";
    }

    if (/\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces";
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      const payload = {
        firstName: form.firstName,

        lastName: form.lastName,

        age: form.age,

        gender: form.gender,

        contactNumber: form.contactNumber,

        email: form.email,

        type: form.type,

        username: form.username,

        password: form.password,

        address: form.address,

        isActive: form.isActive,
      };

      if (modal.id) {
        await updateUser(modal.id, payload);
      } else {
        await createUser(payload);
      }

      await loadUsers();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const user = users.find((u) => u._id === id);

      await updateUser(id, {
        isActive: !user.isActive,
      });

      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      !roleFilter || user.type?.toLowerCase() === roleFilter.toLowerCase();

    const matchesGender = !genderFilter || user.gender === genderFilter;

    const matchesStatus =
      !statusFilter ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",

      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },

    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 180,
      align: "center",
      headerAlign: "center",

      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },

    {
      field: "username",
      headerName: "Username",
      minWidth: 130,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "age",
      headerName: "Age",
      width: 80,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "gender",
      headerName: "Gender",
      minWidth: 100,
      align: "center",
      headerAlign: "center",

      valueGetter: (_, row) => labelize(row.gender),
    },

    {
      field: "contactNumber",
      headerName: "Contact Number",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 220,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "type",
      headerName: "Role",
      minWidth: 100,
      align: "center",
      headerAlign: "center",

      valueGetter: (_, row) => labelize(row.type),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? "Active" : "Inactive"}
          size="small"
          sx={{
            width: 75,
            height: 26,
            color: "#fff",

            bgcolor: params.row.isActive ? "#cd45a1" : "#000",
          }}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 190,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() => openModal(params.row)}
            sx={{
              minWidth: 70,
              height: 32,
              fontSize: 12,

              bgcolor: "#253b80",

              "&:hover": {
                bgcolor: "#1d2f66",
              },
            }}
          >
            EDIT
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(params.row._id)}
            sx={{
              minWidth: 95,
              height: 32,
              fontSize: 12,

              bgcolor: params.row.isActive ? "#000" : "#cd45a1",

              "&:hover": {
                bgcolor: params.row.isActive ? "#222" : "#b93d92",
              },
            }}
          >
            {params.row.isActive ? "DEACTIVATE" : "ACTIVATE"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#253b80",
            fontWeight: "bold",
          }}
        >
          Users
        </Typography>

        <TextField
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{
            flex: 1,
            minWidth: 250,
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          label="Role"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 140,
          }}
        >
          <MenuItem value="">All</MenuItem>

          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {labelize(role)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Gender"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 140,
          }}
        >
          <MenuItem value="">All</MenuItem>

          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {labelize(gender)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{
            minWidth: 140,
          }}
        >
          <MenuItem value="">All</MenuItem>

          <MenuItem value="active">Active</MenuItem>

          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{
            bgcolor: "#253b80",

            "&:hover": {
              bgcolor: "#1d2f66",
            },
          }}
        >
          ADD USER
        </Button>
      </Box>

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: 600,
            width: "100%",
          }}
        >
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            rowHeight={55}
            columnHeaderHeight={50}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
            disableRowSelectionOnClick
            sx={{
              border: "none",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8f9ff",

                color: "#253b80",

                fontWeight: "bold",

                borderBottom: "1px solid #dbe4ff",
              },

              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #eef2ff",
              },

              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #dbe4ff",
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  name="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  name="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  name="age"
                  label="Age"
                  value={form.age}
                  onChange={handleChange}
                  error={Boolean(errors.age)}
                  helperText={errors.age}
                  fullWidth
                />

                <TextField
                  select
                  name="gender"
                  label="Gender"
                  value={form.gender}
                  onChange={handleChange}
                  fullWidth
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <TextField
                name="contactNumber"
                label="Contact Number"
                value={form.contactNumber}
                onChange={handleChange}
                error={Boolean(errors.contactNumber)}
                helperText={errors.contactNumber}
                fullWidth
              />

              <TextField
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  select
                  name="type"
                  label="Role"
                  value={form.type}
                  onChange={handleChange}
                  fullWidth
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="username"
                  label="Username"
                  value={form.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                  fullWidth
                />
              </Stack>

              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                multiline
                rows={3}
                name="address"
                label="Address"
                value={form.address}
                onChange={handleChange}
                fullWidth
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={form.isActive ? "User is Active" : "User is Inactive"}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#253b80",

                "&:hover": {
                  bgcolor: "#1d2f66",
                },
              }}
            >
              {modal.id ? "UPDATE USER" : "SAVE USER"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
