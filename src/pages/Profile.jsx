import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";
import MyPost from "../components/profile/MyPost";
import ProfileInfo from "../components/profile/ProfileInfo";

const Profile = () => {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FESSING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BASE_URL}/profile/${auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FESSING_SUCCESS,
            data: response.data,
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FESSING_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <ProfileInfo />
        <MyPost />
      </div>
    </main>
  );
};

export default Profile;
