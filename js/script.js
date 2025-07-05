{
   let tasks = [];
   let hideDoneTasks = false;

   const refreshInput = (newTaskElement) => {
      newTaskElement.value = "";
      newTaskElement.focus();
   };

   const addTask = (newTaskContent) => {
      tasks = [
         ...tasks,
         { content: newTaskContent },
      ];
      render();
   };

   const toggleTaskDone = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
         },
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const removeTask = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const bindTaskEvents = () => {

      const toggleDoneButtons = document.querySelectorAll(".js-toggleTaskDone");
      const removeButtons = document.querySelectorAll(".js-removeTask");

      toggleDoneButtons.forEach((toggleDoneButton, index) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
         });
      });

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeTask(index);
         });
      });
   };

   const toggleHideDoneTasks = () => {
      hideDoneTasks = !hideDoneTasks;

      render();
   };

   const markAllTasksDone = () => {
      tasks = tasks.map(task => ({
         ...task,
         done: true,
      }));

      render();
   };

   const bindOptionButtonsEvents = () => {
      const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDone");
      const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

      if (markAllTasksDoneButton) {
         markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
      };

      if (hideDoneTasksButton) {
         hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
      }
   };

   const renderTasks = () => {
      let htmlString = "";

      for (const task of tasks) {
         htmlString += `
               <li 
               class="list__item 
               ${hideDoneTasks && task.done ? "list__item--hidden" : ""}"
               >
                  <button class="list__button js-toggleTaskDone">
                     ${task.done ? "✔" : ""}
                  </button>
                  <span class="list__task 
                  ${task.done ? "list__task--done" : ""}"
                  >
                     ${task.content}
                  </span>
                  <button class="list__button list__button--removeTaskButton js-removeTask">
                     🗑
                  </button>
               </li>
         `;
      };

      document.querySelector(".js-tasksList").innerHTML = htmlString;
   };

   const renderOptionButtons = () => {
      const buttonContainer = document.querySelector(".js-buttonsContainer");

      if (!tasks.length) {
         buttonContainer.innerHTML = "";
         return;
      };

      buttonContainer.innerHTML = `
         <button 
            class="optionButton js-hideDoneTasks"
            ${tasks.some(({ done }) => done) ? "" : "disabled"}
         >
            ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
         </button>
         <button 
            class="optionButton js-markAllTasksDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}
         >
            Ukończ wszystkie
         </button>
      `;
   };

   const render = () => {
      renderTasks();
      bindTaskEvents();
      renderOptionButtons();
      bindOptionButtonsEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskElement = document.querySelector(".js-newTask");
      const newTaskContent = newTaskElement.value.trim();

      if (newTaskContent !== "") {
         addTask(newTaskContent);
      };
      refreshInput(newTaskElement);
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");

      form.addEventListener("submit", onFormSubmit);
   };

   init();

};