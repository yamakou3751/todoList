import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

//フィルターstateの其々の処理⇒key配列(タスクname)をFILTER_NAMESに格納
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

//key(ALL,Active,Completed)をFILTER_NAMESに格納
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
//タスクのデータを保持（フック）
  const [tasks, setTasks] = useState(props.tasks);

  //フィルターstate管理
  const [filter, setFilter] = useState('All');
 
  //以下、コールバックpropsの処理
  //name(form入力のvalue)を受け取り　⓵オブジェクトに変換　⓶フックを呼び出して追加
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  //チェックボックス機能（htmlのcheckbox要素と同期させる処理)
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);　//⇒idが一致したらリストにアップする
  }

  //（リストの）削除ボタン機能⇒idが一致しないものをstateで保持(=一致したら置換されるので削除される)
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  //エディット機能
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //オブジェクトの一部（name）を変更する
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //FILTER_MAPでfilterしたtaskだけmapに渡す
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  //FilterButtonコンポーネントにprops(FILTERのkey)を渡す
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //リストのコメント部分の処理
  const taskNum = taskList.length !== 1 ? 'コ' : 'コ';
  const headingText = `やる事は ${taskList.length} ${taskNum} 残ってるよ♪`;

    return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
