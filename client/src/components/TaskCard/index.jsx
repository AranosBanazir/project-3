import React from "react";
import { useMutation } from "@apollo/client";
import { CONFIRM_TASK, DENY_TASK } from "../../utils/mutations";
import { FaStar, FaCoins } from "react-icons/fa";
import { QUERY_SINGLE_USER } from "../../utils/queries";

const TaskCard = ({ task, userType, showDeleteButton }) => {
  const [confirmTaskComplete] = useMutation(CONFIRM_TASK);
  const [denyTask] = useMutation(DENY_TASK)

  console.log(task)
  const handleRedeemClick = async (e) => {
    
    const taskCard = document.getElementById(`${task._id}`)
    taskCard.classList.add('task-complete')
    setTimeout(async () => {
      taskCard.setAttribute('style', 'display: none;')
      try {
        const response = await confirmTaskComplete({ 
          variables: { 
            taskId: task._id, 
            childId : task.owner
           },
           refetchQueries:[QUERY_SINGLE_USER, 'User']
         })
         
      

      } catch (err) {
        console.error('Error redeeming task:', err);
      }
    }, 3000);

      
  };

  const handleDenyClick = async () => {
    try {
      const response = await denyTask({
        variables: {
          taskId: task._id,
        },
        refetchQueries: [QUERY_SINGLE_USER, "user"],
      }).then(({ data }) => {
        if (
          (!data.denyTask.childConfirmed && !data.denyTask.parentConfirmed) ||
          (data.denyTask.childConfirmed && !data.denyTask.parentConfirmed)
        ) {
          const taskCard = document.getElementById(`${task._id}`);
          taskCard.classList.add("task-complete");
          setTimeout(() => {
            taskCard.setAttribute("style", "display: none;");
          }, 4000);
        }
      });
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="card my-2" id={`${task._id}`} key={task._id}>
      <div className="sticky-note h-[400px] items-center">
        <h5 className="card-title text-black permanent-marker-regular text-2xl font-bold mt-[93px]">
          {task.name}
        </h5>
        <p className="text-wrap task-description-div text-black font-bold text-xl task-text">
          {task.description}
        </p>
        <div>
          <p className="text-wrap text-black font-bold task-text flex flex-row items-center justify-center">
            Points: {task.points}
            <img src="/assets/coin.gif" className="w-[30px]" />
          </p>
        </div>
        <div>
          <button className="btn btn-success mx-2" onClick={handleRedeemClick}>
            {task.childConfirmed && userType === "Child" ? (
              <p>Good Job!</p>
            ) : task.childConfirmed && userType === "Parent" ? (
              <p>Confirm</p>
            ) : (
              <p>Complete</p>
            )}
          </button>
          {showDeleteButton && (
            <button className="btn btn-danger" onClick={handleDenyClick}>
              Deny
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
