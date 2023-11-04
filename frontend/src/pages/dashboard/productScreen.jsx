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
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { confirmAlert } from "react-confirm-alert";
import { AiFillDelete } from "react-icons/ai";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "@/constants/productConstants";
import {
  createProduct,
  deleteProduct,
  listProductsByAdmin,
  updateProduct,
} from "@/actions/prodcutActions";
import { SketchPicker } from "react-color";
import { listCategories } from "@/actions/categoryActions";
import { listSubCategories } from "@/actions/subCategoryActions";


const ProductScreen = () => {
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(50);
  const [id, setId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [isFeatured, setisFeatured] = useState(true);
  const [isDiscounted, setisDiscounted] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [colors, setColors] = useState([]);
  const [temSizes, setTemSizes] = useState("");
  const [sizes, setSizes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [sketchPickerColor, setSketchPickerColor] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = categoryList;

  const subcategoryList = useSelector((state) => state.subcategoryList);
  const {
    loading: loadingSubcategories,
    error: errorSubcategories,
    subcategories,
  } = subcategoryList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate("/sign-in");
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      setCreate(false);
      setId("");
      setName("");
      setBrand("");
      setDescription("");
      setMainDescription("");
      setPrice(0);
      setNewPrice(0);
      setisDiscounted(false);
      setisFeatured(true);
      setImages([])
      setImage("")
      setSizes([])
      setColors([])
      setCountInStock(0)
      setTemSizes("")
      setCategory("")
      setSubCategory("")
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      setEdit(false);
      setId("");
      setName("");
      setBrand("");
      setDescription("");
      setMainDescription("");
      setPrice(0);
      setNewPrice(0);
      setisDiscounted(false);
      setisFeatured(false);
      setColors([]);
      setSizes([]);
      setImages([]);
    }

    dispatch(listProductsByAdmin(keyword, pageNumber));
    dispatch(listCategories());
    dispatch(listSubCategories());
  }, [
    dispatch,
    navigate,
    keyword,
    pageNumber,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const submitHandler = (e) => {
    dispatch(
      createProduct(
        name,
        category,
        subcategory,
        brand,
        description,
        mainDescription,
        price,
        countInStock,
        isFeatured,
        isDiscounted,
        newPrice,
        images,
        colors,
        sizes
      )
    );

    e.preventDefault();
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        images,
        colors,
        sizes,
        description,
        mainDescription,
        brand,
        category,
        subcategory,
        price,
        countInStock,
        isFeatured,
        isDiscounted,
        newPrice,
      })
    );
    

  };

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
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleClick = (e) => {
    setColors((current) => [...current, sketchPickerColor]);
    e.preventDefault();
  };
  const sizehandleClick = (e) => {
    setSizes((current) => [...current, temSizes]);
    setTemSizes("");
    e.preventDefault();
  };
  const isFeaturedToggle = () => {
    setisFeatured(!isFeatured);
  };
  const isDiscountedToggle = () => {
    setisDiscounted(!isDiscounted);
  };
  const addimagehandler = (e) => {
    setImages((current) => [...current, image]);
    setImage("");
    e.preventDefault();
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
          onClick: () => dispatch(deleteProduct(id)),
        },
      ],
    });
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
                  {[
                    "Name",
                    "Image",
                    "Category",
                    "Subcategory",
                    "InStock",
                    "Price",
                    "Discounted",
                    "NewPrice",
                    "Sizes",
                    "Colors",
                    "Featured",
                  ].map((el) => (
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
                    {products.map((product) => (
                      <tr key={category.id}>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <img
                            src={product.images && product.images[0]}
                            className="h-8 w-12"
                          />
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.category && product.category.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.subcategory && product.subcategory.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.countInStock}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            ${product.price}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.isDiscounted ? "YES" : "NO"}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            ${product.newPrice}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.sizes &&
                              product.sizes.map((size) => <>{size},</>)}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.colors &&
                              product.colors.map((color) => (
                                <>
                                  <span>
                                    <span
                                      className="mt-10 w-2 pl-2"
                                      style={{ background: `${color}` }}
                                    >
                                      {" "}
                                    </span>
                                    <span className="p-1"> </span>
                                  </span>
                                </>
                              ))}
                          </Typography>
                        </td>

                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {product.isFeatured ? "YES" : "NO"}
                          </Typography>
                        </td>
                        <td>
                          <Button
                            label=""
                            icon="pi pi-file-edit"
                            className="h-8"
                            onClick={() => {
                              setId(product.id);
                              setName(product.name);
                              setBrand(product.brand);
                              setDescription(product.description);
                              setMainDescription(product.mainDescription);
                              setPrice(product.price);
                              setNewPrice(product.newPrice);
                              setisDiscounted(product.isDiscounted);
                              setisFeatured(product.isFeatured);
                              setEdit(true);
                              setColors(product.colors);
                              setSizes(product.sizes);
                              setImages(product.images);
                              setCategory(product.category);
                              setSubCategory(product.subcategory);
                            }}
                          />
                          <Button
                            className="h-8 text-red-700"
                            label=""
                            icon="pi pi-delete-left"
                            onClick={() => deleteHandler(product.id)}
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
        header="New product item"
        visible={create}
        onHide={() => {
          setCreate(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler}>
          {loadingCategories && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCategories && (
            <Message severity="error" text={errorCategories} />
          )}
          {loadingSubcategories && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorSubcategories && (
            <Message severity="error" text={errorSubcategories} />
          )}
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
                Select image <span className="text-primary">*</span>
              </label>
              <input
                value={image}
                id="icon"
                type="text"
                className="input-box"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Select image"
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

            <div>
              <Button
                className="bg-primary text-white"
                icon="pi pi-plus"
                aria-label="Filter"
                onClick={addimagehandler}
              />
            </div>
            <div className="flex w-20 pl-2">
              {images.map((img, index) => (
                <>
                  <img src={img} className="h-8 w-12" />
                  <button>
                    <AiFillDelete
                      className="text-primary"
                      onClick={() => {
                        setImages(images.splice(index, 1));
                      }}
                    />
                  </button>
                </>
              ))}
              {images.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setImages([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Product Name <span className="text-primary">*</span>
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
                Category <span className="text-primary">*</span>
              </label>
              <br />
              <select
                name="category"
                value={category}
                required
                type="text"
                className="w-full rounded border border-gray-400 py-3 px-1"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category here</option>
                {categories.map((cat) => (
                  <>
                    <option value={cat.id}>
                      {cat.name}
                      <img src={cat.icon} />
                    </option>
                  </>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Sub Category <span className="text-primary">*</span>
              </label>
              <br />
              <select
                name="subcategory"
                value={subcategory}
                required
                type="text"
                className="w-full rounded border border-gray-400 py-3 px-1"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option>Select Sub Category here</option>
                {subcategories.map((subcat) => (
                  <>
                    <option value={subcat.id}>{subcat.name}</option>
                  </>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                Brand <span className="text-primary">*</span>
              </label>
              <label className="mb-2 block text-gray-600">{brand.name}</label>
              <Input
                type="text"
                value={brand}
                label="Item brand"
                size="lg"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Description <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                value={description}
                label="Item description"
                size="lg"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Main Description <span className="text-primary">*</span>
              </label>
              <Textarea
                label="Main Description"
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Price <span className="text-primary">*</span>
              </label>
              <Input
                type="number"
                value={price}
                label="Item price"
                size="lg"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                isDiscounted <span className="text-primary">*</span>
              </label>

              <input
                type="checkbox"
                value={isDiscounted}
                checked={isDiscounted}
                onChange={isDiscountedToggle}
                placeholder="isDiscounted"
              />
              <span className="pl-2">isDiscounted</span>
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                OldPrice <span className="text-primary">*</span>
              </label>
              <Input
                type="number"
                value={newPrice}
                label="Old Price"
                size="lg"
                required
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                CountInStock <span className="text-primary">*</span>
              </label>
              <Input
                type="number"
                value={countInStock}
                label="count In Stock"
                size="lg"
                required
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">Colors</label>
              <SketchPicker
                onChange={(color) => {
                  setSketchPickerColor(color.hex);
                }}
                color={sketchPickerColor}
              />
            </div>
            <div>
              <Button
                className="bg-primary text-white"
                icon="pi pi-plus"
                aria-label="Filter"
                onClick={handleClick}
              />
            </div>
            <div>
              {colors.map((col) => (
                <span>
                  <span
                    className="mt-10 w-4 pl-2 pr-2"
                    style={{ background: `${col}` }}
                  >
                    {" "}
                  </span>
                  <span className="p-1"> </span>
                </span>
              ))}
              {colors.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setColors([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>
            <div>
              <label className="mb-2 block text-gray-600">Sizes</label>
              <Input
                type="text"
                value={temSizes}
                label="Item size"
                size="lg"
                required
                onChange={(e) => setTemSizes(e.target.value)}
              />
            </div>
            <div>
              <Button
                className="bg-primary text-white"
                icon="pi pi-plus"
                aria-label="Filter"
                onClick={sizehandleClick}
              />
            </div>
            <div>
              {sizes.map((col) => (
                <span>
                  <span className="mt-10 w-4 pl-2 pr-2">{col}</span>
                  <span className="p-1"> </span>
                </span>
              ))}
              {sizes.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setSizes([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>

            <div>
              <input
                value={isFeatured}
                type="checkbox"
                checked={isFeatured}
                onChange={isFeaturedToggle}
              />
              <span className="pl-2"> isFeatured</span>
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
        header="Edit product item"
        visible={edit}
        onHide={() => {
          dispatch({ type: PRODUCT_UPDATE_RESET });
          setEdit(false);
          setId("");
          setName("");
          setBrand("");
          setDescription("");
          setMainDescription("");
          setPrice(0);
          setNewPrice(0);
          setisDiscounted(false);
          setisFeatured(false);
          setColors([]);
          setSizes([]);
          setImages([]);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateHandler}>
          {loadingCategories && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCategories && (
            <Message severity="error" text={errorCategories} />
          )}
          {loadingSubcategories && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorSubcategories && (
            <Message severity="error" text={errorSubcategories} />
          )}
          {loadingUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorUpdate && <Message severity="error" text={errorUpdate} />}
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-gray-600">
                Select image <span className="text-primary">*</span>
              </label>
              <input
                value={image}
                id="icon"
                type="text"
                className="input-box"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Select image"
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

            <div>
              <Button
                className="bg-primary text-white"
                icon="pi pi-plus"
                aria-label="Filter"
                onClick={addimagehandler}
              />
            </div>
            <div className="flex w-20 pl-2">
              {images.map((img, index) => (
                <>
                  <img src={img} className="h-8 w-12" />
                  <button>
                    <AiFillDelete
                      className="text-primary"
                      onClick={() => {
                        setImages(images.splice(index, 1));
                      }}
                    />
                  </button>
                </>
              ))}
              {images.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setImages([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Product Name <span className="text-primary">*</span>
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
                Category <span className="text-primary">*</span>
              </label>
              <br />
              <select
                name="category"
                value={category}
                required
                type="text"
                className="w-full rounded border border-gray-400 py-3 px-1"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category here</option>
                {categories.map((cat) => (
                  <>
                    <option value={cat.id}>
                      {cat.name}
                      <img src={cat.icon} />
                    </option>
                  </>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Sub Category <span className="text-primary">*</span>
              </label>
              <br />
              <select
                name="subcategory"
                value={subcategory}
                required
                type="text"
                className="w-full rounded border border-gray-400 py-3 px-1"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                <option>Select Sub Category here</option>
                {subcategories.map((subcat) => (
                  <>
                    <option value={subcat.id}>{subcat.name}</option>
                  </>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                Brand <span className="text-primary">*</span>
              </label>
              <label className="mb-2 block text-gray-600">{brand.name}</label>
              <Input
                type="text"
                value={brand}
                label="Item brand"
                size="lg"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Description <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                value={description}
                label="Item description"
                size="lg"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Main Description <span className="text-primary">*</span>
              </label>
              <Textarea
                label="Main Description"
                value={mainDescription}
                onChange={(e) => setMainDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">
                Price <span className="text-primary">*</span>
              </label>
              <Input
                type="number"
                value={price}
                label="Item price"
                size="lg"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                isDiscounted <span className="text-primary">*</span>
              </label>

              <input
                type="checkbox"
                value={isDiscounted}
                checked={isDiscounted}
                onChange={isDiscountedToggle}
                placeholder="isDiscounted"
              />
              <span className="pl-2">isDiscounted</span>
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                OldPrice <span className="text-primary">*</span>
              </label>
              <Input
                type="number"
                value={newPrice}
                label="Old Price"
                size="lg"
                required
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600">
                CountInStock <span className="text-primary">*</span>
              </label>
              <Input
                type="number"
                value={countInStock}
                label="count In Stock"
                size="lg"
                required
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-600">Colors</label>
              <SketchPicker
                onChange={(color) => {
                  setSketchPickerColor(color.hex);
                }}
                color={sketchPickerColor}
              />
            </div>
            <div>
              <Button
                className="bg-primary text-white"
                icon="pi pi-plus"
                aria-label="Filter"
                onClick={handleClick}
              />
            </div>
            <div>
              {colors.map((col) => (
                <span>
                  <span
                    className="mt-10 w-4 pl-2 pr-2"
                    style={{ background: `${col}` }}
                  >
                    {" "}
                  </span>
                  <span className="p-1"> </span>
                </span>
              ))}
              {colors.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setColors([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>
            <div>
              <label className="mb-2 block text-gray-600">Sizes</label>
              <Input
                type="text"
                value={temSizes}
                label="Item size"
                size="lg"
                onChange={(e) => setTemSizes(e.target.value)}
              />
            </div>
            <div>
              <Button
                className="bg-primary text-white"
                icon="pi pi-plus"
                aria-label="Filter"
                onClick={sizehandleClick}
              />
            </div>
            <div>
              {sizes.map((col) => (
                <span>
                  <span className="mt-10 w-4 pl-2 pr-2">{col}</span>
                  <span className="p-1"> </span>
                </span>
              ))}
              {sizes.length === "" ? (
                ""
              ) : (
                <button
                  className="ml-4"
                  onClick={(e) => {
                    setSizes([]);
                    e.preventDefault();
                  }}
                >
                  clear
                </button>
              )}
            </div>

            <div>
              <input
                value={isFeatured}
                type="checkbox"
                checked={isFeatured}
                onChange={isFeaturedToggle}
              />
              <span className="pl-2"> isFeatured</span>
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
    </>
  );
};

export default ProductScreen;
