import React from "react";
import { Rating } from "react-simple-star-rating";
import { Button, Flex, Text } from "theme-ui";
import { IHotel } from "../../interfaces/hotel";
import { IoTrashBin } from "react-icons/io5";

interface IHotelCard extends IHotel {
  handleEditHotel: (id: string | number) => void;
  handleDeleteHotel: (id: string) => void;
}

const HotelCard = ({
  name,
  city,
  country,
  address,
  chain,
  rating,
  price,
  imgUrl,
  handleEditHotel,
  handleDeleteHotel,
  _id,
}: IHotelCard): JSX.Element => {
  return (
    <Flex
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "8px",
        flexDirection: ["column", "row"],
      }}
    >
      <div>
        <img
          style={{ borderRadius: "8px 0 0 8px", objectFit: "cover" }}
          src={
            imgUrl ||
            "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          }
          width="220"
          height="180"
          alt="hotel"
        />
      </div>
      <Flex
        sx={{
          justifyContent: "space-between",
          width: "100%",
          alignSelf: "center",
          px: "25px",
          py: ["20px", 0],
          flexDirection: ["column", "row"],
        }}
      >
        <Flex sx={{ flexDirection: "column" }}>
          <Button sx={{ width: "fit-content", px: "7px" }} variant="muted">
            {chain || "No Chain"}
          </Button>
          <Flex sx={{ flexDirection: "column", gap: "8px", my: "17px" }}>
            <Text
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                wordWrap: "break-word",
              }}
            >
              {name}
            </Text>
            <Rating
              ratingValue={rating as number}
              readonly={true}
              size={15}
              fillColor="#FA831A"
            />
          </Flex>
          <Text
            sx={{
              textTransform: "uppercase",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {address}, {city}, {country}
          </Text>
        </Flex>
        <Flex
          sx={{
            flexDirection: ["row", "column"],
            justifyContent: "space-between",
            alignItems: ["center", "flex-end"],
            py: ["10px", 0],
          }}
        >
          <Text
            sx={{ fontSize: "32px", fontWeight: "bold", color: "secondary" }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "grey",
                verticalAlign: "super",
              }}
            >
              $
            </span>
            {price}
          </Text>
          <Flex
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                outline: "none",
                transform: "rotate(25deg)",
              },
              svg: {
                fill: "red",
              },
            }}
          >
            <IoTrashBin size={24} onClick={() => handleDeleteHotel(_id)} />
          </Flex>
          <Button onClick={() => handleEditHotel(_id)}>Edit details</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HotelCard;
