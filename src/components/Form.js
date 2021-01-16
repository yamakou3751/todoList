import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  //submitイベントのデフォルト作動防止
  function handleSubmit(e) {
    e.preventDefault();
    if(!name) {
      return
    }
    props.addTask(name);
    setName('');
  }
  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          何かやる事ある？
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        やる気があるなら押してくれ！！
      </button>
    </form>
  );
}

export default Form;
