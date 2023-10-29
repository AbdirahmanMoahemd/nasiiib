import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value,value2, value3, value4, value5, footer }) {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
        <br/>
        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <div class="h-3 w-3 rounded-full bg-blue-600 "></div>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              {value2}
            </Typography>
          </div>

          <div className="flex items-center space-x-1">
            <div class="h-3 w-3 rounded-full bg-yellow-300 "></div>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              {value3}
            </Typography>
          </div>
          

          <div className="flex items-center space-x-1">
            <div class="h-3 w-3 rounded-full bg-red-600 "></div>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              {value5}
            </Typography>
          </div>
          <div className="flex items-center space-x-1">
            <div class="h-3 w-3 rounded-full bg-green-500 "></div>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-600"
            >
              {value4}
            </Typography>
          </div>
        </div>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
