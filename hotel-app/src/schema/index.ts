import * as Yup from "yup";

function parseStringInt(
  value: string | number,
  originalValue: string | number
) {
  const parsedDate =
    typeof originalValue === "number" ? originalValue : +originalValue;

  return parsedDate;
}

export const hotelFormSchema = Yup.object().shape({
  name: Yup.string().required("Hotel name is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  chain: Yup.string(),
  price: Yup.number()
    .required("Booking Price is required")
    .transform(parseStringInt),
  imgUrl: Yup.string(),
});

export const chainFormSchema = Yup.object().shape({
  name: Yup.string().required("Chain name is required"),
});
