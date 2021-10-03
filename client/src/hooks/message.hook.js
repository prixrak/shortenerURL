import {useCallback} from "react";

const useMessage = () => {
  return useCallback(text => {
    if (window && text) {
      if(!document.querySelector(".error-msg")) {
        const errorElement = document.createElement("div");
        errorElement.innerHTML = text;
        errorElement.classList.add("error-msg");
        document.querySelector(".form").append(errorElement);
        setTimeout(() => errorElement.remove(), 1000);
      }
    }
  }, []);
}

export default useMessage;