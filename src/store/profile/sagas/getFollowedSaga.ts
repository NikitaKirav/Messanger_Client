/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { getFollowed } from "../../../services/userService";

/** Redux */
import { changeFollowed, setError } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { GetFollowed } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";
import { Followed } from "../types";


function* getFollowedSaga({
    payload: { userId },
  }: GetFollowed) {
  const { source, cancelToken } = createCancelToken();

  try {

    const response: APIResponseType<Followed> = yield call(getFollowed, userId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(changeFollowed(response.data.followed));
        
    } else {
        let message = response.message ? response.message : "Some error";
        yield put(setError(message));
    }

  } catch (e) {
    if (typeof e === "string") {
        yield put(setError(e.toUpperCase()));
      } else if (e instanceof Error) {
        yield put(setError(e.message));
      }
  } finally {
    //@ts-ignore
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

export default getFollowedSaga;
