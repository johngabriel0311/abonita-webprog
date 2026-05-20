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
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { DataGrid } from "@mui/x-data-grid";

import {
  fetchArticles,
  createArticle,
  updateArticle,
} from "../../services/ArticleService";

const blankForm = {
  slug: "",
  title: "",
  image: null,
  content: "",
  isActive: true,
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  const [form, setForm] = useState(blankForm);

  const loadArticles = async () => {
    try {
      setLoading(true);

      const { data } = await fetchArticles();

      setArticles(Array.isArray(data.articles) ? data.articles : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openModal = (article) => {
    setModal({
      open: true,
      id: article?._id ?? null,
    });

    setForm(
      article
        ? {
            ...blankForm,
            ...article,
          }
        : blankForm,
    );
  };

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });

    setForm(blankForm);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : name === "slug"
            ? value.toLowerCase().replace(/\s+/g, "-")
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      Object.keys(form).forEach((key) => {
        payload.append(key, form[key]);
      });

      if (modal.id) {
        await updateArticle(modal.id, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (id) => {
    const article = articles.find((a) => a._id === id);

    await updateArticle(id, {
      isActive: !article.isActive,
    });

    loadArticles();
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      (statusFilter === "active" && article.isActive) ||
      (statusFilter === "inactive" && !article.isActive);

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 80,
      align: "center",
      headerAlign: "center",

      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },

    {
      field: "slug",
      headerName: "Slug",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "paragraphs",
      headerName: "Paragraphs",
      width: 120,
      align: "center",
      headerAlign: "center",

      valueGetter: (_, row) =>
        row.content ? row.content.split("\n").length : 0,
    },

    {
      field: "preview",
      headerName: "Preview",
      flex: 1.5,
      minWidth: 300,
      align: "center",
      headerAlign: "center",

      valueGetter: (_, row) => row.content?.slice(0, 30) + "...",
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",
          }}
        >
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
        </Box>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            width: "100%",
            height: "100%",

            display: "flex",

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

              bgcolor: params.row.isActive ? "#000" : "#cd45a1",
            }}
          >
            {params.row.isActive ? "DISABLE" : "ENABLE"}
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
          Articles
        </Typography>

        <TextField
          placeholder="Search articles..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
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
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{
            minWidth: 150,
          }}
        >
          <MenuItem value="">All Statuses</MenuItem>

          <MenuItem value="active">Active</MenuItem>

          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{
            bgcolor: "#253b80",
          }}
        >
          ADD ARTICLE
        </Button>
      </Box>

      <Paper>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          rowHeight={55}
          pageSizeOptions={[5, 10]}
        />
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit Article" : "Add Article"}</DialogTitle>

          <DialogContent dividers>
            <Stack
              spacing={2}
              sx={{
                pt: 1,
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  label="Slug / Article Name"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  fullWidth
                />

                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                />
              </Stack>

              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  Article Image
                </Typography>

                <Box
                  component="label"
                  sx={{
                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    minHeight: 220,

                    border: "2px dashed #dbe4ff",

                    borderRadius: 3,

                    overflow: "hidden",

                    cursor: "pointer",

                    bgcolor: "#f8fafc",
                  }}
                >
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,

                        image: e.target.files[0],
                      }))
                    }
                  />

                  {form.image ? (
                    <img
                      src={
                        typeof form.image === "string"
                          ? `http://localhost:8000/uploads/${form.image}`
                          : URL.createObjectURL(form.image)
                      }
                      alt=""
                      style={{
                        width: "100%",

                        height: 220,

                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography>Upload Image</Typography>
                  )}
                </Box>

                {form.image && (
                  <Button
                    size="small"
                    sx={{
                      mt: 1,
                    }}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,

                        image: null,
                      }))
                    }
                  >
                    CHANGE IMAGE
                  </Button>
                )}
              </Box>

              <TextField
                multiline
                rows={8}
                label="Content"
                name="content"
                value={form.content}
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
                label={
                  form.isActive ? "Article is Active" : "Article is Inactive"
                }
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
              {modal.id ? "UPDATE ARTICLE" : "SAVE ARTICLE"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
