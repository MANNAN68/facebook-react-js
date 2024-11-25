import React, { useRef } from "react";
import { useProfile } from "../../hooks/useProfile";
import Edit from "../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  const fileUpload = useRef();
  const handleFileUpload = (e) => {
    e.preventDefault();
    fileUpload.current.addEventListener("change", updateProfileImage);
    fileUpload.current.click();
  };

  const updateProfileImage = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUpload.current.files) {
        formData.append("avatar", file);
      }
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/profile/${auth?.user?.id}/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATE, data: response.data });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FESSING_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <>
      <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[118px] lg:max-w-[118px]">
        <img
          className="max-w-full rounded-full"
          src={`${import.meta.env.VITE_BASE_URL}/${state?.user?.avatar}`}
          alt="sumit saha"
        />
        <form action="">
          <button
            className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            onClick={handleFileUpload}
          >
            <img src={Edit} alt="Edit" />
          </button>
          <input type="file" id="file" ref={fileUpload} hidden />
        </form>
      </div>
    </>
  );
};

export default ProfileImage;
