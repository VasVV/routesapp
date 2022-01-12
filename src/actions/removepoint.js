export const removepoint = point => {
    return {
        type:  'REMOVE_POINT',
        payload: point
    };
  };