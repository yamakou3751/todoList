import React from "react";

//button機能の開設
// ①子要素　名前はFILTERのkeyを受け取る　※他は多分class属性の為
// ②クリックイベントでAppコンポネのsetFilterフックをnameに更新
// ⓷（②より）stateがクリックされたFilterコンポネのnameなので、クリックされたbuttonのaria-pressedだけtrue（他はfalse）になる
//
function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;