
import React from 'react';
import { FullScreenButton } from './common_components/buttons/FullScreenButton';

export const Second_col = () => {
  

  return(
    <div className="m-3">
      <FullScreenButton 
          tab_name='second_col'
          tabs_class_name=".frame"
          buttons_all_classes="mt-1 col-sm-12 full_screen_mode"
          button_name1="Fullscreen mode"
          button_name2="Fullscreen mode off"
          variant="secondary" 
      /> 


    SECONDCOLCONTENT
    </div>
  ) 
}
