import "./App.css";
import ThriftHappens from "./Components/ThriftHappens";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <div>
      <h1>Thrift Happens</h1>

      <img src={logo} alt="Thrift Happens Logo" width={150} />

      <ThriftHappens />
    </div>
  );
}

export default App;
