import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Correctly importing v4 from uuid
import DisplayTodo from "./components/displayTodo";
import useLocalTheme from "./components/utils/useLocalTheme";
import SaveTodos from "./components/utils/SaveTodos";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";

//Defining variables
type TodoItem = {
  id: string;
  text: string;
  isActive: boolean;
  dueDate: Date;
};

//Local Storage keys
const themekey = "FEM_Theme";
const todokey = "FEM_Todo";

export default function App() {
  const [prefersTheme, setPrefersTheme] = useLocalTheme(themekey, "light") as [
    string,
    React.Dispatch<React.SetStateAction<string | null>>
  ];
  const [input, setInput] = useState("");
  const [activeTodos, setActiveTodos] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedToUpdate, setSelectedToUpdate] = useState("");
  //Getting the stored items
  const [todoList, setTodoList] = SaveTodos(todokey);
  const [currentTodoList, setCurrentTodoList] = useState(todoList);

  const handleTodoInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleThemeSwitch = () => {
    setPrefersTheme(prefersTheme === "dark" ? "light" : "dark");
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    if (input.length > 3) {
      setInput("");
      const newId = uuidv4();
      const today = new Date();
      const dueDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 90
      ); // Due date 90 days from now
      const newTodo: TodoItem = {
        id: newId,
        text: input,
        isActive: true,
        dueDate: dueDate,
      };
      const updatedTodos = [...todoList, newTodo];
      const alreadyExist = todoList?.find(
        (item: TodoItem) => item.text.toLowerCase() === input.toLowerCase()
      );
      if (alreadyExist) alert("Todo already exist. Cannot add duplicates");
      else setTodoList(updatedTodos);
    }
    setCurrentTodoList(todoList);
  };

  const handleTodoCheck = (id: string) => {
    const updatedTodos: any = [];
    todoList.map((item: TodoItem) => {
      if (item.id === id) {
        item.isActive === true
          ? (item.isActive = false)
          : (item.isActive = true);
        updatedTodos.push(item);
      } else {
        updatedTodos.push(item);
      }
    });
    setTodoList(updatedTodos);
    setCurrentTodoList(todoList);
  };

  const handleDeleteTodo = (id: string) => {
    const otherTodos = todoList.filter((item: TodoItem) => item.id !== id);
    setTodoList(otherTodos);
    setCurrentTodoList(todoList);
  };

  const calculateActiveTodos = () => {
    let Aitems = 0;
    todoList.map((item: TodoItem) => {
      if (item.isActive) Aitems += 1;
    });
    setActiveTodos(Aitems);
    setCurrentTodoList(todoList);
  };

  const clearCompleted = () => {
    const filteredTodos = todoList.filter(
      (item: TodoItem) => item.isActive === true
    );
    setTodoList(filteredTodos);
    setCurrentTodoList(todoList);
  };

  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "all") {
      setCurrentTodoList(todoList);
    } else if (tabName === "active") {
      const activeItems = todoList.filter(
        (item: TodoItem) => item.isActive === true
      );
      setCurrentTodoList(activeItems);
    } else {
      const completeItems = todoList.filter(
        (item: TodoItem) => item.isActive === false
      );
      setCurrentTodoList(completeItems);
    }
  };

  const handleTodoUpdate = (id: string) => {
    setSelectedToUpdate(selectedToUpdate === id ? "" : id);
    setIsUpdate(isUpdate === true ? false : true);
  };

  const handleSaveUpdatedValue = (
    id: string,
    newText: string,
    dueDate?: string | Date
  ) => {
    const newTodoItem = {
      id: id,
      text: newText,
      dueDate: dueDate,
      isActive: true,
    };
    const oldTodoList = todoList.filter((item: TodoItem) => item.id !== id);
    const newTodoList = [newTodoItem, ...oldTodoList];
    setTodoList(newTodoList);
  };

  useEffect(() => {
    calculateActiveTodos();
  }, [todoList, todokey]);

  return (
    <div
      className="app w-main h-screen flex flex-col items-center justify-start pb-6 bg-light-v-light-gray
          dark:bg-dark-v-dark-blue font-main overflow-y-hidden"
    >
      <div className="w-full">
        <Header
          handleSubmitForm={handleSubmitForm}
          handleThemeSwitch={handleThemeSwitch}
          handleTodoInput={handleTodoInput}
          input={input}
          prefersTheme={prefersTheme}
        />
        <div className="w-full lg:h-auto lg:max-h-[15rem] h-auto max-h-[19rem] px-[6%] xl:px-[28%] lg:px-[26%] md:px-[22%] sm:px-[16%] absolute lg:top-[17.4rem] top-[15.5rem]">
          <div
            className={`w-full lg:h-auto lg:max-h-[15rem] h-auto max-h-[19rem] flex flex-col items-center justify-start rounded-t-lg overflow-x-hidden ${
              todoList?.length > 1 && "shadow-md shadow-gray-900"
            }`}
          >
            {todoList?.length < 1 ? (
              <div className="h-auto mt-[10rem] w-full flex flex-row items-center justify-center">
                <h1 className="dark:text-white text-black font-bold text-[1.1rem]">
                  No to item yet. Please add one.
                </h1>
              </div>
            ) : (
              currentTodoList?.map((item: TodoItem, index: number) => (
                <div
                  key={`${item.id}-${index}`}
                  className={`w-full h-[3.4rem] bg-light-v-light-gray-blue dark:bg-dark-v-dark-desaturated-blue dark:border-dark-hovered-primary border-light-dark-gray-blue border-t-[0.1px] border-solid border-opacity-[0.5] first:border-none ${
                    isUpdate ? "cursor-default" : "cursor-pointer"
                  } hover-hovered-v-dark-gray-blue-primary`}
                >
                  <DisplayTodo
                    key={`${index}-${item.id}`}
                    todo={item}
                    handleTodoCheck={handleTodoCheck}
                    handleDeleteTodo={handleDeleteTodo}
                    handleTodoUpdate={handleTodoUpdate}
                    selectedToUpdate={selectedToUpdate}
                    handleSaveUpdatedValue={handleSaveUpdatedValue}
                    isUpdate={isUpdate}
                  />
                </div>
              ))
            )}
          </div>
          {todoList?.length >= 1 && (
            <StatusBar
              clearCompleted={clearCompleted}
              activeTodos={activeTodos}
              activeTab={activeTab}
              changeTab={changeTab}
              isUpdate={isUpdate}
            />
          )}
        </div>
        {todoList?.length >= 1 && (
          <span className="dark:text-white text-black opacity-50 text-[12px] absolute bottom-1 w-full text-center cursor-default">
            Drag and drop to reorder
            <br /> Press the down arrow key to view all items
          </span>
        )}
      </div>
    </div>
  );
}
