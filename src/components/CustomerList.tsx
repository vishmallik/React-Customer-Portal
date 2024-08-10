import List from "rc-virtual-list";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { customers } from "../utils/customers.ts";
import { Customer } from "../types/customer.ts";

interface CustomerListProps {
  setCurrentSelectedUser: Dispatch<SetStateAction<Customer>>;
  currentSelectedUser: Customer;
}

export default function CustomerList({
  setCurrentSelectedUser,
  currentSelectedUser,
}: CustomerListProps) {
  const [listHeight, setListHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateListHeight = () => {
      if (window.innerWidth < 1024) {
        setListHeight(window.innerHeight / 3);
      } else {
        setListHeight(window.innerHeight);
      }
    };

    updateListHeight();

    window.addEventListener("resize", updateListHeight);

    return () => {
      window.removeEventListener("resize", updateListHeight);
    };
  }, []);
  return (
    <div className="col-span-1 overflow-hidden">
      <h2 className="text-center py-2 font-semibold bg-slate-300 text-xl ">
        Customer's List
      </h2>
      <List
        data={customers}
        itemHeight={30}
        itemKey="id"
        height={listHeight}
        className="scroll-smooth"
      >
        {(customer) => (
          <div
            className={`p-3 px-10 lg:p-10 border-b-solid border-b-slate-300 border-b cursor-pointer transition-all duration-300 ease-in-out ${
              customer.id === currentSelectedUser.id
                ? "bg-gray-200 border-r-gray-500 border-r-2 border-r-solid"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setCurrentSelectedUser(customer)}
          >
            <p className="text-xl lg:text-2xl">
              {customer.id + 1}. {customer.name}
            </p>
            <p>{customer.title}</p>
          </div>
        )}
      </List>
    </div>
  );
}
