import React, { useState } from "react";
import { Button, Flex, Text, useThemeUI } from "theme-ui";
import { IoTrashBin } from "react-icons/io5";
import { useFormik } from "formik";
import { TextInput } from "../components/textInput/TextInput";
import { chainFormSchema } from "../schema";
import { IChain } from "../interfaces/chain";
import { updateArr } from "../utils/updateArr";
import { deleteItem } from "../utils/deleteItem";

interface IChainForm {
  chains: IChain[];
}

const ChainForm = ({ chains }: IChainForm): JSX.Element => {
  const [selectedChain, setSelectedChain] = useState<IChain | null>(null);
  const { theme } = useThemeUI();

  const handleDeleteChain = (id: string) => {
    deleteItem(id, "chains");
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: { name: selectedChain?.name || "" },
    validationSchema: chainFormSchema,
    onSubmit: (values, { setSubmitting }) => {
      const chains = localStorage.getItem("chains");
      const jsonChains = JSON.parse(chains as string) || [];

      const newChain = { ...values, _id: values.name };
      const updatedArr = jsonChains.some(
        (i: IChain) => i.name === newChain.name
      )
        ? [...jsonChains]
        : [...jsonChains, newChain];

      const updatedChains = selectedChain?._id
        ? updateArr(jsonChains, selectedChain?._id as string, newChain)
        : updatedArr;
      const updateChainsString = JSON.stringify(updatedChains);
      localStorage.setItem("chains", updateChainsString);
      window.location.reload();
    },
  });

  const {
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    resetForm,
    handleSubmit,
  } = formik;
  console.log("selectedChain", selectedChain);
  console.log(
    "ls-Chains",
    JSON.parse(localStorage.getItem("chains") as string)
  );

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Flex
        sx={{
          width: "100%",
          backgroundColor: "bgGrey",
          flexDirection: "column",

          // gap: "30px",
        }}
      >
        <TextInput
          id="name"
          type="text"
          value={values.name}
          label="Chain"
          placeholder="Enter chain name to add chain"
          onChange={(v) => setFieldValue("name", v)}
          onBlur={handleBlur}
          valid={!!errors["name"]}
          error={errors["name"]}
          touched={touched["name"]}
        />
        {chains.length > 0 ? (
          <Text sx={{ mt: "20px", fontWeight: "bold" }}>
            Click chain name to edit chain
          </Text>
        ) : null}
        <Flex sx={{ mt: "5px", gap: "35px", flexWrap: "wrap" }}>
          {chains?.map((ch) => (
            <Flex
              sx={{
                width: "fit-content",
                px: "10px",
                py: "7px",
                gap: "14px",
                border: `1px solid ${theme?.colors?.primary}`,
                backgroundColor: "#FDC99B",
                borderRadius: "8px",
                mt: "10px",
              }}
              key={ch._id}
            >
              <Text
                sx={{ cursor: "pointer", "&:hover": { color: "primary" } }}
                onClick={() => {
                  setSelectedChain(ch);
                  setFieldValue("name", ch.name);
                }}
              >
                {ch.name}
              </Text>{" "}
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
                <IoTrashBin
                  size={24}
                  onClick={() => handleDeleteChain(ch._id)}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
        <Flex sx={{ justifyContent: "center", mt: "40px" }}>
          <Button
            sx={{ height: "44px", minWidth: "40%" }}
            onClick={() => handleSubmit()}
          >
            {selectedChain?._id ? "Edit" : "Add"} Chain
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChainForm;
