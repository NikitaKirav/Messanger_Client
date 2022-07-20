/** Absolute imports */
import { put, call, cancelled } from "redux-saga/effects";

/** Services */
import { follow } from "../../../services/userService";

/** Redux */
import { toggleFollowingProgress, followSuccess, setError } from "../actions";

/** Utils */
import { createCancelToken } from "../../../utils/httpUtils";

/** Types */
import { FollowSuccess } from "../actionTypes";
import { APIResponseType, ResultCode } from "../../types";


function* followSaga({
    payload: { userId }
  }: FollowSuccess) {
  const { source, cancelToken } = createCancelToken();

  try {

    yield put(toggleFollowingProgress(true, userId));
    const response: APIResponseType = yield call(follow, userId, { cancelToken });

    if(response.resultCode === ResultCode.Success) {

        yield put(followSuccess(userId));
    } 
    yield put(toggleFollowingProgress(false, userId));
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

export default followSaga;
