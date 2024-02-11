// import { list, check, todo, home } from "./Icons";
import { FaHome } from "react-icons/fa";
import { FaThList } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <FaHome />,
    link: "/",
  },
  {
    id: 2,
    title: "Important",
    icon: <FaThList />,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed",
    icon: <FaCheck />,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: <RiTodoFill />,
    link: "/incomplete",
  },
];

export default menu;