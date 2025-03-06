import { useState } from "react";

const handleOnChange = ({ e, form, setForm }) => {
  let { checked, name, value, files } = e.target;
  console.log(name, checked);

  if (name === "status") {
    value = checked ? "active" : "inactive";
  }

  if (name === "bookFile" && files) {
    setForm({
      ...form,
      [name]: files[0],
    });
  } else {
    setForm({
      ...form,
      [name]: value,
    });
  }
};

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChange({ e, form, setForm }),
  };
};

export default useForm;
