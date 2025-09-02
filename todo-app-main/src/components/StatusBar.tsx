type params = {
  activeTodos: number;
  clearCompleted: () => void;
  activeTab: string;
  changeTab: (tabName: string) => void;
  isUpdate: boolean;
};

type tab = {
  name: string;
};
const statusTabs = [
  {
    name: "all",
  },
  {
    name: "active",
  },
  {
    name: "completed",
  },
];
const StatusBar = ({
  activeTodos,
  clearCompleted,
  activeTab,
  changeTab,
  isUpdate,
}: params) => {
  return (
    <div className="dark:text-white text-black text-[12px] w-full h-[3.4rem] bg-light-v-light-gray-blue flex flex-row items-center justify-between rounded-b-md dark:bg-dark-v-dark-desaturated-blue dark:border-dark-hovered-secondary border-light-dark-gray-blue border-t-[0.1px] border-solid shadow-md shadow-gray-900 px-2 lg:px-4 ">
      <section
        className={`text-[11px] lg:text-[12px] opacity-50 cursor-default`}
      >
        <span className="text-[15px]">{activeTodos}</span>{" "}
        {activeTodos === 1 ? "Item" : "Items"} left
      </section>
      <section className="w-[50%] px-4 text-[11px] gap-4 sm:text-[12px] sm:w-[24%] h-auto flex flex-row item-center ">
        {statusTabs.map((item: tab) => (
          <button
            key={item.name}
            className={`${
              activeTab === item.name ? "text-active-text" : "opacity-50"
            } capitalize`}
            onClick={() => changeTab(item.name)}
            disabled={isUpdate}
          >
            {item.name}
          </button>
        ))}
      </section>
      <button
        onClick={clearCompleted}
        className={`text-[11px] lg:text-[12px] opacity-50`}
        disabled={isUpdate}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default StatusBar;
