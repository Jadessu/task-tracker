import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as RiIcons from "react-icons/ri"
import * as BsIcons from "react-icons/bs"
import * as MdIcons from "react-icons/md"
import * as BiIcons from "react-icons/bi"
import * as VsIcons from "react-icons/vsc"


export const SidebarData = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <FaIcons.FaTasks />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Not Started",
        path: "/tasks/notstarted",
        icon: <VsIcons.VscDebugRestartFrame />,
      },
      {
        title: "In Progress",
        path: "/tasks/inprogress",
        icon: <FaIcons.FaHourglassStart />,
      },
      {
        title: "Completed",
        path: "/tasks/completed",
        icon: <BsIcons.BsCalendarCheck />,
      },
      {
        title: "On Hold",
        path: "/tasks/onhold",
        icon: <MdIcons.MdNotificationsPaused />,
      },
    ],
  },
 
];
