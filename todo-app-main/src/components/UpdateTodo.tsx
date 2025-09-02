import { useState } from "react";
import { CheckCircle, Copy, PlusCircle } from "react-feather";

type params = {
  handleTodoUpdate: (id: string) => void;
  handleItemCopy: () => void;
  handleSaveUpdatedValue: (
    id: string,
    newText: string,
    dueDate?: string | Date
  ) => void;
  itemId: string;
  currentText: string;
};

const UpdateTodo = ({
  handleTodoUpdate,
  itemId,
  handleItemCopy,
  currentText,
  handleSaveUpdatedValue,
}: params) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [newText, setNewText] = useState(currentText);
  const [dueDate, setDueDate] = useState("");
  const handleCopyText = () => {
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  };

  const handleSetDate = () => {
    setIsSettingDate(true);
    setTimeout(() => {
      setIsSettingDate(false);
    }, 1000);
  };

  const handleNewInput = (e: any) => {
    setNewText(e.target.value);
  };

  const handleNewDateInput = (e: any) => {
    setDueDate(e.target.value);
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
      <section className="update-container dark:text-white text-black text-[12px] w-[95%] sm:h-[24rem] h-[23rem] md:w-[37.6%] md:h-[25rem] bg-light-v-light-gray-blue flex flex-col gap-5 items-center justify-center rounded-md dark:bg-dark-v-dark-desaturated-blue shadow-md shadow-gray-900 px-2 lg:px-4 ">
        <div className="flex flex-col w-[90%] h-auto pt-6">
          <h1 className="text-[1rem] mb-2 font-bold">Update Todo:</h1>
          <div className="flex flex-row items-center w-full justify-between">
            <input
              type="text"
              value={newText}
              onChange={handleNewInput}
              placeholder="Update todo text..."
              className="h-[80%] md:w-[74%] w-[68%] px-2 bg-transparent rounded-md text-[0.9rem] ring-slate-400 outline-none border-none ring-1 font-semibold dark:text-white text-black"
            />
            <button
              onClick={() => {
                handleItemCopy();
                handleCopyText();
              }}
              className="rounded-xl h-[2.6rem] w-[5.3rem] hover:scale-[0.95] text-white text-[16px] gap-2 text-shadow-lg flex flex-row items-center justify-center font-bold bg-copy-btn"
            >
              {isCopying ? "Copied" : "Copy"}{" "}
              <Copy className="h-full w-[20%]" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center w-[90%] h-[10rem] gap-6">
          <div className="flex flex-col w-full h-aut">
            <h1 className="text-[1rem] mb-2 font-bold">Set a due date:</h1>
            <div className="flex flex-row items-center w-full justify-between ">
              <input
                type="date"
                value={dueDate}
                onChange={handleNewDateInput}
                className="cursor-pointer h-[80%] w-[35%] bg-transparent rounded-md text-[16px] ring-slate-400 ring-1 outline-none border-none font-extralight px-2 dark:text-white text-black"
              />
              <button
                className="rounded-xl h-[2.6rem] w-[6rem] hover:scale-[0.95] text-white text-[16px] gap-2 text-shadow-lg flex flex-row items-center justify-center font-bold bg-copy-btn"
                onClick={handleSetDate}
              >
                {isSettingDate ? "Setting" : "Set"}{" "}
                <CheckCircle className="h-full w-[20%]" />
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              handleTodoUpdate(itemId);
              handleSaveUpdatedValue(itemId, newText, dueDate);
            }}
            className="is-inactive rounded-xl h-[2.6rem] w-[6rem] flex flex-row items-center justify-center font-bold text-white text-[16px] gap-2 hover:scale-[0.96]"
          >
            Save <PlusCircle className="h-full w-[20%]" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default UpdateTodo;
