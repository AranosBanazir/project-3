import TaskCard from "../../components/TaskCard";

const ChildTasks = ({ data }) => {
  console.log(data)
  return (
    <>
      <div id="section-container" className="mt-10">
        <div className="font-extrabold text-6xl mx-10 permanent-marker-regular task-header-text">
          <img src="/assets/my-tasks-banner.png" alt="" />
        </div>
        <div className="flex flex-wrap flex-row mx-auto items-center justify-center kid-item-container">
          <section
            id="task-section"
            className="w-auto flex flex-wrap flex-row justify-evenly"
            style={{ margin: "20px" }}
          >
            {data?.tasks.map((task) => {
              return (
                <TaskCard
                  task={task}
                  showDeleteButton={false}
                  userType={data.__typename}
                />
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export default ChildTasks;
