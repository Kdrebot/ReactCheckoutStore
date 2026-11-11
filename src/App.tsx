import "./App.css";
import ThriftHappens from "./Components/ThriftHappens";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <div>
      <img src={logo} height={150} alt="Thift Happens"></img>
      <ThriftHappens />
    </div>
  );
}

export default App;
