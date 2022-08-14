export const updateArr = (arr: any[], id: string, values: any) => {
  const updatedArr = arr?.map((h) => {
    if (h._id === id) {
      return { ...h, ...values };
    } else {
      return { ...h };
    }
  });
  return updatedArr;
};
