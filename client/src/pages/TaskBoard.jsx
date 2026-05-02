import { useEffect, useState } from "react";
import API from "../services/api";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  const load = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    load();
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    await updateStatus(draggableId, destination.droppableId);
  };

  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    progress: tasks.filter((t) => t.status === "progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">

      <h1 className="text-3xl font-bold mb-6">📋 Task Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 gap-4">

          {Object.entries(columns).map(([status, items]) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-800 rounded-xl p-4 min-h-[400px]"
                >
                  <h2 className="text-xl font-semibold mb-4 capitalize">
                    {status}
                  </h2>

                  {items.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-700 p-3 mb-3 rounded shadow"
                        >
                          <p className="font-semibold">{task.title}</p>

                          <p className="text-sm text-gray-400">
                            {task.assignedTo?.name || "Unassigned"}
                          </p>

                          <p className="text-xs mt-1">
                            Priority: {task.priority}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
}