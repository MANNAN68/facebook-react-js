import React, { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import edit from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";

const Bio = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();

  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleBioUpdate = async () => {
    dispatch({ type: actions.profile.DATA_FESSING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_UPDATE,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FESSING_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <>
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!editMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio}
            </p>
          ) : (
            <textarea
              name="bio"
              id="bio"
              value={bio}
              className="p-10 bg-slate-600 leading-[188%]  text-black lg:text-lg rounded-md "
              rows={3}
              color="unset"
              cols={30}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          )}
        </div>
        {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
        {!editMode ? (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(true)}
          >
            <img src={edit} alt="Edit" />
          </button>
        ) : (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={handleBioUpdate}
          >
            <img src={CheckIcon} alt="Edit" />
          </button>
        )}
      </div>
    </>
  );
};

export default Bio;
