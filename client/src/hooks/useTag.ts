import toast from "react-hot-toast";
import axiosClient from "../services/axiosClient";
import useTagStore from "../stores/tagStore";
import { TagType } from "../types/tag";

export const useTag = () => {
  const { allTag, setAllTag } = useTagStore();

  const fetchTag = async () => {
    const res = await axiosClient.get("/tags");
    setAllTag(res.data);
  };
  const addTag = async (tag: Omit<TagType, "id">) => {
    try {
      const res = await axiosClient.post("/tags", tag);
      fetchTag();
      toast.success("Successfully");
    } catch (err:any) {
      toast.error(err.message);
    }
  };

  const deleteTag = async (id: string) => {
    const res = await axiosClient.delete(`/tags/${id}`);
    fetchTag();
  };

  return {
    allTag,
    setAllTag,
    fetchTag,
    addTag,
    deleteTag,
  };
};
