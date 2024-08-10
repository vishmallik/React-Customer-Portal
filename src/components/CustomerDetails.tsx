import Skeleton from "react-loading-skeleton";
import useFetch from "../hooks/useFetch";
import { User } from "../types/UserApiResponse";
import { baseUrl } from "../utils/url";
import PhotoGrid from "./PhotoGrid";

interface CustomerDetailsProps {
  userId: number;
}

export default function CustomerDetails({ userId }: CustomerDetailsProps) {
  const { data, loading, error } = useFetch<User>(
    `${baseUrl}/${userId}?select=firstName,lastName,address,company`
  );

  return (
    <div className="w-full col-span-2 h-full bg-slate-100">
      {loading ? (
        <div className="w-full text-center p-10">
          <Skeleton count={2} width={"50%"} className="my-4" enableAnimation />
          <Skeleton enableAnimation />
        </div>
      ) : error ? (
        <div className=" flex space-x-2 items-center w-full justify-center my-20 text-sm">
          <img src="/images/warning.png" alt="warning" className="w-4" />
          <p className="text-red-500">
            Something went wrong. Couldn't get customer's details.
          </p>
        </div>
      ) : (
        data && (
          <div className="w-full text-center p-10">
            <h2 className="text-3xl font-semibold my-2">
              {data.firstName} {data.lastName}
            </h2>
            <h3 className="text-xl">{data.company.title}</h3>
            <p className="mt-4 mb-10">
              <b>Address</b>: {data.address?.address}, {data.address?.city},{" "}
              {data.address?.state} - {data.address?.postalCode},{" "}
              {data.address?.country}
            </p>
            <PhotoGrid key={data.id} />
            {/* passed key prop to force
          rerender when new user is selected */}
          </div>
        )
      )}
    </div>
  );
}
