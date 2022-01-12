import InputField from './inputField';
import PointsList from './pointsList';
import Map from './map'
import './App.css';

export default function App() {
  return (
    <div className="App">
      <div className="App_left">
        <InputField />
        <PointsList />
      </div>
      <div className="App_right">
        <Map />
      </div>
    </div>
  );
}

