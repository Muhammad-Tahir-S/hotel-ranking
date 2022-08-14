import React from "react";
import { Box, Button, Flex, Text, ThemeUIStyleObject } from "theme-ui";
import { IHotel } from "../interfaces/hotel";
import { useFormik } from "formik";
import { TextInput } from "../components/textInput/TextInput";
import { Select } from "antd";
import { hotelFormSchema } from "../schema";
import { motion } from "framer-motion";
import { IChain } from "../interfaces/chain";
import { updateArr } from "../utils/updateArr";

const InputRowStyle: ThemeUIStyleObject = {
  gap: "30px",
  mt: "10px",
  flexWrap: ["wrap", "nowrap"],
};

const InputsContainerStyle: ThemeUIStyleObject = {
  width: "100%",
  backgroundColor: "bgGrey",
  flexDirection: "column",
};

interface IHotelForm {
  chains: IChain[];
  hotel: Partial<IHotel> | null;
}

const HotelForm = ({ chains, hotel }: IHotelForm): JSX.Element => {
  const hotelInitialValues = {
    name: hotel?.name || "",
    city: hotel?.city || "",
    country: hotel?.country || "",
    address: hotel?.address || "",
    chain: hotel?.chain || "",
    price: hotel?.price || "",
    imgUrl: hotel?.imgUrl || "",
    rating: hotel?.rating?.toString() || "",
  };

  const { Option } = Select;

  const errorVariants = {
    valid: {
      opacity: 0,
      y: -10,
    },
    invalid: {
      opacity: 1,
      y: 0,
    },
  };

  const formik = useFormik({
    initialValues: hotelInitialValues,
    validationSchema: hotelFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      const payload = {
        ...values,
        rating: parseInt(values.rating) as IHotel["rating"],
      };
      const hotels = localStorage.getItem("hotels");
      const jsonHotels = JSON.parse(hotels as string) || [];

      const newHotel = { ...payload, _id: new Date().toString() };
      const updatedArr = jsonHotels.some((i: IHotel) => i._id === newHotel._id)
        ? [...jsonHotels]
        : [...jsonHotels, newHotel];
      const updatedHotels = hotel?._id
        ? updateArr(jsonHotels, hotel?._id as string, values)
        : updatedArr;
      const updateHotelsString = JSON.stringify(updatedHotels);
      localStorage.setItem("hotels", updateHotelsString);
      window.location.reload();
    },
  });

  const { values, setFieldValue, errors, touched, handleBlur, handleSubmit } =
    formik;

  const handleChainChange = (value: string) => {
    setFieldValue("chain", value);
  };

  const handleRatingChange = (value: string) => {
    setFieldValue("rating", value);
  };

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Flex sx={InputsContainerStyle}>
        <Flex sx={InputRowStyle}>
          <TextInput
            id="name"
            type="text"
            value={values.name}
            label="Name"
            placeholder="Enter name"
            onChange={(v) => setFieldValue("name", v)}
            onBlur={handleBlur}
            valid={!!errors["name"]}
            error={errors["name"]}
            touched={touched["name"]}
          />
          <TextInput
            id="city"
            type="text"
            value={values.city}
            label="City"
            placeholder="Enter city"
            onChange={(v) => setFieldValue("city", v)}
            onBlur={handleBlur}
            valid={!!errors["city"]}
            error={errors["city"]}
            touched={touched["city"]}
          />
        </Flex>
        <Flex sx={InputRowStyle}>
          <TextInput
            id="country"
            type="text"
            value={values.country}
            label="Country"
            placeholder="Enter country"
            onChange={(v) => setFieldValue("country", v)}
            onBlur={handleBlur}
            valid={!!errors["country"]}
            error={errors["country"]}
            touched={touched["country"]}
          />
          <TextInput
            id="address"
            type="text"
            value={values.address}
            label="Address"
            placeholder="Enter address"
            onChange={(v) => setFieldValue("address", v)}
            onBlur={handleBlur}
            valid={!!errors["address"]}
            error={errors["address"]}
            touched={touched["address"]}
          />
        </Flex>
        <Flex sx={InputRowStyle}>
          <TextInput
            id="price"
            type="text"
            value={values.price}
            label="Price"
            placeholder="Enter price"
            onChange={(v) => setFieldValue("price", v)}
            onBlur={handleBlur}
            valid={!!errors["price"]}
            error={errors["price"]}
            touched={touched["price"]}
          />

          <TextInput
            id="imgUrl"
            type="text"
            value={values.imgUrl}
            label="Image Url"
            placeholder="Enter imgUrl"
            onChange={(v) => setFieldValue("imgUrl", v)}
            onBlur={handleBlur}
            valid={!!errors["imgUrl"]}
            error={errors["imgUrl"]}
            touched={touched["imgUrl"]}
          />
        </Flex>

        <Flex sx={{ gap: "30px", mt: "10px", alignItems: "flex-end" }}>
          <Box
            sx={{
              flex: "1",
            }}
          >
            <Text sx={{ fontWeight: "bold" }}>Chain</Text>
            <Select
              showSearch
              defaultValue={values.chain}
              size={"large"}
              style={{ width: "100%" }}
              placeholder="Search to Select"
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
              onChange={handleChainChange}
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
            {errors.chain && touched.chain ? (
              <motion.div
                style={{
                  marginBottom: errors.chain ? 10 : 0,
                }}
                variants={errorVariants}
                initial={errors.chain && touched.chain ? "invalid" : "valid"}
                animate={errors.chain && touched.chain ? "invalid" : "valid"}
              >
                <Text
                  sx={{
                    color: "red",
                    maxWidth: "100px",
                  }}
                >
                  {errors.chain as string}
                </Text>
              </motion.div>
            ) : null}
          </Box>
          <Box
            sx={{
              flex: "1",
            }}
          >
            <Text sx={{ fontWeight: "bold" }}>Rating</Text>
            <Select
              showSearch
              defaultValue={values.rating}
              size={"large"}
              style={{ width: "100%" }}
              placeholder="Select hotel rating"
              onChange={handleRatingChange}
            >
              <Option value={"20"}>1</Option>
              <Option value={"40"}>2</Option>
              <Option value={"60"}>3</Option>
              <Option value={"80"}>4</Option>
              <Option value={"100"}>5</Option>
            </Select>
          </Box>
        </Flex>

        <Flex sx={{ justifyContent: "center", mt: "40px" }}>
          <Button
            sx={{ height: "44px", width: "40%" }}
            onClick={() => handleSubmit()}
          >
            {hotel?._id ? "Edit" : "Add"} Hotel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HotelForm;
