import ReactApp, { useEffect, useState } from "react";
import "./App.css";
import { Button, Text, ThemeProvider, Flex } from "theme-ui";
import { theme } from "./theme";
import NavBar from "./components/navBar";
import HotelCard from "./components/hotelCard";
import HotelForm from "./panels/hotelForm";
import { IHotel } from "./interfaces/hotel";
import { IChain } from "./interfaces/chain";
import ChainForm from "./panels/chainForm";
import { deleteItem } from "./utils/deleteItem";
import { Select } from "antd";

const App = (): JSX.Element => {
  const [hotels, setHotels] = useState<IHotel[] | null>([]);
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [selectedHotel, setSelectedHotel] = useState<Partial<IHotel> | null>(
    null
  );
  const [chains, setChains] = useState<IChain[]>([]);
  const [filterBy, setFilterBy] = useState<string[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<IHotel[]>([]);

  const { Option } = Select;

  useEffect(() => {
    const hotels = localStorage.getItem("hotels");
    setHotels(JSON.parse(hotels as string));
  }, []);

  useEffect(() => {
    const chains = localStorage.getItem("chains");
    setChains(JSON.parse(chains as string));
  }, []);

  const handleTabChange = (tabItem: string) => {
    setActiveTab(tabItem);
  };

  const handleEditHotel = (id: string | number) => {
    const hotelById = hotels?.find((h) => h._id === id);
    setSelectedHotel(hotelById as IHotel);
    setActiveTab("Hotel");
  };

  const handleDeleteHotel = (id: string) => {
    deleteItem(id, "hotels");
    window.location.reload();
  };

  const handleFilterChange = (v: string[]) => {
    setFilterBy(v);
    setFilteredHotels(
      hotels?.filter((hotel: IHotel) =>
        v?.includes(hotel?.chain as string)
      ) as IHotel[]
    );
  };

  console.log("filteredHotels", filteredHotels);

  const renderHotelsList = () => {
    return (
      <>
        <Button
          onClick={() => {
            setSelectedHotel(null);
            setActiveTab("Hotel");
          }}
        >
          Add a hotel
        </Button>

        <Select
          showSearch
          size={"large"}
          style={{ width: "100%", marginBottom: "40px" }}
          mode="multiple"
          allowClear
          placeholder="Filter by chain(s)"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string).includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare(
                (optionB!.children as unknown as string).toLowerCase()
              )
          }
          onChange={handleFilterChange}
        >
          {chains?.length > 0 ? (
            chains.map((chain) => (
              <Option key={chain._id} value={chain.name}>
                {chain.name}
              </Option>
            ))
          ) : (
            <Option disabled key={"none_xyz"} value={"none"}>
              None found. Please go create a hotel chain.
            </Option>
          )}
        </Select>

        {filterBy.length > 0 ? (
          filteredHotels?.map((hotel, index) => (
            <HotelCard
              key={index}
              _id={hotel?._id}
              name={hotel?.name}
              city={hotel?.city}
              country={hotel?.country}
              address={hotel?.address}
              rating={hotel?.rating}
              price={hotel?.price}
              handleEditHotel={handleEditHotel}
              handleDeleteHotel={handleDeleteHotel}
              chain={hotel.chain}
              imgUrl={hotel.imgUrl}
            />
          ))
        ) : !filteredHotels.length && filterBy.length ? (
          <Text sx={{ color: "black" }}>No hotels exist under this chain</Text>
        ) : (
          hotels?.map((hotel, index) => (
            <HotelCard
              key={index}
              _id={hotel?._id}
              name={hotel?.name}
              city={hotel?.city}
              country={hotel?.country}
              address={hotel?.address}
              rating={hotel?.rating}
              price={hotel?.price}
              handleEditHotel={handleEditHotel}
              handleDeleteHotel={handleDeleteHotel}
              chain={hotel.chain}
              imgUrl={hotel.imgUrl}
            />
          ))
        )}
      </>
    );
  };

  const renderActivePanel = () => {
    if (activeTab === "Home") {
      return renderHotelsList();
    } else if (activeTab === "Hotel") {
      return <HotelForm chains={chains} hotel={selectedHotel} />;
    } else if (activeTab === "Chain") {
      return <ChainForm chains={chains} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "20px 60px" }}>
        <Flex
          sx={{
            flexDirection: "column",
            width: "100%",
            backgroundColor: "bgGrey",
          }}
        >
          <NavBar
            tabs={["Home", "Chain", "Hotel"]}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
          <Flex
            sx={{
              py: "40px",
              px: "100px",
              flexDirection: "column",
              gap: "30px",
              boxShadow: "0px 1px 15px 0px rgba(0,0,0,0.1) inset",
              minHeight: "80vh",
            }}
          >
            {renderActivePanel()}
          </Flex>
        </Flex>
      </div>
    </ThemeProvider>
  );
};

export default App;
