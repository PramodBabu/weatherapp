import React from 'react';

const windMap = (items) => {

    const dateSplit = (value) => {
        let date = value.split(" ")
        return date;
    }

    const tConvert = (time) => {
        if (time<12 && time != 0) return time+' AM'
        else if (time == 0) return 12+' AM'
        else if (time>12) return time-12+' PM'
        else if (time == 12) return 12+' PM'
    }

    return (
        <div style={{display: `flex`, width: `100%`, justifyContent: `space-evenly`, contain: `layout`}}>
            {items.map(item => (
            <div className="card border-light mb-3" style={{objectFit: `contain`, width:`10rem`, paddingTop: `10px`}} >
                <h3>{item.wind.speed}</h3>
                <img 
                    src="https://www.pixsector.com/cache/33b9ca1f/av02a6c049a39344bd3ba.png" 
                    className="card-img-top"
                    style = {{transform: `rotate(${item.wind.deg}deg)`, objectFit: `contain`, maxHeight: `100%`, width: `auto`}}
                    alt=""
                />
                <div className="card-body">
                    <p>{tConvert(dateSplit(item.dt_txt)[1].split(":")[0])}</p>
                </div>
            </div>
        ))}
        </div>
        
        
    )
}

export default windMap;