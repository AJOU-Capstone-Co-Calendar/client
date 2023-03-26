import React, {useState} from 'react';
import NavigationTop from "../../components/calendar/nav-top/NavigationTop";
import NavigationBottom from '../../components/calendar_bottom/NavigationBottom';
import CustomHead from "../../components/head/CustomHead";
import styles from './Calendar.module.css';

export default function Calendar() {
    const [open, setOpen] = useState(false);
    const onClickView = (event) => {
        if(open) {
            setOpen(false);
        }
    }

    return(
        <div className={styles.container} onClick={onClickView}>
            <CustomHead title={'Calendar'} content={'CalendarPage'}/>
            <NavigationTop open={open} setOpen={setOpen}/>
            <NavigationBottom open={open} setOpen={setOpen}/>
            calendar page
        </div>
    );
}
