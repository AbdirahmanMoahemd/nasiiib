import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createSlide,
  listSlides,
  updateSlide,
} from "../../actions/slideActions";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { AiFillDelete } from "react-icons/ai";
import {
  SLIDE_CREATE_RESET,
  SLIDE_UPDATE_RESET,
} from "@/constants/slideConstants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

const SliderScreen = () => {
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(10);
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slideList = useSelector((state) => state.slideList);
  const { loading, error, slides } = slideList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const slideCreate = useSelector((state) => state.slideCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = slideCreate;

  const slideUpdate = useSelector((state) => state.slideUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = slideUpdate;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate("/sign-in");
    }
   
    
    

    if (successCreate) {
      dispatch({ type: SLIDE_CREATE_RESET });
      setCreate(false);
      setId("");
      setImages([]);
      setImage("");
    }

    if (successUpdate) {
      dispatch({ type: SLIDE_UPDATE_RESET });
      setCreate(false);
      setEdit(false);
      setId("");
      setImages([]);
      setImage("");
    }

    dispatch(listSlides());
  }, [dispatch, navigate, userInfo, successCreate, successUpdate]);

  const submitHandler = (e) => {
    if (images.length != null) {
      dispatch(createSlide(images));
    } else {
      alert("Please upload image");
    }

    e.preventDefault();
  };

  const addimagehandler = (e) => {
    setImages((current) => [...current, image]);
    setImage("");
    e.preventDefault();
  };

  const removeElement = (index) => {
    const newArray = [...images]; // Create a copy of the original array
    newArray.splice(index, 1); // Remove one element at the specified index
    setImages(newArray); // Update the state with the modified array
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

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSlide({
        _id: id,
        images,
      })
    );
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
                  Add New
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          {/* {loadingDelete && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorDelete && <Message severity="error" text={errorDelete} />} */}
          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {["Images"].map((el) => (
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
                <Message variant="danger">{error}</Message>
              ) : (
                <tbody className="overflow-y-auto">
                  {slides.map((slide) => (
                    <tr key={slide.id}>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          <div className="grid gap-y-10 gap-x-6 p-2 md:grid-cols-2 xl:grid-cols-3">
                            {slide.images &&
                              slide.images.map((image) => (
                                // <SwiperSlide>
                                <img
                                  className="h-28 w-full object-fill"
                                  src={image && image}
                                  alt="image slide 1"
                                />
                                // </SwiperSlide>
                              ))}
                          </div>
                        </Typography>
                      </td>
                      <td>
                        <Button
                          label=""
                          icon="pi pi-file-edit"
                          onClick={() => {
                            setId(slide._id);
                            setImages(slide.images);
                            setEdit(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </CardBody>
        </Card>
      </div>

      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="New slider image"
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
          </div>
          <div className="flex w-20 pl-2">
            {images.map((img, index) => (
              <>
                <img src={img} className="h-54 w-54" alt="image"/>
                <button>
                  <AiFillDelete
                    className="text-primary"
                    onClick={() => removeElement(index)}
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
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
            >
              Save
            </button>
          </div>
        </form>
      </Dialog>

      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit slider image"
        visible={edit}
        onHide={() => {
          setEdit(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateHandler}>
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
          </div>
          <div className="flex w-20 pl-2">
            {images.map((img, index) => (
              <>
                <img src={img} className="h-54 w-54" />
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
                className="ml-8"
                onClick={(e) => {
                  setImages([]);
                  e.preventDefault();
                }}
              >
                clear
              </button>
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
            >
              Update
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default SliderScreen;
