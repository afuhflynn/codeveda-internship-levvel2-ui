import { useLayoutEffect } from "react"


const useOnOutsideClick = (ref: any, callback: ()=>void) => {
    const handleRef = (e: any) =>{
        if(!ref.current || ref.current.contains(e.target)) return;
        callback()
    }

    useLayoutEffect(() =>{
        window.addEventListener("mousedown", handleRef);
        window.addEventListener("touchstart", handleRef);
        return () =>{
             window.removeEventListener("mousedown", handleRef);
             window.removeEventListener("touchstart", handleRef);
        }
    }, [ref, callback])
}

export default useOnOutsideClick