import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LoadingContext } from "../context/loading.context";
import { get } from "../services/authService";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

function Home() {
  const { allUsers, setAllUsers } = useContext(LoadingContext);

  useEffect(() => {
    get("/users").then((response) => {
      console.log("response LINE @&!!!", response.data);

      setAllUsers(response.data);
    });
  }, []);

  return (
    <div className=" text-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <img
            src={require("../logoColor.png")}
            alt="SampleWAV logo"
            className=" h-32 mr-6"
          />
        </div>
        <div className="flex items-center justify-center">
          <h2 className="text-2xl mt-8">
            Create your own wave or start browsing the samples of our top
            creators!
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="rounded-md overflow-hidden shadow-lg"
            >
              <Link to={`/browse-profile/${user._id}`}>
                <Avatar
                  src={user.profile_image}
                  alt={user.artist_name}
                  className="w-full"
                />
                <div className="p-4">
                  <h3 className="text-xl font-medium mb-2">
                    {user.artist_name}
                  </h3>
                  <p className="text-gray-400 text-sm">{user.location}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
