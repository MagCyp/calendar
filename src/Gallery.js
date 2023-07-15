import style from './GalleryPage.module.scss';

const images = [
    './img/IMG_20191220_192905_154.jpg',
    './img/photo_2022-06-08_23-20-32.jpg',
    './img/santaMAX.png',
    './img/качка_на_максималках.png',
    './img/Крабік_на_максималках.png',
    './img/качка_на_максималках.png',
    './img/качка_на_максималках.png',
    './img/качка_на_максималках.png',];

export default function GalleryPage(props) {

    function generateArray() {
        let sum = 99
        const numbers = []
        for (let i = 0; i < 2; i++) {
            const randomNumber = Math.floor(Math.random() * (40-25+1) + 25);
            sum -= randomNumber < 25 ? 25 : randomNumber;
            numbers.push(randomNumber < 25 ? 25 : randomNumber);
        }
        numbers.push(sum);
        return numbers;
    }
    
    let imagesArray = [];
    let j = 0;
    let widths = generateArray();

    for (let i = 0; i < images.length; i++) {
        if (i % 3 === 0) {
            j = 0;
            widths=generateArray();
        }
        imagesArray.push(<img className={style.hideText} key={i} src={images[i]} alt="1" width={`${widths[j]}%`} />);
        j++;
    }

    return (
        <div className={style.mainDiv}>
            {imagesArray}
        </div>
    );
}