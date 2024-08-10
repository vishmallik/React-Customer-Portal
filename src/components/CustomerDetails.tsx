import { Customer } from "../types/customer";
import PhotoGrid from "./PhotoGrid";

interface CustomerDetailsProps {
  currentSelectedUser: Customer;
}

export default function CustomerDetails({
  currentSelectedUser,
}: CustomerDetailsProps) {
  return (
    <div className="w-full col-span-2 h-full bg-slate-100 text-center p-10">
      <h2 className="text-3xl font-semibold my-2">
        {currentSelectedUser.name}
      </h2>
      <h3 className="text-xl">{currentSelectedUser.title}</h3>
      <p className="mt-4 mb-10">
        <b>Address</b>: {currentSelectedUser.address}
      </p>
      <PhotoGrid key={currentSelectedUser.id} />
      {/* passed key prop to force
          rerender when new user is selected */}
    </div>
  );
}
