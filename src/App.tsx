import { useState } from "react";
import CustomerDetails from "./components/CustomerDetails";
import CustomerList from "./components/CustomerList";
import logo from "/images/cube.png";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  const [currentSelectedUser, setCurrentSelectedUser] = useState(1);
  return (
    <>
      <header className=" text-center text-white p-4 bg-black  flex justify-between items-center rounded-b-lg">
        <div className="lg:w-10 w-8 lg:mx-6 mx-1">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <h1 className="flex-1 text-xl lg:text-2xl">Customer Portal</h1>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 ">
        <CustomerList
          setCurrentSelectedUser={setCurrentSelectedUser}
          currentSelectedUser={currentSelectedUser}
        />
        <CustomerDetails userId={currentSelectedUser} />
      </main>
      <footer className=" text-center text-white p-4 bg-black rounded-t-lg">
        <small>Visawjeet Mallik &copy; 2024</small>
      </footer>
    </>
  );
}

export default App;
