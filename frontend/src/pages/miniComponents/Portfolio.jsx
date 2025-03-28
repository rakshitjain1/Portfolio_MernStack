import { Button } from "@/components/ui/button";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://portfolio-mern-stack-backend-nine.vercel.app/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  return (
    <div>
      <div className=" mb-12">
      <h1 className="text-tubeLight-effect text-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        MY project
      </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {viewAll
          ? projects.map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <img
                  src={element.projectBanner?.url}
                  alt={element.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </Link>
            ))
          : projects.slice(0, 9).map((element) => (
              <Link to={`/project/${element._id}`} key={element._id}>
                <img
                  src={element.projectBanner?.url}
                  alt={element.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </Link>
            ))}
      </div>

      {projects.length > 6 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
