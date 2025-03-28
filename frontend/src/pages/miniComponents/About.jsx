import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://mern-portfolio-backend-ysck.onrender.com/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMyProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-xl text-red-500">User data not available.</div>;
  }

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="flex justify-center">
      <h1 className="text-tubeLight-effect text-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        about Me
           
      </h1>
      </div>

      {/* About Section */}
      {/* <div className="text-center">
        <p className="mt-8 text-xl tracking-[2px]">
          {user?.aboutMe || "No information provided."}
        </p>
      </div> */}

      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          {/* Profile Image */}
          <div className="flex justify-center items-center">
            <img
              src={user?.avatar?.url || "/default-avatar.png"}
              alt="avatar"
              className="bg-white p-2 sm:p-4 h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>

          {/* About Text */}
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
            Hey, I'm {user.fullName 
          || "guest "}, a passionate Web Developer and Freelancer. I specialize in crafting dynamic and user-friendly web experiences. 
            </p>
            <p>
            Beyond technology, I have a deep appreciation for movies, series, and outdoor sports. I enjoy playing Cricket and engaging in various outdoor activities that keep me active and energized.
            </p>
          </div>
        </div>

        {/* Dedication Statement */}
        <p className="tracking-[1px] text-xl">
        I take pride in my dedication and perseverance, ensuring timely delivery of projects while maintaining high-quality standards. No challenge is too big—I embrace every opportunity to learn and grow.
        </p>
      </div>
    </div>
  );
};

export default About;
