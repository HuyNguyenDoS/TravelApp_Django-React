import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Apis, { endpoints } from '../configs/Apis'


export default function Post(props) {
    let path = `/tours/${props.obj.tour_id}/`
  return (
    <>
        
        <div className="loadMore">
            <div className="central-meta item">
                
                <div className="user-post">
                    <div className="friend-info">
                        {/* <figure>
                            <img src={props.obj.user.avatar} alt="" />
                        </figure> */}
                        {/* <div className="friend-name">
                            <ins><a title="">{props.obj.user.first_name} {props.obj.user.last_name}</a></ins>
                            <span>published: {props.obj.created_date}</span>
                        </div> */}
                        <div className="post-meta">
                            <h3>{props.obj.title}</h3>
                            <Link to={path}>
                                <img src={props.obj.image} alt="avatar" style={{width:'700px', height: '800px'}} />
                            </Link>         
                            <div className="description">

                                <p>
                                    {props.obj.content}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
              
         
     
    </>
  )
}
