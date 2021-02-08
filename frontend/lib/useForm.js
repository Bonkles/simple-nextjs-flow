import { useState } from 'react';

export default function useForm(initial = {}) {
  // Create a state object for our inputs;
  const [inputs, setInputs] = useState(initial);
  // {
  //     name: 'Ben',
  //     description: 'hoo boy',
  //     price: 12000
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      console.log(`Type of input: ${type}`);
      value = parseInt(value);
    }
    if (type === 'file') {
      console.log(`Type of input: ${type}`);
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.entries(inputs).map(([key, value]) => [key, '']);
    setInputs(Object.fromEntries(blankState));
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
