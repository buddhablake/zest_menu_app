import React, { Component } from "react";
import CategoryForm from "./CategoryForm";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

class Categories extends Component {
  state = {};

  onDragEnd = (result) => {
    const { menu, setNewCatOrder } = this.props;
    const { destination, source } = result;
    console.log(menu);
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const menuCopy = Object.assign([], menu);
    const droppedCat = menu[source.index];

    menuCopy.splice(source.index, 1);
    menuCopy.splice(destination.index, 0, droppedCat);

    const newMenuCatOrder = Object.assign([], menuCopy);

    newMenuCatOrder.map((category, index) => {
      category.catOrderId = index;
    });

    setNewCatOrder(newMenuCatOrder);
  };

  render = () => {
    const { setCategory, createCategory, menu } = this.props;
    const { onDragEnd } = this;
    return (
      <div className="bg-gray-300 p-4 rounded overflow-hidden shadow-lg">
        <CategoryForm
          setCategory={setCategory}
          createCategory={createCategory}
        />
        {menu ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {menu.map((category, index) => {
                      return (
                        <div>
                          <Draggable
                            key={index}
                            draggableId={index + ""}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  className="bg-orange-500 w-64 text-white text-center p-2 m-2 text-xl rounded shadow-md"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {category.category}
                                </div>
                              );
                            }}
                          </Draggable>
                        </div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        ) : null}
      </div>
    );
  };
}

export default Categories;
