"use client";
import ImageUpload from "@/components/global/fields/ImageUpload";
import { useAuthContext } from "@/context/authContext";
import { get, put } from "@/utils/http";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const Personal = () => {
  const { user,userId } = useAuthContext();
  const [profileInfo, setProfileInfo] = useState(undefined);
  const [close, setClose] = useState(true);

  const getProfile = async () => {
   
    try {
      const res = await get(`/profile/${userId.user_id}`, null, {});
      setProfileInfo(res);
    } catch (error) {

    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mx-auto py-8 text-black">
      <div className=" flex justify-between items-center">
        <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
        {profileInfo?.result?.profilePicture && (
          <Image
            width={100}
            height={100}
            property="false"
            src={profileInfo.result.profilePicture}
            style={{ borderRadius: "50%", height: "100px" }}
            alt=""
          />
        )}
      </div>
      {profileInfo && (
        <UserprofileDetails userData={profileInfo.result} setClose={setClose} />
      )}
      {!close && profileInfo && (
        <UserProfile data={profileInfo.result} setClose={setClose} setProfileInfo={setProfileInfo} />
      )}
    </div>
  );
};

export default Personal;

const UserProfile = ({ data, setClose,setProfileInfo }) => {
  const { user,userId } = useAuthContext();
  const [formData, setFormData] = useState({
    firstName: data?.firstName,
    lastName: data.lastName,
    profilePicture: data?.profilePicture,
    contactNumber: data?.contactNumber,
    address: {
      street: data?.address?.street,
      city: data?.address?.city,
      state: data?.address?.state,
      postalCode: data?.address?.postalCode,
      country: data?.address?.country,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setResume({ ...resume, [name]: value });
  };
  const [imagePreview, setimagePreview] = useState(data?.profilePicture);

  const UpdateProfile = async (e) => {
    e.preventDefault();
    console.log(formData, imagePreview);
    const recordData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      profilePicture: imagePreview,
      contactNumber: formData.contactNumber,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
     
    };
    const res= await put(`/users`,userId.user_id,recordData)
    if (res) {
      setClose(true)
      const userInfoDaa = await get(`/profile/${userId.user_id}`, null, {});
      setProfileInfo(userInfoDaa);
    }
   
  };
  return (
    <form className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className=" flex justify-between items-center">
        {" "}
        <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>{" "}
        <button className="text-red-500 hover:text-red-700 cursor-pointer">
          <MdClose size={24} onClick={() => setClose(true)} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-gray-600 font-semibold mb-2"
          >
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-gray-600 font-semibold mb-2"
          >
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block text-gray-600 font-semibold mb-2"
          >
            Phone Number:
          </label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            className="w-full  read-only:bg-slate-100 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <ImageUpload
            imagePreview={imagePreview}
            setImagePreview={setimagePreview}
          />
        </div>

        <div className="col-span-2 mt-10">
          <h2 className="block text-gray-600 font-semibold mb-2 text-2xl">
            Address:
          </h2>
        </div>

        <div>
          <label
            htmlFor="street"
            className="block text-gray-600 font-semibold mb-2"
          >
            Street:
          </label>
          <input
            type="text"
            name="street"
            id="street"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-gray-600 font-semibold mb-2"
          >
            City:
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-gray-600 font-semibold mb-2"
          >
            State:
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="block text-gray-600 font-semibold mb-2"
          >
            Postal Code:
          </label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.address.postalCode}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-gray-600 font-semibold mb-2"
          >
            Country:
          </label>
          <input
            type="text"
            name="country"
            id="country"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="col-span-1 mt-4 flex justify-end">
        <button
          type="button"
          onClick={UpdateProfile}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save Details
        </button>
      </div>
    </form>
  );
};

const UserprofileDetails = ({ userData, setClose }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-10">
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <label className="text-gray-700 font-bold mb-2" htmlFor="firstName">
            First Name:
          </label>
          <span className="text-gray-800">{userData.firstName}</span>
        </div>

        <div className="">
          <label className="text-gray-700 font-bold mb-2" htmlFor="lastName">
            Last Name:
          </label>
          <span className="text-gray-800">{userData.lastName}</span>
        </div>

        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <span className="text-gray-800">{userData.username}</span>
        </div>

        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <span className="text-gray-800">{userData.email}</span>
        </div>

        <div>
          <label className="text-gray-700 font-bold mb-2" htmlFor="role">
            Role:
          </label>
          <span className="text-gray-800">{userData.role}</span>
        </div>

        {userData?.address?.city && (
          <div className="col-span-2">
            <label className="text-gray-700 font-bold mb-2" htmlFor="address">
              Address:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label
                  className="text-gray-700 font-bold mb-2"
                  htmlFor="street"
                >
                  Street:
                </label>
                <span className="text-gray-800">{userData.address.street}</span>
              </div>
              <div>
                <label className="text-gray-700 font-bold mb-2" htmlFor="city">
                  City:
                </label>
                <span className="text-gray-800">{userData.address.city}</span>
              </div>
              <div>
                <label className="text-gray-700 font-bold mb-2" htmlFor="state">
                  State:
                </label>
                <span className="text-gray-800">{userData.address.state}</span>
              </div>
              <div>
                <label
                  className="text-gray-700 font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code:
                </label>
                <span className="text-gray-800">
                  {userData.address.postalCode}
                </span>
              </div>
              <div>
                <label
                  className="text-gray-700 font-bold mb-2"
                  htmlFor="country"
                >
                  Country:
                </label>
                <span className="text-gray-800">
                  {userData.address.country}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className=" col-span-2 flex justify-end">
          <button
            type="button"
            onClick={() => setClose(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Information
          </button>
        </div>
      </div>
    </div>
  );
};


export async function getServerSideProps(props) {

  console.log(props);
  // try {
  // //  const data = await get(`/profile/${user.user.user_id}`, null, {}); // Fetch your data here
  //   return {
  //     props: {
  //       data,
  //     },
  //   };
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  //   return {
  //     props: {
  //       data: null,
  //     },
  //   };
  // }
}


