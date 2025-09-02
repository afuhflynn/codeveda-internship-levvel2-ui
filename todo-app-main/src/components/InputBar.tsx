type inputParams = {
  handleSubmitForm: (e: any) => void;
  handleTodoInput: (e: any) => void;
  input: string;
};

const InputBar = ({
  handleSubmitForm,
  handleTodoInput,
  input,
}: inputParams) => {
  return (
    <form
      onSubmit={handleSubmitForm}
      className="w-full h-[3.4rem] shadow-md shadow-gray-900 bg-light-v-light-gray-blue dark:bg-dark-v-dark-desaturated-blue rounded-xl flex flex-row items-center justify-start gap-5 px-4"
    >
      <button className="rounded-full h-[1.6rem] w-[1.6rem] font-bold dark:bg-dark-v-dark-desaturated-blue dark:border-dark-light-gray-blue border-light-dark-gray-blue border-[0.1px] border-solid"></button>
      <input
        type="text"
        placeholder="Enter a new task..."
        onChange={(e) => handleTodoInput(e)}
        value={input}
        name="task"
        className="h-full w-[90%] bg-transparent rounded-xl placeholder:text-gray-500 placeholder:text-[1rem] placeholder:font-light text-[0.9rem] ring-slate-300 outline-none border-none font-semibold dark:text-white text-black"
      />
    </form>
  );
};

export default InputBar;
