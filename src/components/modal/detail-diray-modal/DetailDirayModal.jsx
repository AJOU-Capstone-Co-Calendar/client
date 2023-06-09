import styles from './DetailDiaryModal.module.css';
import {BiX} from "react-icons/bi";
import {useRouter} from "next/router";
import {useCallback, useEffect, useRef, useState} from "react";
import {AiFillPicture, AiFillMinusCircle} from "react-icons/ai";
import {TbTemperatureCelsius} from "react-icons/tb";
import EmojiModal from "~/components/modal/emoji-modal/EmojiModal";
import {DATE} from "~/common/dummy";

export const EMOJI = [
    {src: './emoji/0.png'},
    {src: './emoji/1.png'},
    {src: './emoji/2.png'},
    {src: './emoji/3.png'},
    {src: './emoji/4.png'},
    {src: './emoji/5.png'},
    {src: './emoji/6.png'},
    {src: './emoji/7.png'},
    {src: './emoji/8.png'},
]

export const SCOPE = [
    '전체공개',
    '친구공개',
    '나만보기',
]

export default function DetailDiaryModal({dateString, type, setOpenModal}) {
    const [picture, setPicure] = useState('');
    const textarea = useRef();
    const [openEmoji, setOpenEmoji] = useState(false);
    const [emoji, setEmoji] = useState(-1);
    const [openScope, setOpenScope] = useState(false);
    const [ scope, setScope] = useState(0);
    // const [ temperature, setTemperature] = useState(0);

    const inputRef = useRef(null);

    const onUploadImage = useCallback((e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
            reader.onload = () => {
                setPicure(reader.result || '/img.png'); // 파일의 컨텐츠
                resolve();
            };
        });
    }, []);

    useEffect(() => {

    },[emoji]);

    const nickName = '❤️';
    const date = new Date(dateString);

    const handleResizeHeight = () => {
        textarea.current.style.height = 'auto';
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }

    const onClickAddEmoji = () => {
        setOpenEmoji((prev) => true);
    }

    // type: write or read

    // 배경색
    // 사진 추가
    // 기분 이모지
    // 기분 온도
    // 오늘 일정
    return(
        <section
            className={styles.container}
        >
            {
                openEmoji &&
                    <div
                        onClick={() => setOpenEmoji((prev) => false)}
                        className={styles.modalContainer}>
                        <EmojiModal setOpenEmoji={setOpenEmoji} setEmoji={setEmoji} />
                    </div>
            }

            {/* top nav */}
           <div className={styles.topNav}>
                <BiX
                    className={styles.icon}
                    onClick={() => setOpenModal(() => false) }
                />
               <h2 className={styles.title}>다이어리</h2>
               <span
                   className={styles.success}
                   onClick={() => {alert("완료")}}
               >완료</span>
           </div>
            {/* emotion */}
            <div className={styles.addEmojiBox}>
                <img onClick={onClickAddEmoji} src={`./emoji/${emoji}.png`} className={styles.addEmoji} alt={'today emoji'} />
            </div>
            {/* user profile and date */}
            <div className={styles.userNdateBox}>
                <img alt={'user profile image'} src={'./img.png'} className={styles.userProfileImgDiv} />
                <div className={styles.userNameNdateDiv}>
                    <span>{nickName}</span>
                    <span>{date.getFullYear()+'년 '+(date.getMonth()+1)+'월 '+ date.getDay()+'일 '+ DATE[date.getDate()]}</span>
                </div>
            </div>

            {/* diary text */}
            <div className={styles.textBox}>
                {/* picture */}
                {
                    picture.length === 0
                        ? <></>
                        : <div className={styles.pictureBox}>
                            <AiFillMinusCircle
                                className={styles.minusIcon}
                                onClick={() => setPicure((prev) => '')}
                            />
                            <img alt={'upload diary img'} src={picture} className={styles.picture} />
                        </div>
                }
                <textarea
                    placeholder={`${nickName}님의 오늘은 어떤 하루였나요?`}
                    onChange={handleResizeHeight}
                    ref={textarea}
                    rows={1}
                    className={styles.textInput}

                />
            </div>
            {/* bottom nav */}
            <div className={styles.bottomNav}>
                <div className={styles.leftBottom}>
                    {/*<img className={styles.icon} src={'./colorPalette.png'}/>*/}
                    <AiFillPicture
                        onClick={()=>{
                            inputRef.current.click()
                        }}
                        className={styles.icon} />
                    <input style={{display: 'none'}} type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />

                    {/*<TbTemperatureCelsius className={styles.icon} />*/}
                </div>

                {
                    openScope &&
                        <ul className={styles.scopeBox}>
                            {
                                SCOPE.map((m, index) => {
                                    return <li key={index} onClick={() => {
                                        setScope((prev) => index);
                                        setOpenScope((prev) => false);
                                    }}>{m}</li>
                                })
                            }
                        </ul>
                }

                <span onClick={() => setOpenScope((prev) => true)}>{SCOPE[scope]}</span>
            </div>
        </section>
    );
}
