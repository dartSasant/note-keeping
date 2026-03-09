import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import api from "../lib/axios.js";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitUI";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
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
      <div className="max-w-7x mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading Notes........
          </div>
        )}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
      </div>
    </div>
  );
};

export default HomePage;
