import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  createCategory,
  deleteCategory,
  listCategories,
} from "../../actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "@/constants/categoryConstants";
import { confirmAlert } from "react-confirm-alert";

const OrdersScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [uploading, setUploading] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = categoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = categoryDelete;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate("/sign-in");
    }

    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      setCreate(false);
      setName();
      setIcon();
      setEdit();
      setUploading(false);
    }

    dispatch(listCategories());
  }, [dispatch, navigate, successCreate, successDelete]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setIcon(data);
      console.log(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, icon));
  };

  const deleteHandler = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteCategory(id)),
        },
      ],
    });
  };


  const updateHandler = (e) => {
    dispatch(
      updateCategory({
        _id: id,
        name,
        icon,
      })
    );
    e.preventDefault();
  };

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card className="overflow-hidden xl:col-span-3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                {/* Inventory ({items && items.length}) */}
              </Typography>
            </div>
            <div>
              <Input
                label="Search by item name"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => setCreate(true)}
                  className=" capitalize"
                >
                  Add New Item
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          {loadingDelete && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorDelete && <Message severity="error" text={errorDelete} />}
          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {["NAME", "IMAGE", "", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-600"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              {loading ? (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="6"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              ) : error ? (
                <Message severity="error" text={error} />
              ) : (
                <>
                  <tbody className="overflow-y-auto">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {category.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <img src={category.icon} className="h-12 w-14" />
                        </td>

                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Button
                            label=""
                            icon="pi pi-file-edit"
                            className="h-8"
                            onClick={() => {
                              setId(category.id)
                              setName(category.name)
                              setIcon(category.icon)
                              setEdit(true)
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            className="h-8 text-red-700"
                            label=""
                            icon="pi pi-delete-left"
                            onClick={() => deleteHandler(category.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </CardBody>
        </Card>
      </div>
      {/* Create Inventory */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="New Category item"
        visible={create}
        onHide={() => {
          setCreate(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler}>
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCreate && <Message severity="error" text={errorCreate} />}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-gray-600">
                Category Name<span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                value={name}
                label="Item name"
                size="lg"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                Select image <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                value={icon}
                label="Category image"
                size="lg"
                required
                onChange={(e) => setIcon(e.target.value)}
              />
              <br />

              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={uploadFileHandler}
              />
              {uploading && (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="4"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              )}
            </div>
            <div className="flex w-20 pl-2">
              <img src={icon} />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="text-primary bg-primary border-primary hover:text-primary font-roboto rounded border py-2 px-10 text-center font-medium uppercase transition hover:bg-transparent"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Dialog>

      {/* Edit Category */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit category item"
        visible={edit}
        onHide={() => {
          setEdit(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler}>
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCreate && <Message severity="error" text={errorCreate} />}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-gray-600">
                Category Name<span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                value={name}
                label="Item name"
                size="lg"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                Select image <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                value={icon}
                label="Category image"
                size="lg"
                required
                onChange={(e) => setIcon(e.target.value)}
              />
              <br />

              <input
                type="file"
                id="myfile"
                name="myfile"
                onChange={uploadFileHandler}
              />
              {uploading && (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="4"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              )}
            </div>
            <div className="flex w-20 pl-2">
              <img src={icon} />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="text-white bg-primary border-primary hover:text-primary font-roboto rounded border py-2 px-10 text-center font-medium uppercase transition hover:bg-transparent"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default OrdersScreen;
