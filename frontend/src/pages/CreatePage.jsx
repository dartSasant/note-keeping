import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/axios"

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Notes Successfully Created");
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(`Error Creating Note: ${error.message}`);
      if (error.response.status === 429) {
        toast.error("Try again after sometime");
      }
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container max-w-2xl mx-auto ">
        <Link to={"/"} className="btn btn-ghost mb-6 ">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        <div className="card bg-base-100">
          <div className="card-body">
            <h1 className="card-title text-2xl mb-4">Create New Note</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label ">
                  <span className="label-text">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label ">
                  <span className="label-text">Content</span>
                </label>

                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
