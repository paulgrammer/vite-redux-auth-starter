import { SIZE_CHANGED } from "./types";

export function sizeChanged() {
  return {
    type: SIZE_CHANGED,
    payload: {},
  };
}
