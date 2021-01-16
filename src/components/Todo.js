import React, { useEffect, useRef, useState } from "react";

export default function Todo(props) {
  //フック処理⇒isEditing=falseで初期設定
  const [isEditing, setEditing] = useState(false);

  //edeitingTempleteでのform入力nameをフックする
  const [newName, setNewName] = useState("");

  //ref属性にフォーカスするフック？２つのtempleteでのフィールド用とボタン用
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  //↑でform入力した文字をstate
  function handleChange(e) {
    setNewName(e.target.value);
  }
  //コールバックprops（Formでaddtask()をコールバックしたのと同じ処理）
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  //追加テンプレート：編集ver
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          新しい任務は 『{props.name}』 だよ
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          やっぱりヤメ！
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          ＳＡＶＥ！
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  //テンプレート②　表示 ver
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          変更 <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          削除 <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  //関数処理の後に起こるように設定する高階関数
  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
    } else {
      editButtonRef.current.focus();
    }
  }, [isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
