
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Button_accord } from './common_components/tab_system/Button_accord';
import { QuestionTab } from './admin_col_components/QuestionTab';
import { FullScreenButton } from './common_components/buttons/FullScreenButton';
import { Tab_accord } from './common_components/tab_system/Tab_accord';


export  const Admin_col = () => {
  let buttons_set = [
    {
      tab_name: 'questions', 
      buttons_all_classes: "active mt-1 admin_button col-sm-4",
      button_name:"Questions"
    },
    {
      tab_name: 'tests', 
      buttons_all_classes: "mt-1 admin_button col-sm-4",
      button_name:"Tests"
    },
    {
      tab_name: 'library', 
      buttons_all_classes: "mt-1 admin_button col-sm-4",
      button_name:"Library"
    },
  ]

  let tabs_set = [
    {
      add_class:'active',
      content: <QuestionTab />,
      id_elem:'questions', 
      classTab:'tab_admin',
      classTitle:'',
      title:"Questions"
    },
    {
      add_class:'',
      content:'sec',
      id_elem:'tests', 
      classTab:'tab_admin',
      classTitle:'',
      title:"Tests"
    },
    {
      add_class:'',
      content:'third',
      id_elem:'library', 
      classTab:'tab_admin',
      classTitle:'',
      title:"Library"
    }


  ]

  return (
    <div className="m-3" >
      
      <FullScreenButton 
          tab_name='admin_col'
          tabs_class_name=".frame"
          buttons_all_classes="mt-1 col-sm-12 full_screen_mode"
          button_name1="Fullscreen mode"
          button_name2="Fullscreen mode off"
          variant="secondary" 
      /> 

      <div className="buttons_admin">
    {
      buttons_set.map((n, index) => ( 
        <Button_accord 
            key={index}
            tab_name={n.tab_name}
            tabs_class_name=".tab_admin"
            buttons_class_name=".admin_button"
            buttons_all_classes={n.buttons_all_classes}
            button_name={n.button_name}
            variant="secondary" 
        /> 
      ))
    }
       
    </div>
    <div class="tabs_admin">
    {
      tabs_set.map((n, index) => (
        <Tab_accord
            key={index}
            add_class={n.add_class} 
            content={n.content} 
            id_elem={n.id_elem} 
            classTab={n.classTab}
            classTitle={n.classTitle}
            title={n.title}
        />
     
      ))
    }

    </div>
 
    </div>
  )
};


