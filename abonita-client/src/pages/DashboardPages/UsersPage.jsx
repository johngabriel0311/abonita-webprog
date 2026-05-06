import { useState } from "react";
import {
  Alert,
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

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid } from "@mui/x-data-grid";

import usersSeed from "../../data/users.json?raw";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(
          String(user.gender ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.gender ?? "")
              .trim()
              .toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "")
          .trim()
          .toLowerCase(),
        role: roles.includes(
          String(user.role ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.role ?? "")
              .trim()
              .toLowerCase()
          : "editor",
        username: String(user.username ?? "")
          .trim()
          .toLowerCase(),
        password: String(user.password ?? ""),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return {
      users: [],
      error: "Unable to read users from src/data/users.json.",
    };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState(seed.users);

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

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({
      open: true,
      id: user?.id ?? null,
    });

    setForm(user ? { ...blankForm, ...user } : { ...blankForm });

    setErrors({});
  };

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    setShowPassword(false);

    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    const email = form.email.trim().toLowerCase();

    const username = form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "User name"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required`;
      }
    });

    if (!/^\d+$/.test(form.age)) {
      nextErrors.age = "Age must contain numbers only";
    }

    if (!/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = "Contact number must be 11 digits";
    }

    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (/\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces";
    }

    if (!nextErrors.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (
      !nextErrors.email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = "Email address already exists.";
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = "Username already exists.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
      gender: form.gender,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((user) =>
            user.id === modal.id
              ? {
                  ...user,
                  ...nextUser,
                }
              : user,
          )
        : [
            ...prev,
            {
              id:
                prev.reduce(
                  (max, user) => Math.max(Number(user.id) || 0, max),
                  0,
                ) + 1,
              ...nextUser,
            },
          ],
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              isActive: !user.isActive,
            }
          : user,
      ),
    );
  };

  const filteredUsers = users.filter((user) => {
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

    const matchesGender = !genderFilter || user.gender === genderFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesGender;
  });

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },

    {
      field: "fullName",
      headerName: "Full Name",
      width: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },

    {
      field: "username",
      headerName: "Username",
      minWidth: 150,
    },

    {
      field: "age",
      headerName: "Age",
      width: 80,
    },

    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },

    {
      field: "contactNumber",
      headerName: "Contact Number",
      minWidth: 150,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 150,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,

      renderCell: (params) => (
        <Chip
          size="small"
          label={params.row.isActive ? "Active" : "Inactive"}
          sx={{
            width: 70,
            color: "#fff",
            justifyContent: "center",

            bgcolor: params.row.isActive ? "#cd45a1" : "#000000",

            "& .MuiChip-label": {
              width: "100%",
              textAlign: "center",
            },
          }}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,

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
              bgcolor: "#253b80",

              "&:hover": {
                bgcolor: "#ff91f2",
              },
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => toggleStatus(params.row.id)}
            sx={{
              width: 100,
              bgcolor: params.row.isActive ? "#000000" : "#cd45a1",
            }}
          >
            {params.row.isActive ? "Deactivate" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#253b80",
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

            "& .MuiOutlinedInput-root": {
              borderRadius: 2,

              "& fieldset": {
                borderColor: "#253b80",
                borderWidth: 2,
              },

              "&:hover fieldset": {
                borderColor: "#cd45a1",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#cd45a1",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#253b80",
                  }}
                />
              </InputAdornment>
            ),
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
            borderRadius: 2,
            px: 3,

            "&:hover": {
              bgcolor: "#ff91f2",
            },
          }}
        >
          Add User
        </Button>
      </Box>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Paper
        sx={{
          p: { xs: 1.5, sm: 2 },
          backgroundColor: "#f9fafc",
          minWidth: 0,
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        {users.length ? (
          <Box
            sx={{
              height: {
                xs: 520,
                sm: 550,
              },
              width: "100%",
              minWidth: 0,
            }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                    page: 0,
                  },
                },
              }}
              sx={{
                minWidth: 0,
                border: "none",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#253b80",
                  color: "#253b80",
                  fontWeight: "bold",
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f8e6f2",
                },

                "& .MuiCheckbox-root.Mui-checked": {
                  color: "#cd45a1",
                },

                "& .MuiDataGrid-footerContainer": {
                  borderTop: "2px solid #253b80",
                },

                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
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

          <DialogContent
            dividers
            sx={{
              px: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField {...fieldProps("firstName", "First Name")} />

                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField {...fieldProps("age", "Age")} />

                <TextField
                  {...fieldProps("gender", "Gender", {
                    select: true,
                  })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField {...fieldProps("contactNumber", "Contact Number")} />

                <TextField
                  {...fieldProps("email", "Email Address", {
                    type: "email",
                  })}
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
                  {...fieldProps("role", "Role", {
                    select: true,
                  })}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField {...fieldProps("username", "Username")} />
              </Stack>

              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",

                  InputProps: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                })}
              />

              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "User status: Active"
                    : "User status: Inactive"
                }
              />
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              py: 2,
            }}
          >
            <Button onClick={closeModal}>Cancel</Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#253b80",

                "&:hover": {
                  bgcolor: "#cd45a1",
                },
              }}
            >
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
