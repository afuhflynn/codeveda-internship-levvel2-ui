import DateComponent from "./DateComponent";
import InputBar from "./InputBar";
import { moonIcon, sunIcon } from "../assets";

type params = {
  handleThemeSwitch: () => void;
  handleSubmitForm: (e: any) => void;
  handleTodoInput: (e: any) => void;
  prefersTheme: string | null;
  input: string;
};
const Header = ({
  handleThemeSwitch,
  handleSubmitForm,
  handleTodoInput,
  prefersTheme,
  input,
}: params) => {
  return (
    <header className="dark:bg-desktop-dark-bg-img bg-desktop-light-bg-img w-full lg:h-[20rem] h-[18rem] bg-no-repeat bg-cover flex flex-col items-start justify-start gap-12 relative">
      <DateComponent />
      <div className="w-full h-auto flex flex-row items-center justify-between px-[6%] xl:px-[28%] lg:px-[26%] md:px-[22%] sm:px-[16%]">
        <h1 className="text-white text-[2.5rem] font-extrabold gap-2 flex flex-row uppercase">
          <span>t</span>
          <span>o</span>
          <span>d</span>
          <span>o</span>
        </h1>
        <button className="w-auto h-auto" onClick={handleThemeSwitch}>
          <img
            className="w-[1.6rem] h-[1.6rem]"
            src={prefersTheme === "dark" ? sunIcon : moonIcon}
          />
        </button>
      </div>
      <div className="w-full h-auto px-[6%] xl:px-[28%] lg:px-[26%] md:px-[22%] sm:px-[16%] absolute bottom-[4.5rem]">
        <InputBar
          handleSubmitForm={handleSubmitForm}
          handleTodoInput={handleTodoInput}
          input={input}
        />
      </div>
    </header>
  );
};

export default Header;
