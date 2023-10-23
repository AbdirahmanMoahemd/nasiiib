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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {  listCategories } from "../../actions/categoryActions";
import { confirmAlert } from "react-confirm-alert";
import {
  createSubCategory,
  deleteSubCategory,
  listSubCategories,
  updateSubCategory,
} from "@/actions/subCategoryActions";
import { SUBCATEGORY_CREATE_RESET, SUBCATEGORY_UPDATE_RESET } from "@/constants/subCategoryConstants";

const SubCategoryScreen = () => {
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const { loading, error, subcategories } = subcategoryList;

  const subcategoryCreate = useSelector((state) => state.subcategoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = subcategoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subcategoryDelete = useSelector((state) => state.subcategoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = subcategoryDelete;

  const subcategoryUpdate = useSelector((state) => state.subcategoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = subcategoryUpdate;

  useEffect(() => {
    
    if (!userInfo && !userInfo.isAdmin) {
      navigate("/sign-in");
    }
    dispatch(listSubCategories());
    dispatch(listCategories());

    if (successCreate) {
      dispatch({type: SUBCATEGORY_CREATE_RESET})
      setCreate(false);
      setName("");
      setCategory("");
    }

    if (successUpdate) {
      dispatch({ type: SUBCATEGORY_UPDATE_RESET });
      setCreate(false);
      setEdit(false);
      setName("");
      setCategory("");
    }
  }, [dispatch, navigate, successCreate, successUpdate, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(name, category));
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
          onClick: () => dispatch(deleteSubCategory(id)),
        },
      ],
    });
  };

  const updateHandler = (e) => {
    dispatch(
      updateSubCategory({
        _id: id,
        name,
        category,
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
                  {["Name", "Category", "", ""].map((el) => (
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
                    {subcategories.map((subcategory) => (
                      <tr key={subcategory.id}>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {subcategory.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {subcategory.category && subcategory.category.name}
                          </Typography>
                        </td>

                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Button
                            label=""
                            icon="pi pi-file-edit"
                            className="h-8"
                            onClick={() => {
                              setId(subcategory.id);
                              setName(subcategory.name);
                              setCategory(subcategory.category.name);
                              setEdit(true);
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            className="h-8 text-red-700"
                            label=""
                            icon="pi pi-delete-left"
                            onClick={() => deleteHandler(subcategory.id)}
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
        header="New SubCategory item"
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
                SubCategory Name<span className="text-primary">*</span>
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
              <label className="mb-2 block text-gray-600">Category</label>
              <select
                name="category"
                type="text"
                className="w-full border border-gray-400 py-3 px-1 rounded"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category here</option>
                {categories.map((cat) => (
                  <>
                    <option value={cat.id}>
                      {cat.id.substring(1, 1)}
                      {cat.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
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
        header="Edit SubCategory item"
        visible={edit}
        onHide={() => {
          setEdit(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateHandler}>
          {loadingUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorUpdate && <Message severity="error" text={errorUpdate} />}
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
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-gray-600">
                  SubCatagory Name
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
                <label className="mb-2 block text-gray-600">Category</label>
                <select
                  name="category"
                  type="text"
                  className="input-box"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select Category here</option>
                  {categories.map((cat) => (
                    <>
                      <option value={cat.id}>
                        {cat.id.substring(1, 1)}
                        {cat.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="text-white font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase transition hover:bg-transparent hover:text-primary"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </form>
      </Dialog>
    </>
  );
};

export default SubCategoryScreen;
