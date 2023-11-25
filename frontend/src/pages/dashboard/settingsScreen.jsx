import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
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
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  createSettings,
  listsettings,
  updateSettings,
} from "@/actions/settingsActions";
import {
  SETTINGS_CREATE_RESET,
  SETTINGS_UPDATE_RESET,
} from "@/constants/settingsConstants";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [logo, setLogo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [id, setId] = useState("");
  const [create, setCreate] = useState("");
  const [edit, setEdit] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const settingsList = useSelector((state) => state.settingsList);
  const { loading, error, settings } = settingsList;

  const settingsUpdate = useSelector((state) => state.settingsUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = settingsUpdate;

  const settingsCreat = useSelector((state) => state.settingsUpdate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = settingsCreat;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate("/sign-in");
    }

    if (successCreate) {
      dispatch({ type: SETTINGS_CREATE_RESET });
      setPhoneNumber("");
      setId("");
      setLogo("");
      setEdit(false);
      setCreate(false);
    }

    if (successUpdate) {
      dispatch({ type: SETTINGS_UPDATE_RESET });
      setPhoneNumber("");
      setId("");
      setLogo("");
      setEdit(false);
      setCreate(false);
    }
    dispatch(listsettings());
  }, [dispatch, navigate, userInfo, successUpdate, successCreate]);

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
      setLogo(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSettings(phoneNumber, logo));
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSettings({
        _id: id,
        phoneNumber,
        logo,
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
                  {["Phone Number", "Logo", ""].map((el) => (
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
                  {settings.map((setting) => (
                    <tr key={setting.id}>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {setting.phoneNumber}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          <img src={setting.logo} alt="logo" />
                        </Typography>
                      </td>
                      <td>
                        <Button
                          label=""
                          icon="pi pi-file-edit"
                          onClick={() => {
                            setId(setting.id);
                            setPhoneNumber(setting.phoneNumber);
                            setLogo(setting.logo);
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
        header="New settings"
        visible={create}
        onHide={() => {
          dispatch({ type: SETTINGS_CREATE_RESET });
          setPhoneNumber("");
          setId("");
          setLogo("");
          setEdit(false);
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
                Select image logo<span className="text-primary">*</span>
              </label>
              <input
                value={logo}
                id="icon"
                type="text"
                className="input-box"
                onChange={(e) => setLogo(e.target.value)}
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
            <div className="flex w-20 pl-2">
              <img src={logo} />
            </div>
          </div>
          <br />
          <div>
            <label className="mb-2 block text-gray-600">
              Phone Number <span className="text-primary">*</span>
            </label>
            <Input
              type="number"
              value={phoneNumber}
              label="Item price"
              size="lg"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
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
        header="Edit Settings"
        visible={edit}
        onHide={() => {
          dispatch({ type: SETTINGS_UPDATE_RESET });
          setPhoneNumber("");
          setId("");
          setLogo("");
          setEdit(false);
          setCreate(false);
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
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-gray-600">
                Select image logo<span className="text-primary">*</span>
              </label>
              <input
                value={logo}
                id="icon"
                type="text"
                className="input-box"
                onChange={(e) => setLogo(e.target.value)}
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
            <br />
            <div className="flex w-20 pl-2">
              <img src={logo} />
            </div>
          </div>
          <br />
          <div>
            <label className="mb-2 block text-gray-600">
              Phone Number <span className="text-primary">*</span>
            </label>
            <Input
              type="number"
              value={phoneNumber}
              label="Item price"
              size="lg"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
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

export default SettingsScreen;
