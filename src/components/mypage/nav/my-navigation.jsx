import styles from './MyNavigation.module.css';
import { BiX } from 'react-icons/bi';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default function MyNavigation({title, success}) {
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('user'));

    const mypage = () => {
        return (
            <div className={styles.container}>
                <BiX className={styles.icon} onClick={() => router.back()} />
                <h1 className={styles.title}>{title}</h1>
                <BiX className={styles.icon} style={{visibility: 'hidden'}} />
            </div>
        )
    }

    const editOrAdd = () => {
        return (
            <div className={styles.container}>
                <span
                    style={ user.name ? {} : {visibility: 'hidden'}}
                    className={styles.icon} onClick={() => router.push('/mypage')}>취소</span>
                <h1 className={styles.title}>
                    {
                        user.name ? title : '프로필 등록'
                    }
                </h1>
                <span className={styles.icon} onClick={success}>완료</span>
            </div>
        )
    }

    const follow = () => {
        return (
            <div className={styles.container}>
                <BiX className={styles.icon} onClick={() => router.back()} />
                <h1 className={styles.title}>{title}</h1>
                <BiX className={styles.icon} style={{visibility: 'hidden'}} />
            </div>
        )
    }

    if(router.pathname.includes('edit') || router.pathname.includes('add')) {
        return editOrAdd();
    } else if(router.pathname === '/mypage'){
        return mypage();
    } else if(router.pathname.includes('/follow')) {
        return follow();
    } else {
        return <></>
    }
}
