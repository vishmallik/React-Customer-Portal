import List from "rc-virtual-list";
import useFetch from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import { baseUrl } from "../utils/url.ts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UsersApiResponse } from "../types/UserApiResponse.ts";

interface CustomerListProps {
  setCurrentSelectedUser: Dispatch<SetStateAction<number>>;
  currentSelectedUser: number;
}

export default function CustomerList({
  setCurrentSelectedUser,
  currentSelectedUser,
}: CustomerListProps) {
  const { data, loading, error } = useFetch<UsersApiResponse>(
    `${baseUrl}?limit=1000&select=firstName,lastName,company`
  );
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
      {loading ? (
        <List
          data={Array.from({ length: 10 }, (_, index) => ({
            id: index,
          }))}
          height={listHeight}
          itemHeight={30}
          itemKey="id"
        >
          {() => (
            <div className="p-10 border-b-solid border-b-slate-300 border-b">
              <Skeleton enableAnimation />
              <Skeleton width={"50%"} enableAnimation />
            </div>
          )}
        </List>
      ) : error ? (
        <div className=" flex space-x-2 items-center w-full justify-center my-20 text-sm">
          <img src="/images/warning.png" alt="warning" className="w-4" />
          <p className="text-red-500">
            Something went wrong. Couldn't get customer's list.
          </p>
        </div>
      ) : (
        data && (
          <List
            data={data.users}
            itemHeight={30}
            itemKey="id"
            height={listHeight}
            className="scroll-smooth"
          >
            {(user) => (
              <div
                className={`p-3 px-10 lg:p-10 border-b-solid border-b-slate-300 border-b cursor-pointer transition-all duration-300 ease-in-out ${
                  user.id === currentSelectedUser
                    ? "bg-gray-200 border-r-gray-500 border-r-2 border-r-solid"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCurrentSelectedUser(user.id)}
              >
                <p className="text-xl lg:text-2xl">
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.company.title}</p>
              </div>
            )}
          </List>
        )
      )}
    </div>
  );
}
