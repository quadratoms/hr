import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import TabContent from "./TabContent";
import NoContent from "./NoContent";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Tab 1",
    children: <TabContent />,
  },
  {
    key: "2",
    label: "Tab 2",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Tab 3",
    children: "Content of Tab Pane 3",
  },
];

// const ApplicationForm: React.FC = () => (

// //   <Tabs className="w-full"  tabBarStyle={{background:"red", width:'100%'}} defaultActiveKey="1"  items={items} onChange={onChange} />
// );

const ApplicationForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = ["Tab 1", "Tab 2", "Tab 3"];
  const tabElement= [<NoContent/>, <TabContent />, <NoContent />]

  const handleTabClick = (index:number) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full h-full">
      <div
        style={{
          display: "flex",
          height: "65px",
        }}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(index)}
            className={`flex items-center justify-center relative flex-1 ${index === activeTab ? "activeArrow" : ""}`}
            style={{
              backgroundColor: index === activeTab ? "#d0f7fa" : "lightgray",
            }}
          >
            {tab}
          </div>
        ))}
      </div>
      <div  className="p-4 flex-col flex overflow-scroll h-full pb-10">
        {/* Content for the selected tab goes here */}
        {tabElement[activeTab]}
      </div>
    </div>
  );
};

export default ApplicationForm;
