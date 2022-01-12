import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function InputField() {

    const [currPoint, setCurrPoint] = useState('');

    const currCenter = useSelector(state => state.currcenter);
    const points = useSelector(state => state.points);
    const dispatch = useDispatch();

    const handlePointSubmit = e => {
        e.preventDefault();
        dispatch({type: 'ADD_POINT', payload: {currPoint, currCenter, id: currPoint, index: points.length}});
        setCurrPoint('');
    }

    return (
        <div className="input-field">
            <form className="input-field__form" onSubmit={(e) => handlePointSubmit(e)}>
                <input type="text" className="input-field__form__text" placeholder="Новая точка маршрута" onChange={(e) => setCurrPoint(e.target.value)} value={currPoint} />
            </form>
        </div>
    )
}