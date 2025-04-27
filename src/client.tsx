import React, { Suspense } from "react";

import { getTodoList } from "./lib";
import { ClientComponent } from "./clientComponent";

/**
 * From https://jsonplaceholder.typicode.com/
 */

async function TodoList() {
  const todoList = await getTodoList();

  return (
    <ul>
      {todoList.map((todoItem) => {
        return (
          <li key={todoItem.id}>
            {todoItem.title}
            <ClientComponent />
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <Suspense fallback={<div>loading...</div>}>
        <TodoList />
      </Suspense>
    </div>
  );
}

export default App;
