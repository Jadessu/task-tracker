import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as RiIcons from "react-icons/ri"
import * as GrIcons from "react-icons/gr"
import * as BsIcons from "react-icons/bs"
import * as MdIcons from "react-icons/md"

export const SidebarData = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
            title: "In Progress",
            path: "/tasks/inprogress",
            icon: <GrIcons.GrInProgress/>,
        },
        {
            title: "Completed",
            path: "/tasks/completed",
            icon: <BsIcons.BsCalendarCheck/>,
        },
        {
            title: "On Hold",
            path: "/tasks/onhold",
            icon: <MdIcons.MdNotificationsPaused/>
        }
    ]
  },
  {
      
  }
];
