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
import { createCategory } from "../../../actions/categoryActions";
import { CATEGORY_CREATE_RESET } from "@/constants/categoryConstants";
import axios from "axios";


const AddCategoryScreen = () => {

    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [uploading, setUploading] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
    } = categoryCreate;
  
    useEffect(() => {
    }, [icon]);
  
  
    useEffect(() => {
      if (successCreate) {
          dispatch({ type: CATEGORY_CREATE_RESET });
          setCreate(false);
          setName();
          setIcon();
          setEdit();
          setUploading(false)
      }
    }, [dispatch, navigate, successCreate]);
  
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
          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
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
              <label className="text-gray-600 mb-2 block">Category Name<span className="text-primary">*</span></label>
              <Input
              type="text"
              value={name}
              label="Item name"
              size="lg"
              required
              onChange={(e) => setName(e.target.value)}
            />
              {/* <input
                type="text"
                className="input-box"
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                required
              /> */}
            </div>
            <div>
              <label className="text-gray-600 mb-2 block">
                Select image <span className="text-primary">*</span>
              </label>
              {/* <input
                value={icon}
                id="icon"
                type="text"
                className="input-box"
                placeholder="Category image"
                onChange={(e) => setIcon(e.target.value)}
                required
              /> */}
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
            <div className="w-20 flex pl-2">
                
                <img src={icon} />
                </div>
            <div className="mt-4 flex justify-center">
            <button
                  type="submit"
                  className="py-2 px-10 text-center text-primary bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                Save
              </button>
            </div>
          </div>
        </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AddCategoryScreen;
