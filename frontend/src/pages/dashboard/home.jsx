import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import StatisticsCard2 from "@/widgets/cards/statistics-card2";
import { FcSalesPerformance } from "react-icons/fc";
import { BiStore } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import {
  AiFillDollarCircle,
  AiOutlineWarning,
} from "react-icons/ai";





export function Home() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(()=>{
      if (!userInfo && !userInfo.isAdmin) {
          navigate("/sign-in");
        }
  },[userInfo])
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      <StatisticsCard2
          color="pink"
          title={"Total Sales"}
          icon={<FcSalesPerformance className="h-6 w-6" />}
          value={"0"}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className="text-green-500"
              >
                0%
              </strong>
              &nbsp;
              {"more than yesterday"}
            </Typography>
          }
        />
        <StatisticsCard2
          color="green"
          title={"Total Products"}
          icon={<BiStore className="h-6 w-6" />}
          value={"0"}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className="text-green-500"
              >
                0%
              </strong>
              &nbsp;
              {"more than yesterday"}
            </Typography>
          }
        />
        <StatisticsCard2
          color="orange"
          title={"Total Users"}
          icon={<FaUsers className="h-6 w-6" />}
          value={"0"}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className="text-green-500"
              >
                0%
              </strong>
              &nbsp;
              {"more than yesterday"}
            </Typography>
          }
        />
        <StatisticsCard2
          color="purple"
          title={"Total Amount"}
          icon={<AiFillDollarCircle className="h-6 w-6" />}
          value={"0"}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className="text-green-500"
              >
                0%
              </strong>
              &nbsp;
              {"more than yesterday"}
            </Typography>
          }
        />
      </div>
     
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Recent Orders
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
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Order No","Name"	,"Phone"	,"Date",	"PAYMENT METHOD",	"TOTAL",	"IsPaid"	, "IsDelivered"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
