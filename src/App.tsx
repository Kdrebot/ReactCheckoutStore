import "./App.css";
import { products } from "./Data/data";
import ItemsContainer from "./Components/ItemsContainer";

function App() {
  return (
    <>
      <div>
        <h1>Thift Happens</h1>
        <h2>Available Products</h2>
        <ItemsContainer products={products} />
      </div>
    </>
  );
}

export default App;
