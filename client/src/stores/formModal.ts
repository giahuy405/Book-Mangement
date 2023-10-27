import {create} from 'zustand';

export type FormType = 'tag' | 'book' | null;

type FormStoreState = {
  form : FormType
};

type FormStoreAction = {
  setForm: (form:FormType) => void;
};

const useModalForm = create<FormStoreState & FormStoreAction>((set) => ({
  form: 'book',
  setForm: (tag: FormType) => {
    set({ form: tag });
  },
}));

export default useModalForm;
