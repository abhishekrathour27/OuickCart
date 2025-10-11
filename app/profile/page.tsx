"use client";
import React, { useEffect, useState } from "react";
import { User, MapPin, LogOut, Trash2, Pencil } from "lucide-react";
import { useAddress } from "@/context/addressContext";
import { logout, profile } from "@/services/authServices";
import { useModal } from "@/context/modalContext";
import Address from "@/components/screens/select_address/Address";

const Page = () => {
  const [activeTab, setActiveTab] = useState("profile");
  type UserType = {
    name?: string;
    email?: string;
    phone?: string;
    // add other properties as needed
  };

  const [user, setUser] = useState<UserType | null>(null);

  const { addresses, deleteAddress, updateAddress } = useAddress();
  const { openModal } = useModal();

  const fetchProfileData = async () => {
    const loginData = await profile();
    setUser(loginData?.data?.user);
  };
  //   console.log("user", addresses);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const logoutData = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold mb-6 text-orange-500">
          My Account
        </h2>
        <ul className="space-y-3">
          <li
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition 
              ${
                activeTab === "profile"
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100"
              }`}
          >
            <User size={18} /> Profile
          </li>

          <li
            onClick={() => setActiveTab("address")}
            className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition 
              ${
                activeTab === "address"
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100"
              }`}
          >
            <MapPin size={18} /> Address
          </li>

          <li
            onClick={() => setActiveTab("logout")}
            className={`flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition 
              ${
                activeTab === "logout"
                  ? "bg-orange-100 text-orange-600"
                  : "hover:bg-gray-100"
              }`}
          >
            <LogOut size={18} /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "profile" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Profile Details</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone}
              </p>
            </div>
          </div>
        )}
        {activeTab === "address" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Saved Addresses</h1>
            <div className="bg-white shadow-md rounded-lg p-4">
              {addresses.length > 0 ? (
                addresses.map((item, index) => (
                  <div key={index} className="mb-4 border-b pb-2">
                    <div className="flex justify-between">
                      <div className="space-x-4">
                        <strong>{item.name}</strong>
                        <strong>{item.phoneNo}</strong>
                      </div>
                      <div className="flex space-x-3 text-sm">
                        {/* Trash icon with tooltip */}
                        <div className="relative group">
                          <Trash2
                            onClick={() => deleteAddress(item._id)}
                            className="text-sm cursor-pointer text-red-500"
                          />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Delete
                          </span>
                        </div>

                        {/* Ellipsis icon with tooltip */}
                        <div className="relative group">
                          <Pencil
                            onClick={() => openModal(<Address mode="edit" data={item}  />)}
                            className="cursor-pointer text-sm"
                          />
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Edit
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>{item.street}</p>
                    <span className="pr-5">{item.state}</span>
                    <strong>{item.pincode}</strong>
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "logout" && (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-semibold mb-2 text-gray-700">
              Are you sure you want to logout?
            </h1>
            <button
              onClick={() => logoutData()}
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
