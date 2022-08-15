import React from "react";
import { Flex, Text } from "theme-ui";
import { ITabs } from "../../interfaces/tabs";

const NavBar = ({ tabs, activeTab, setActiveTab }: ITabs): JSX.Element => {
  return (
    <Flex
      sx={{
        width: "100%",
        px: ["30px", "100px"],
        py: "20px",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Flex sx={{}}>
        {tabs.map((tabItem, index) => (
          <Text
            key={index}
            onClick={() => setActiveTab(tabItem)}
            sx={{
              color: activeTab === tabItem ? "secondary" : "primary",
              mr: "35px",
              cursor: "pointer",
              fontSize: "14px",
              position: "relative",
              fontWeight: "bold",
              height: "24px",
              "&:hover": {
                color: "secondary",
                transition: "all 0.2s ease-in-out",
              },
              "&:after": {
                position: "absolute",
                content: "''",
                width: "100%",
                height: ` ${activeTab === tabItem ? "2.5px" : "0px"}`,
                borderRadius: "8px",
                bottom: activeTab === tabItem ? "0" : "-1px",
                backgroundImage: "linear-gradient(to right, #00A781, #5CFFD9)",
                left: "0",
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            {tabItem}{" "}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;
