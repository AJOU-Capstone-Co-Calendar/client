import React, {useState} from 'react';
import styles from './NavigationBottom.module.css';
import { BiCalendar} from "react-icons/bi";
import {CiMemoPad} from "react-icons/ci";
import {MdFeed} from "react-icons/md";
import {GiNotebook} from "react-icons/gi";

export default function NavigationBottom({open, setOpen}) {
    return (
        <section className={styles.container}>
                <BiCalendar class={styles.icon} />
                <MdFeed class={styles.icon} />
                <GiNotebook class={styles.icon} />
                <CiMemoPad class={styles.icon} />
        </section>
    );
}
// 캘린더 피드 일정추가 다이어리 메모