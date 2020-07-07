import React from 'react'
import '../styles/select_list.css'
import {Link} from 'react-router-dom'

import {selectLists} from './SelectList'
export default function SelectForm() {
    return (
        <div className="lists">
            <h4>Or search by</h4>
            <div className="flex-box">
                {selectLists.map(item => (
                    <div key={item.type} className={`${item.type}-container list-container`}>
                        <div className={`${item.type}-selected selected`}  >
                            <div className={`${item.type}-cover cover`}></div>
                            <span>{item.type}</span> 
                            <img src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png" alt=""/>
                        </div>
                        <ul className={`${item.type}-box box`}>
                            {item.list.map(item2 => (
                                <Link 
                                    key={item2.id} 
                                    to={`/search/${item.type.toLowerCase()}s/${item2.name}/${item2.id}`}>
                                    <li  key={'li' + item2.id}>{item2.name}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
window.addEventListener('click', (e) => {
    selectLists.forEach(item =>{
        if (e.target.className.includes(`${item.type}-cover`)) {
            const list = document.querySelector(`.${item.type}-box`)
            list.classList.toggle('list-active')
        }
    }) 
    
})

