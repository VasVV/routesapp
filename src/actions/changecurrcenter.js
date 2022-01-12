export const changeCurrCenter = latlng => {
    return {
        type:  'CHANGE_CURR_CENTER',
        payload: latlng
    };
  };