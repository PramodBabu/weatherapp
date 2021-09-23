import React from 'react';

const getMonth = (date) => {
    const month = date.split("-")
    switch (month[1]) {
        case '01': 
            return "January, "+month[2];
        case '02': 
            return "February, "+month[2];
        case '03': 
            return "March, "+month[2];
        case '04': 
            return "April, "+month[2];
        case '05': 
            return "May, "+month[2];
        case '06': 
            return "June, "+month[2];
        case '07': 
            return "July, "+month[2];
        case '08': 
            return "August, "+month[2];
        case '09': 
            return "September, "+month[2];
        case '10': 
            return "October, "+month[2];
        case '11': 
            return "November, "+month[2];
        case '12': 
            return "December, "+month[2];
        
    }
}

export default getMonth;