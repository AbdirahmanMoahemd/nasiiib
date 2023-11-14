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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { confirmAlert } from "react-confirm-alert";
import { deleteUser, listUsers, register } from "@/actions/userActions";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";

const UsersScreen = () => {
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [id, setId] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  // const userUpdateRole = useSelector((state) => state.userUpdateRole);
  // const { success: successUpdateRole } = userUpdateRole;

  

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = userRegister;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
    if (successCreate) {
      setCreate(false);
    }

    dispatch(listUsers());
  },[dispatch, navigate, successDelete]
  );

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
          onClick: () => dispatch(deleteUser(id)),
        },
      ],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    if (password !== confirmpassword) {
      setMessage("Passwords do Not Match");
    } else {
      dispatch(register(name, email, password, phone));
    }
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
                {/* Users ({users && users.length}) */}
              </Typography>
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Input label="Search user by name" />
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
                <MenuItem onClick={() => setCreate(true)} className=" capitalize">
                  Add New User
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            {/* {loadingDelete && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )} */}
            {/* {errorDelete && <Message severity="error" text={errorDelete} />} */}
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {["NAME", "EMAIL", "Phone", "ROLE", ""].map((el) => (
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
                <tbody className="overflow-y-auto">
                  {users.map((user) => (
                    <tr>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium text-blue-gray-400"
                        >
                          {user.name}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium  text-blue-gray-400"
                        >
                          {user.email}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {user.phone}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-2 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {user.isAdmin  ? (
                            <p className="bg-blue-600 text-center text-white ">
                              Admin
                            </p>
                          ) : (
                            <p className="bg-green-500 text-center text-white ">
                              user
                            </p>
                          )}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton
                              size="sm"
                              variant="text"
                              color="blue-gray"
                            >
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-6 w-6"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                setRole(user.role);
                                setId(user._id)
                                setEditRole(true);
                                
                              }}
                            >
                              Edit Role
                            </MenuItem>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem onClick={() => deleteHandler(user._id)}>
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
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
        aria-expanded={editRole ? true : false}
        header="Update User Role"
        visible={editRole}
        onHide={() => {
          setEditRole(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >

        <div className="flex flex-wrap gap-3">
          <div className="align-items-center flex">
            <RadioButton
              inputId="ingredient1"
              name="stage"
              value={1}
              onChange={(e) => setRole(e.value)}
              checked={role === 1}
            />
            <label htmlFor="ingredient1" className="ml-2">
              User
            </label>
          </div>
          <div className="align-items-center flex">
            <RadioButton
              inputId="ingredient2"
              name="stage"
              value={2}
              onChange={(e) => setRole(e.value)}
              checked={role === 2}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Admin
            </label>
          </div>
        </div>
        <br />
        <div className="flex justify-center">
          <Button onClick={() => dispatch(UpdateUserRole(id, role))}>Update</Button>
        </div>
      </Dialog>

      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Ticket"
        visible={create}
        onHide={() => {
          setCreate(false);
          setName("");
          setPhone("");
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler}>
          {message && (
            <Message severity="error" sticky="true">
              {message}
            </Message>
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
          <div className="mx-auto space-y-4 p-4">
            <Input
              type="text"
              value={name}
              label="Full Name"
              size="lg"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="email"
              value={email}
              label="Email Address"
              size="lg"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="number"
              value={phone}
              label="Phone Number"
              size="lg"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <Password
              inputClassName="w-full"
              className=" w-full"
              value={password}
              required
              placeholder="type password"
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
            />
            <Password
              inputClassName="w-full"
              className=" w-full"
              required
              value={confirmpassword}
              placeholder="confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
            />

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

export default UsersScreen;
