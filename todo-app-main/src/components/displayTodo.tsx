import { useRef, useState } from "react";
import { Check, X } from "react-feather";
import useOnOutsideClick from "./utils/useOnOutsideClick";
import UpdateTodo from "./UpdateTodo";
type TodoItem = {
  id: string;
  text: string;
  isActive: boolean;
  dueDate: Date;
};
type params = {
  handleTodoCheck: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleTodoUpdate: (id: string) => void;
  handleSaveUpdatedValue: (
    id: string,
    newText: string,
    dueDate?: string | Date
  ) => void;
  selectedToUpdate: string;
  isUpdate: boolean;
  todo: TodoItem;
};
const DisplayTodo = ({
  todo,
  handleTodoCheck,
  handleDeleteTodo,
  handleTodoUpdate,
  selectedToUpdate,
  handleSaveUpdatedValue,
  isUpdate,
}: params) => {
  const buttonRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState("");

  //Calling for custom hook
  useOnOutsideClick(buttonRef, () => setSelectedItem(""));

  const handleItemHover = (id: string) => {
    setSelectedItem(id);
  };

  const handleItemCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(todo.text);
      }
    } catch (error: any) {
      alert("An error occured copying text. Check your browser compatibility!");
      console.log(error.message);
    }
  };

  return (
    <>
      {isUpdate && selectedToUpdate === todo.id && (
        <UpdateTodo
          itemId={todo.id}
          handleItemCopy={handleItemCopy}
          handleTodoUpdate={handleTodoUpdate}
          currentText={todo.text}
          handleSaveUpdatedValue={handleSaveUpdatedValue}
        />
      )}
      <div
        onMouseEnter={() => handleItemHover(todo.id)}
        onMouseLeave={() => setSelectedItem("")}
        className="todo-item"
      >
        <button
          onClick={() => handleTodoCheck(todo.id)}
          className={`${
            todo.isActive === false && "is-inactive text-white"
          } rounded-full h-[1.6rem] w-[1.6rem] flex flex-row items-center justify-center font-bold dark:bg-dark-v-dark-desaturated-blue dark:border-dark-light-gray-blue border-light-dark-gray-blue border-[0.1px] border-solid ${
            isUpdate && "hidden md:flex"
          }`}
          disabled={isUpdate}
        >
          {todo.isActive === false && (
            <Check className="w-[1.6rem] h-[1.6rem] p-[0.1rem]" />
          )}
        </button>
        {!isUpdate && (
          <p
            onClick={() => handleTodoUpdate(todo.id)}
            className={`${
              !todo.isActive && "opacity-40 line-through cursor-default"
            }text-light-v-dark-gray-blue dark:text-[#fffdef] font-small lg:text-sm text-[11px] pl-2 pr-[0.1rem] cursor-text border-[0.1rem] border-solid border-transparent dark:hover:border-dark-light-gray-blue hover:border-light-dark-gray-blue h-[68%] md:w-[28rem] w-[14rem] rounded-md flex flex-row items-center`}
          >
            {todo?.text}
          </p>
        )}
        {selectedItem === todo.id && !isUpdate && (
          <button
            ref={buttonRef}
            onClick={() => handleDeleteTodo(todo.id)}
            className="text-light-v-dark-gray-blue dark:text-dark-light-gray-blue opacity-30 absolute right-1 mr-1"
            disabled={isUpdate}
          >
            <X height={32} width={32} />
          </button>
        )}
      </div>
    </>
  );
};
// px-10 lg:px-16

export default DisplayTodo;
