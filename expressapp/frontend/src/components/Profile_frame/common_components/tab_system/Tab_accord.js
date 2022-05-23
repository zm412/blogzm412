
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

//add_class - класс для добавления к списку классов
//content - контент для вкладки, обычно компонент 
//id_elem - идентификатор вкладки, используется для связи с соответствующей кнопкой   
//classTab - общий список классов
//classTitle - класс для стилизации заголовка вкладки
//title - заголовок класса


export const Tab_accord = ({ add_class, content, id_elem, classTab, classTitle, title }) => { 
  console.log(add_class, 'add_class')
   let resultTabClass = classTab + ' ' + add_class;

   return( <div id={id_elem} className={resultTabClass} >
              <h5 className={classTitle}>{title}</h5>
              {content}
          </div>
    )
};


