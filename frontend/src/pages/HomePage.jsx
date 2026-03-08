import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "./components/Navbar";
import RateLimitedUI from "./components/RateLimitUI";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.log(`Error fetching notes ${error}`);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Faild to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      
    </div>
  );
};

export default HomePage;
