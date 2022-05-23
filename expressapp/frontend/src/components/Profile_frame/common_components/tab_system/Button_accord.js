
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

//tab_name - id соответствующего кнопке таба
//tabs_class_name - название общего для всех вкладок класса 
//buttons_class_name - название общего для всех кнопок класса 
//variant - стилизация кнопки по реакт-бутсрап
//button_name - название кнопки

export const Button_accord = ({tab_name, tabs_class_name, buttons_class_name, buttons_all_classes, variant, button_name}) => {

  const openTab = (elem, tab_name, tabs_class_name, buttons_class_name) => {
    let tabs = document.querySelectorAll(tabs_class_name);
    for(let item of tabs){
      item.id == tab_name  ? item.classList.add('active') : item.classList.remove('active');
    }
    let buttons = document.querySelectorAll(buttons_class_name);
    for(let item of buttons){
      item == elem  ? item.classList.add('active') : item.classList.remove('active');
    }
  }

  return (
    <Button 
      onClick={(e)=>openTab(e.target, tab_name , tabs_class_name, buttons_class_name)} 
      variant={variant}
      className={buttons_all_classes}
    >{button_name}</Button>
  )
};


