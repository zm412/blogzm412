import React from 'react';


function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

var csrftoken = getCookie('csrftoken');


const CSRFToken = () => {
    return (
        <input type="hidden" id='csrfT' name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;
