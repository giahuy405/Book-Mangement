import {create} from 'zustand';
import { TagType } from "../types/tag";

type TagStoreState = {
  allTag: TagType[] ;
};

type TagStoreAction = {
  setAllTag: (tag: TagType[]) => void;
};

const useTagStore = create<TagStoreState & TagStoreAction>((set) => ({
    allTag: [],
  setAllTag: (tag: TagType[]) => {
    set({ allTag: tag });
  },
}));

export default useTagStore;
