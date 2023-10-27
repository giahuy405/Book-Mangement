import { useState } from "react";

type LoadingType = [
    loading: boolean,
    {
        hideLoading: () => void
        showLoading: () => void
    }
]

export const useLoading = ():LoadingType =>{
    const [loading,setLoading] = useState<boolean>(false);
    const hideLoading = () => setLoading(false)
    const showLoading = () => setLoading(true)
    
    return [loading,{showLoading,hideLoading}]
}
