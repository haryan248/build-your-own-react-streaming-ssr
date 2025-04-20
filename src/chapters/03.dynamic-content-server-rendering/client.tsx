import React, { Suspense } from "react";

import { fetchTodoList } from "~/utils/fetch";

async function TodoList() {
  const todoList = await fetchTodoList();

  return (
    <ul>
      {todoList.map((todo) => {
        const { id, title } = todo;

        return <li key={id}>{title}</li>;
      })}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>Hello Stream</h1>
      <Suspense fallback={<div>loading todo...</div>}>
        <TodoList />
      </Suspense>
    </div>
  );
}

export default App;
