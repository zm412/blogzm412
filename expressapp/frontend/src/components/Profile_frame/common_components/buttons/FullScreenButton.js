
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react';

//tab_name - id соответствующего кнопке таба
//tabs_class_name - название общего для всех вкладок класса 
//buttons_class_name - название общего для всех кнопок класса 
//variant - стилизация кнопки по реакт-бутсрап
//button_name - название кнопки

export const FullScreenButton = ({tab_name, tabs_class_name, buttons_all_classes, variant, button_name1, button_name2}) => {
  const [isFullscr_mode_on, setFullScr_mode_on] = useState(false);
  const mode = false;
  

  const fullscr_mode_on = (tab_name, tabs_class_name) => {
    let tabs = document.querySelectorAll(tabs_class_name);
    if(isFullscr_mode_on){
      for(let item of tabs){
        item.classList.remove('hidden_block')
        item.classList.remove('col-lg-10')
      }
      setFullScr_mode_on(false)
    }else{
      for(let item of tabs){
        item.id == tab_name  ? ( item.classList.remove('hidden_block'), item.classList.add('col-lg-10') ) : item.classList.add('hidden_block');
      }
      setFullScr_mode_on(true)
    }
    
  }

  return (
    <Button 
      onClick={(e)=>fullscr_mode_on(tab_name, tabs_class_name)} 
      variant={variant}
      className={buttons_all_classes}
    >{isFullscr_mode_on ? button_name2 : button_name1}</Button>
  )
};


