import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import CategoryScreen from "./pages/dashboard/categoryScreen";
import { TbCategoryFilled } from "react-icons/tb";
import { BiStore } from "react-icons/bi";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { AiFillSetting } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import ProductScreen from "./pages/dashboard/productScreen";
import SubCategoryScreen from "./pages/dashboard/subcategoryScreen";
import OrdersScreen from "./pages/dashboard/ordersScreen";
import SliderScreen from "./pages/dashboard/sliderScreen";
import SettingsScreen from "./pages/dashboard/settingsScreen";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TbCategoryFilled {...icon} />,
        name: "category",
        path: "/category",
        element: <CategoryScreen />,
      },
      {
        icon: <MdCategory {...icon} />,
        name: "subcategory",
        path: "/subcategory",
        element: <SubCategoryScreen/>,
      },
      {
        icon: <BiStore {...icon} />,
        name: "product",
        path: "/product",
        element: <ProductScreen />,
      },
      {
        icon: <FaCartShopping {...icon} />,
        name: "orders",
        path: "/orders",
        element: <OrdersScreen />,
      },
      {
        icon: <TfiLayoutSliderAlt {...icon} />,
        name: "slider",
        path: "/sliders",
        element: <SliderScreen />,
      },
      {
        icon: <AiFillSetting {...icon} />,
        name: "settings",
        path: "/settings",
        element: <SettingsScreen />,
      },
    ],
  },
 
];

export default routes;


// {
//   title: "auth pages",
//   layout: "auth",
//   pages: [
//     {
//       icon: <ArrowRightOnRectangleIcon {...icon} />,
//       name: "sign in",
//       path: "/sign-in",
//       element: <SignIn />,
//     },
//     {
//       icon: <UserPlusIcon {...icon} />,
//       name: "sign up",
//       path: "/sign-up",
//       element: <SignUp />,
//     },
//   ],
// },