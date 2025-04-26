const delay = (timeout = 2_000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

/**
 * From https://jsonplaceholder.typicode.com/
 */
export const getTodoList = async () => {
  await delay(5000);

  return [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false
    },
    {
      userId: 1,
      id: 4,
      title: "et porro tempora",
      completed: true
    }
  ];
};
