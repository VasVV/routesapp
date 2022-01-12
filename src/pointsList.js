import { useSelector, useDispatch } from 'react-redux';
import  {useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function PointsList() {

    const dispatch = useDispatch();

    const points = useSelector(state => state.points);

    const [pointsList, setPointsList] = useState([]);

    useEffect(() => {
        setPointsList(points);
    }, []);

    useEffect(() => {
        setPointsList(points);
    }, [points]);

    const reorder = result => {
        const items = Array.from(points);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPointsList(items);
        return items;
    }


    const handleDragEnd = result => {
        const reordered = reorder(result);
        dispatch({type: 'REORDER', payload: reordered});
    }
    


    return (
        <div className="points-list">
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                <Droppable droppableId="points">
                {(provided) => (
                    <ul className="points-list__list" {...provided.droppableProps} ref={provided.innerRef}>
                        {pointsList.map((thispoint) => {
                            return (
                                <Draggable 
                                    key={thispoint.id} 
                                    draggableId={thispoint.id} 
                                    index={thispoint.index}
                                >
                                    {(provided) => (
                                        <div className="points-list__list__item">
                                            <li 
                                                point={thispoint} 
                                                key={thispoint.id} 
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps}> 
                                                {thispoint.currPoint}
                                                    <button 
                                                        className="points-list__list__delete-btn" 
                                                        onClick={ () => dispatch({ type: 'REMOVE_POINT', payload: thispoint.currPoint })}>
                                                            Удалить
                                                    </button>
                                            </li> 
                                        </div>
                                    )}  
                                    
                                </Draggable>
                            )
                        })}
                </ul>
                )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}